import { Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useVoice } from "./VoiceContext";
import { useNotifications } from "./NotificationContext";

const BAR_COUNT = 9;

const VoiceButton = () => {
  // use shared voice context for listening and agent response
  const { isListening: ctxListening, setIsListening: setCtxListening, setAgentResponse } = useVoice();
  const { addNotification } = useNotifications();
  // Local fallback state if context not present (keeps previous behavior)
  const [isListeningLocal, setIsListeningLocal] = useState(false);
  const isListening = typeof ctxListening === "boolean" ? ctxListening : isListeningLocal;
  const setIsListening = (v: boolean) => {
    try {
      setCtxListening(v);
    } catch (e) {
      setIsListeningLocal(v);
    }
  };
  const [levels, setLevels] = useState<number[]>(new Array(BAR_COUNT).fill(8));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<any[]>([]);

  useEffect(() => {
    if (isListening) {
      startAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      // clear previous agent response when starting a new recording
      try {
        setAgentResponse?.(null);
      } catch (e) {}
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      // setup MediaRecorder to capture audio for upload
      try {
        const mimeCandidates = [
          "audio/webm;codecs=opus",
          "audio/webm",
          "audio/ogg;codecs=opus",
          "audio/mp4",
        ];
        let recorder: MediaRecorder | null = null;
        for (const mime of mimeCandidates) {
          try {
            recorder = new MediaRecorder(stream, { mimeType: mime });
            // if construction succeeded, prefer this mime
            break;
          } catch (err) {
            // try next
          }
        }
        // final fallback: no mimeType
        if (!recorder) {
          try {
            recorder = new MediaRecorder(stream);
          } catch (err) {
            recorder = null;
          }
        }

        if (recorder) {
          mediaRecorderRef.current = recorder;
          chunksRef.current = [];
          recorder.ondataavailable = (ev) => {
            if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data);
          };
          recorder.onstop = () => {
            handleRecorderStop();
            mediaRecorderRef.current = null;
          };
          recorder.start();
        } else {
          console.warn("MediaRecorder not available in this browser");
        }
      } catch (e) {
        console.warn("MediaRecorder setup failed:", e);
      }

      const tick = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
        // compute RMS-like amplitude
        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const v = dataArrayRef.current[i] - 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / dataArrayRef.current.length) / 128; // 0..~1

        // create bar levels with slight variation across bars
        setLevels((prev) => {
          const newLevels = prev.slice();
          for (let i = 0; i < BAR_COUNT; i++) {
            const variance = 0.6 + 0.4 * Math.abs(Math.sin((i / BAR_COUNT) * Math.PI * 2 + performance.now() / 200));
            const target = 8 + Math.round(rms * 60 * variance);
            // smoothing
            newLevels[i] = Math.round(newLevels[i] * 0.7 + target * 0.3);
          }
          return newLevels;
        });

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    } catch (err) {
      console.error("Microphone access denied or unavailable", err);
      setIsListening(false);
    }
  };

  const stopAudio = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        /* ignore */
      }
      audioCtxRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    // stop MediaRecorder and finalize upload
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    // reset levels
    setLevels(new Array(BAR_COUNT).fill(8));
  };

  // send recorded audio to backend when recorder stops
  const handleRecorderStop = async () => {
    try {
      const chunks = chunksRef.current;
      if (!chunks || chunks.length === 0) return;
      const blob = new Blob(chunks, { type: "audio/webm" });
      // reset chunks
      chunksRef.current = [];

      const form = new FormData();
      form.append("file", blob, "recording.webm");

      const resp = await fetch("/api/voice/voice/", { method: "POST", body: form });
      const data = await resp.json();
      if (data?.audio_base64) {
        // decode base64 and play
        const binary = atob(data.audio_base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);
        const audio = new Audio(url);
        audio.play();
      }
      if (data?.agent) {
        // set agent response into shared context so ChatSection can display it
        try {
          setAgentResponse?.(data.agent ?? null);
          // also create a dashboard notification for the reply
          addNotification?.(data.agent ?? "", "Assistant replied");
        } catch (e) {
          // fallback to console
          console.log("Agent:", data.agent);
        }
      }
    } catch (e) {
      console.error("Voice roundtrip failed:", e);
    }
  };

  return (
    <>
      {/* Centered overlay shown when listening: hides other content visually */}
      {isListening && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="relative flex flex-col items-center gap-6">
            {/* Pulsing rings behind central stop button */}
            <span className="absolute rounded-full bg-destructive/30 animate-voice-pulse animate-ring-pulse animate-color-shift w-40 h-40 sm:w-56 sm:h-56" />
            <span className="absolute rounded-full bg-destructive/20 animate-voice-pulse animate-ring-pulse animate-color-shift w-56 h-56 sm:w-72 sm:h-72" style={{ animationDelay: "0.25s" }} />
            <span className="absolute rounded-full bg-destructive/10 animate-voice-pulse animate-ring-pulse animate-color-shift w-72 h-72 sm:w-96 sm:h-96" style={{ animationDelay: "0.5s" }} />

            <button
              onClick={() => setIsListening(false)}
              aria-label="Stop listening"
              className="relative z-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full flex items-center justify-center bg-destructive shadow-elevated text-primary-foreground transition-transform active:scale-95 animate-color-shift"
            >
              <Square className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>

            {/* Animated waveform reacting to microphone input */}
            <div className="relative z-10 flex items-end gap-1 mt-2 h-8 sm:h-10">
              {levels.map((h, i) => (
                <span
                  key={i}
                  className="block bg-foreground/80 w-1 rounded-sm"
                  style={{ height: `${h}px`, transition: "height 120ms linear" }}
                />
              ))}
            </div>

            <p className="relative z-10 text-foreground text-lg font-medium">Listening... Tap to stop</p>
          </div>
        </div>
      )}

      {/* Bottom floating button (hidden while listening) */}
      <button
        onClick={() => setIsListening(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
          "bg-primary shadow-glow hover:scale-105 active:scale-95",
          isListening && "hidden"
        )}
        aria-label="Tap to Speak"
      >
        <span className={cn("absolute inset-0 rounded-full bg-primary/40 animate-voice-pulse")} />
        <span className={cn("absolute inset-0 rounded-full bg-primary/20 animate-voice-pulse", "animation-delay-500")} style={{ animationDelay: "0.5s" }} />
        <Mic className={cn("w-10 h-10 text-primary-foreground relative z-10 transition-transform")} />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Tap to Speak</span>
      </button>
    </>
  );
};

export default VoiceButton;

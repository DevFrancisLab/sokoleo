import { Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const VoiceButton = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <button
      onClick={() => setIsListening(!isListening)}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-primary shadow-glow hover:scale-105 active:scale-95",
        isListening && "bg-destructive"
      )}
      aria-label="Tap to Speak"
    >
      <span className={cn("absolute inset-0 rounded-full bg-primary/40 animate-voice-pulse", isListening && "bg-destructive/40")} />
      <span className={cn("absolute inset-0 rounded-full bg-primary/20 animate-voice-pulse", "animation-delay-500", isListening && "bg-destructive/20")} style={{ animationDelay: "0.5s" }} />
      <Mic className={cn("w-10 h-10 text-primary-foreground relative z-10 transition-transform", isListening && "animate-gentle-bounce")} />
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Tap to Speak</span>
    </button>
  );
};

export default VoiceButton;

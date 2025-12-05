# COPILOT: Implement three DRF APIViews:
# TextToSpeechView: POST JSON { "text": "..." } -> calls ElevenLabs REST TTS endpoint,
#   returns audio binary with content-type audio/mpeg.
# SpeechToTextView: POST multipart/form-data with file -> calls OpenAI Whisper (if OPENAI_API_KEY present), else returns a mock transcription.
# VoiceRoundtripView: POST multipart/form-data with file -> transcribe via STT, call a simple agent (mock) to produce a text response, call ElevenLabs TTS to synthesize response, return audio.
# Use 'requests' to call remote APIs; load ELEVEN_API_KEY and OPENAI_API_KEY from env.


import os
import requests
import base64
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


ELEVEN_API_KEY = os.getenv("ELEVEN_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


class TextToSpeechView(APIView):
    """
    Convert text to speech audio using ElevenLabs API.
    POST: JSON { "text": "..." } -> audio binary with content-type audio/mpeg
    """
    def post(self, request):
        text = request.data.get("text")
        
        if not text:
            return Response(
                {"error": "text field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not ELEVEN_API_KEY:
            return Response(
                {"error": "ELEVEN_API_KEY not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        try:
            # Call ElevenLabs TTS endpoint
            url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"
            headers = {
                "xi-api-key": ELEVEN_API_KEY,
                "Content-Type": "application/json"
            }
            payload = {
                "text": text,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.75
                }
            }
            
            response = requests.post(url, json=payload, headers=headers)
            
            if response.status_code == 200:
                # Return raw audio bytes as an HttpResponse so DRF doesn't try
                # to JSON-encode the binary data (which caused the UnicodeDecodeError).
                return HttpResponse(response.content, content_type="audio/mpeg", status=200)
            else:
                return Response(
                    {"error": f"ElevenLabs API error: {response.text}"},
                    status=response.status_code
                )
        except Exception as e:
            return Response(
                {"error": f"Text-to-speech conversion failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SpeechToTextView(APIView):
    """
    Convert speech/audio to text using OpenAI Whisper or mock transcription.
    POST: multipart/form-data with file -> JSON { "transcription": "..." }
    """
    def post(self, request):
        audio_file = request.FILES.get("file")
        
        if not audio_file:
            return Response(
                {"error": "file field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            if OPENAI_API_KEY:
                # Call OpenAI Whisper API
                url = "https://api.openai.com/v1/audio/transcriptions"
                headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
                files = {"file": audio_file}
                data = {"model": "whisper-1"}
                
                response = requests.post(url, headers=headers, files=files, data=data)
                
                if response.status_code == 200:
                    transcription = response.json().get("text", "")
                    return Response(
                        {"transcription": transcription},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"error": f"OpenAI API error: {response.text}"},
                        status=response.status_code
                    )
            else:
                # Return mock transcription
                return Response(
                    {"transcription": "This is a mock transcription of the audio file."},
                    status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response(
                {"error": f"Speech-to-text conversion failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VoiceRoundtripView(APIView):
    """
    Combined voice roundtrip: transcribe audio -> get agent response -> synthesize to speech.
    POST: multipart/form-data with file -> audio binary with content-type audio/mpeg
    """
    def post(self, request):
        audio_file = request.FILES.get("file")
        
        if not audio_file:
            return Response(
                {"error": "file field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Step 1: Transcribe audio via STT
            stt_view = SpeechToTextView()
            stt_response = stt_view.post(request)
            
            if stt_response.status_code != 200:
                return stt_response
            
            transcription = stt_response.data.get("transcription", "")
            
            # Step 2: Call simple mock agent to produce response
            agent_response = self._call_mock_agent(transcription)
            
            # Step 3: Synthesize response via ElevenLabs TTS (call API directly so we can return base64)
            if not ELEVEN_API_KEY:
                return Response({"error": "ELEVEN_API_KEY not configured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            tts_url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"
            tts_headers = {"xi-api-key": ELEVEN_API_KEY, "Content-Type": "application/json"}
            tts_payload = {
                "text": agent_response,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
            }
            tts_resp = requests.post(tts_url, json=tts_payload, headers=tts_headers)
            if tts_resp.status_code != 200:
                return Response({"error": f"ElevenLabs API error: {tts_resp.text}"}, status=tts_resp.status_code)

            audio_bytes = tts_resp.content
            audio_b64 = base64.b64encode(audio_bytes).decode("utf-8")

            return Response({
                "transcription": transcription,
                "agent": agent_response,
                "audio_base64": audio_b64,
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {"error": f"Voice roundtrip failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _call_mock_agent(self, user_input):
        """Mock agent that generates a simple response."""
        responses = {
            "market": "The best market today is Wakulima Market with high demand.",
            "price": "Tomato prices are currently at Ksh 45 per kilogram.",
            "hello": "Hello! How can I help you with market information today?",
        }
        
        user_input_lower = user_input.lower()
        for key, response in responses.items():
            if key in user_input_lower:
                return response
        
        return f"I received your message: '{user_input}'. How can I assist you?"

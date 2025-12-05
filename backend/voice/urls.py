# COPILOT: generate Django urlpatterns registering 3 endpoints:
# /api/voice/tts/ -> TextToSpeechView
# /api/voice/stt/ -> SpeechToTextView
# /api/voice/voice/ -> VoiceRoundtripView


from django.urls import path
from . import views

urlpatterns = [
    path("tts/", views.TextToSpeechView.as_view(), name="text-to-speech"),
    path("stt/", views.SpeechToTextView.as_view(), name="speech-to-text"),
    path("voice/", views.VoiceRoundtripView.as_view(), name="voice-roundtrip"),
]

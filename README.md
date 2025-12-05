**Sokoleo**

- **Project:** Sokoleo — a farmer marketplace dashboard with voice-enabled AI assistant (TTS/STT) and market insights.
- **Stack:** React + Vite + TypeScript (frontend), Django + Django REST Framework (backend).

**Quick Summary**
- Frontend: `frontend` — Vite + React (shadcn/ui + Tailwind)
- Backend: `backend` — Django project (`sokobackend`) with an `voice` app for voice endpoints
- Voice features: server-side integration with ElevenLabs TTS, optional OpenAI Whisper STT, and Groq for chat responses

**Prerequisites**
- Node.js 18+ and npm
- Python 3.10+ and pip
- (Optional) `ffmpeg` or a local audio player for testing

**Local Setup — Backend**
1. Create and activate a Python virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt  # if present; otherwise install Django + djangorestframework + requests
```

2. Create a `.env` file in `backend/` with these environment variables (examples):

```dotenv
ELEVEN_API_KEY=sk_...           # required for TTS
OPENAI_API_KEY=...              # optional, used for Whisper STT if present
GROQ_API_KEY=gsk_...            # optional, used for chatbot
# GROQ_API_URL (optional) to override endpoint if needed
```

Note: `backend/.env` is ignored by git. Do not commit secrets.

3. Run Django migrations and start the dev server:

```bash
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py runserver
```

**Backend API endpoints** (relative to Django server root):
- `POST /api/voice/tts/` — JSON `{ "text": "..." }` → returns `audio/mpeg` (binary mp3) from ElevenLabs
- `POST /api/voice/stt/` — multipart `file` upload → returns `{ "transcription": "..." }` from Whisper (if configured) or a mock
- `POST /api/voice/voice/` — multipart `file` upload → full roundtrip: STT → Chat (Groq or mock) → TTS → returns JSON `{ transcription, agent, audio_base64 }`

Example curl (TTS):

```bash
curl -X POST http://127.0.0.1:8000/api/voice/tts/ \
	-H "Content-Type: application/json" \
	-d '{"text":"Hello Sokoleo from Django"}' --output out.mp3
```

**Local Setup — Frontend**
1. Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

2. The Vite dev server serves the app (example URL: `http://localhost:5173`). Open the dashboard at `/dashboard`.

**Features**
- Market Updates — expandable market cards with price, location, and map modal
- Voice assistant — record audio, upload to backend, receive AI reply with audio + text, play audio, display reply in chat and notifications
- Notifications — dashboard bell lists assistant replies

**How the voice flow works (high level)**
1. Frontend records audio using `MediaRecorder` and uploads as `file` to `/api/voice/voice/`.
2. Backend performs STT (OpenAI Whisper if `OPENAI_API_KEY` set; otherwise a simple mock) and returns a transcription.
3. Backend queries Groq (if `GROQ_API_KEY` present) for an agent reply; otherwise uses a mock response.
4. Backend synthesizes the agent reply to audio via ElevenLabs (requires `ELEVEN_API_KEY`) and returns `audio_base64` alongside the text.
5. Frontend decodes the base64 audio, plays it, displays the agent text in `ChatSection`, and adds a notification.

**Troubleshooting**
- 401 on voice endpoints: confirm CORS and DRF local dev permissions in `sokobackend/settings.py` and restart the server.
- MediaRecorder errors: some browsers restrict mime types; the frontend tries multiple mime fallbacks. Check the browser console for errors.
- Binary/JSON encoding errors: the backend returns audio via `HttpResponse` for binary TTS to avoid DRF JSON encoding issues.
- Missing keys: if ElevenLabs or Groq calls fail, set the appropriate keys in `backend/.env` and restart the backend.

**Testing**
- Use the TTS curl example above to verify ElevenLabs TTS working and that `out.mp3` plays.
- Use the frontend dashboard: click the mic button, speak, stop recording — you should hear the synthesized reply and see a notification.

**Development notes & TODOs**
- Chat history persistence and multi-turn context for Groq are not yet implemented; adding them will improve conversation coherence.
- Add a UI loading indicator for in-flight roundtrip requests to improve user feedback.

**Contributing**
- Fork, make small focused PRs, and document new env vars or public API changes.

**License**
- No license file in this repo. Add one if you intend to open-source the project.

If you want, I can next:
- Add chat history and include recent turns in Groq prompts (improves responses), or
- Add an in-UI loading indicator and better error-toasting for the voice roundtrip.

Contact me and tell me which next step to implement.

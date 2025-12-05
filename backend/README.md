Quick start — Django backend for SokoLeo

1. Create and activate a virtualenv

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Run migrations and start dev server

```bash
python manage.py migrate
python manage.py runserver 8000
```

The minimal API endpoint will be available at `http://127.0.0.1:8000/api/hello/` and returns a JSON hello message.

Notes
- This scaffold uses SQLite by default. To use Postgres or another DB, update `sokobackend/settings.py` and set your environment variables.
- You can add production-ready settings, a `.env` loader, and a Dockerfile later if you want.

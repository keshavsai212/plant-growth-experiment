# Plant Growth Experiment

This is a beginner-friendly school project about what plants need for healthy growth.

## What Is Inside

- `src/` has the React website.
- `backend/` has a small optional Python API.
- `requirements.txt` lists Python packages for the backend.
- `package.json` lists JavaScript packages for the React website.

## Tools Used

- React: builds the interactive website.
- Vite: runs the React website while you are developing it.
- Python FastAPI: optional backend for future data or API features.
- PostgreSQL: not needed yet. You would add it later if you want to save scores or student results.

## How To Run The Website

Install the website packages once:

```bash
npm install
```

Start the website:

```bash
npm run dev
```

Then open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

## How To Run The Optional Backend

Create and activate a Python virtual environment, then install the packages:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn backend.main:app --reload
```

The backend health check will be available at:

```text
http://localhost:8000/health
```

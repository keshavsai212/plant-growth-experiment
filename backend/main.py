from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Plant Growth Experiment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Plant experiment backend is ready"}


@app.get("/api/plant-needs")
def plant_needs():
    return {
        "needs": [
            "sunlight",
            "water",
            "air",
            "soil",
            "nutrients",
            "temperature",
            "space",
        ]
    }

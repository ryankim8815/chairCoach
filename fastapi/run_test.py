from typing import Any
from fastapi import FastAPI
import uvicorn
import socketio
import numpy as np
from load_model import ChairCouchModel
from fastapi.middleware.cors import CORSMiddleware

CLIENT_URLS = ["http://localhost", "ws://localhost","ws://34.64.95.214","https://kdt-ai5-team04-gpu.elicecoding.com:443", "ws://221.156.20.146","http://localhost:3000", "ws://localhost:3000","http://localhost:3000/aistretching", "https://kdt-ai5-team04-gpu.elicecoding.com/aistretching","http://kdt-ai5-team04-gpu.elicecoding.com:3000/aistretching"]

CLIENT_URLS = ["*"]

sio: Any = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=CLIENT_URLS)
socket_app = socketio.ASGIApp(sio)

app = FastAPI()

origins = ["*"]


app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

model = ChairCouchModel()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test")
async def test():
    print("test")
    return "Works"

app.mount("/", socket_app)

@sio.event
async def connect(sid, env, auth):
    print(f"Connected to frontend with socket ID: {sid}")
    await sio.emit("message", f"Backend has connected to using socket ID: {sid}")

@sio.on("model")
async def model_predict(_, data):
    df = list(data.values())
    pred = model.predict(df)
    await sio.emit("model", f"{pred}")

@sio.event
def disconnect(sid):
    print("Socket with ID {sid} has disconnected")

if __name__ == "__main__":
    kwargs = {"host":"0.0.0.0","port": 5005}
    kwargs.update({"reload":True})
    uvicorn.run("run:app", **kwargs)
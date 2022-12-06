from typing import Any
from fastapi import FastAPI
import uvicorn
import socketio

import numpy as np
from xgboost import XGBClassifier

CLIENT_URLS = ["http://localhost:3000", "ws://localhost:3000"]

sio: Any = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=CLIENT_URLS)
socket_app = socketio.ASGIApp(sio)

app = FastAPI()

model = XGBClassifier()
model.load_model('first_model.json')

actions = np.array(['hands_up', 'neck_down', 'neck_side'])

app.mount("/", socket_app)

@sio.event
async def connect(sid, env, auth):
    print(f"Connected to frontend with socket ID: {sid}")
    await sio.emit("message", f"Backend has connected to using socket ID: {sid}")
    
@sio.on("model")
async def model_predict(_, data):
    df = list(data.values())
    pred = model.predict(df)
    action = actions[np.argmax(pred)]
    await sio.emit("model", f"{action}")

@sio.event
def disconnect(sid):
    print(f"Socket with ID {sid} has disconnected")

if __name__ == "__main__":
    kwargs = {"port": 8000}
    kwargs.update({"reload":True})
    uvicorn.run("run:app", **kwargs)
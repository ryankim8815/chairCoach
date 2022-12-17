from typing import Any
from fastapi import FastAPI
import uvicorn
import socketio
import numpy as np
from load_model import ChairCouchModel

sio: Any = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
socket_app = socketio.ASGIApp(sio)

app = FastAPI()

model = ChairCouchModel()

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
    print(f"Socket with ID {sid} has disconnected")

if __name__ == "__main__":
    kwargs = {"host":"0.0.0.0","port": 5001}
    kwargs.update({"reload":True})
    uvicorn.run("run:app", **kwargs)

from typing import Any
from fastapi import FastAPI
import uvicorn
from fastapi_socketio import SocketManager
from fastapi.responses import HTMLResponse
import socketio

import numpy as np
from xgboost import XGBClassifier

# socket_manager = SocketManager(app=app)
sio: Any = socketio.AsyncServer(async_mode="asgi")
socket_app = socketio.ASGIApp(sio)

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

model = XGBClassifier()
model.load_model('first_model.json')

actions = np.array(['hands_up', 'neck_down', 'neck_side'])



@app.get("/test")
async def get():
    return "Hello World"


app.mount("/", socket_app)
@sio.on("connect")
async def connect():
    print("Connected")
    
@sio.on("model")
async def model(data):
    df = list(data.values())
    pred = model.predict(df)
    action = actions[np.argmax(pred)]
    await sio.emit("model", action)


if __name__ == "__main__":
    kwargs = {"host": "0.0.0.0", "port": 8000}
    kwargs.update({"reload":True})
    uvicorn.run("run:app", **kwargs)
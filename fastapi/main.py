from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from xgboost import XGBClassifier
import numpy as np
import pandas as pd


app = FastAPI(title="ChairCouchModel", description="API for Pose classification", version="1.0")

class xyCoods(BaseModel):
    xy_coord: list[float]

model = XGBClassifier()
model.load_model('first_model.json')

actions = np.array(['hands_up', 'neck_down', 'neck_side'])

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/predict', tags=["predictions"])
async def get_prediction(coords:xyCoods):
    df = list(coords.dict().values())
    pred = model.predict(df)
    action = actions[np.argmax(pred)]
    return {"prediction": action}
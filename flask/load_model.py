from xgboost import XGBClassifier
import numpy as np

def set_actions():
    actions = np.array(['hands_up', 'neck_down', 'neck_side'])
    return actions

def load_model():
    model = XGBClassifier()
    
    # load weight
    model.load_model('first_model.json')
    return model
    
def predict(model, coords):
    
    pred = model.predict(coords)
    actions = set_actions()
    
    return actions[np.argmax(pred)]
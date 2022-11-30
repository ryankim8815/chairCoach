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
    

class ChairCouchModel:
    def __init__(self):
        self.actions = set_actions()
        self.model = load_model()
    
    def predict(self, coords):
        
        pred = self.model.predict(coords)
        action = self.actions[np.argmax(pred)]
        return action
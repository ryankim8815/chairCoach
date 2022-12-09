from xgboost import XGBClassifier
import numpy as np

def set_actions():
    actions = np.array(['hands_up', 'neck_down', 'neck_side'])
    return actions

def load_model():
    model = XGBClassifier()
    
    # load weight
    model.load_model('xgb_xy.json')
    return model

def extract_coord(kpts, steps):
    num_kpts = len(kpts) // steps
    temp = []
    for kid in range(num_kpts):
        x_coord, y_coord = kpts[steps * kid], kpts[steps * kid + 1]
        if steps == 3:
            conf = kpts[steps * kid + 2]
            if conf < 0.5:
                x_coord, y_coord = 0.0, 0.0
                temp.extend([x_coord, y_coord])
                continue
            temp.extend([x_coord, y_coord])

    return temp
    

class ChairCouchModel:
    def __init__(self):
        self.actions = set_actions()
        self.model = load_model()
    
    def predict(self, kpts):
        coords = [extract_coord(kpts[0], 3)]
        pred = self.model.predict(coords)
        action = self.actions[np.argmax(pred)]
        return action
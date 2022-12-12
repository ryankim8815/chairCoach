from xgboost import XGBClassifier
import numpy as np

def set_actions():
    actions = np.array(['arm_left', 'arm_right', 'arms_up', 'hands_up', 'neck_down', 'neck_down_left', 'neck_down_right', 
                        'neck_left', 'neck_right', 'neck_up', 'neck_up_left', 'neck_up_right', 'shoulder'])
    return actions

def load_model():
    model = XGBClassifier()
    
    # load weight
    model.load_model('xgb_13pose.json')
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
    
def kpts_change(kpts, img_size_w, img_size_h):
    kpts = [round(float(x), 2) for x in kpts]
    kpts = np.array(kpts)
    kpts[0::3] *= 100 / img_size_w
    kpts[1::3] *= 100 / img_size_h
    return kpts

class ChairCouchModel:
    def __init__(self):
        self.actions = set_actions()
        self.model = load_model()
    
    def predict(self, kpts):
        coords = extract_coord(kpts[0], 3)
        kpts = [kpts_change(coords, 640, 480)]
        pred = self.model.predict(kpts)
        action = self.actions[np.argmax(pred)]
        return action
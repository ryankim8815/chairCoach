from xgboost import XGBClassifier
import numpy as np

def XGBClassifierModel(test):
    
    model = XGBClassifier()

    # load model
    model.load_model('C:/Users/miming/yolo-pose-vm/elice-ai-team-04/yolov7-pose/models/first_model.json')

    # actions
    actions = np.array(['hands_up', 'neck_down', 'neck_side'])

    pred = model.predict(test)
    
    return actions[np.argmax(pred)]
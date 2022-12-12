from xgboost import XGBClassifier
import numpy as np

def XGBClassifierModel(test):
    
    model = XGBClassifier()

    # load model
    model.load_model('C:/Users/miming/yolo-pose-vm/elice-ai-team-04/yolov7-pose/models/xgb_13pose.json')

    # actions
    actions = np.array(['arm_left', 'arm_right', 'arms_up', 'hands_up', 'neck_down', 'neck_down_left', 'neck_down_right', 
                        'neck_left', 'neck_right', 'neck_up', 'neck_up_left', 'neck_up_right', 'shoulder'])

    pred = model.predict(test)
    
    return actions[np.argmax(pred)]
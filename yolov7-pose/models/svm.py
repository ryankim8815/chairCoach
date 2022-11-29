import pickle
import numpy as np

def SVM(test):
    
    # load model
    model = pickle.load(open('C:/Users/miming/yolo-pose-vm/elice-ai-team-04/yolov7-pose/models/svm_model.sav', 'rb'))

    # actions
    actions = np.array(['hands_up', 'neck_down', 'neck_side'])

    # predict
    pred = model.predict(test)
    
    return actions[np.argmax(pred)]
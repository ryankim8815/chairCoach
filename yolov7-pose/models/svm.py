import pickle
import numpy as np

def SVM(test):
    
    # load model
    model = pickle.load(open('svm_model.sav', 'rb'))

    # actions
    actions = np.array(['hands_up', 'neck_down', 'neck_side'])

    # predict
    pred = model.predict(test)
    
    return actions[np.argmax(pred)]
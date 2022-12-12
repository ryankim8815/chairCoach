from numpy import loadtxt
import numpy as np
from xgboost import XGBClassifier
import pandas as pd
from sklearn.metrics import accuracy_score
from keras.utils import to_categorical

# one hot encoding
def onehot(y):
    label = []
    for i in y:
        label.append([int(i)])
    y_result = to_categorical(label).astype(int)
    
    return y_result

# load data
train = loadtxt('./data/csvs/train_data_mv_22.csv', delimiter=",", skiprows=1)
test = loadtxt('./data/csvs/test_data_mv_22.csv', delimiter=",", skiprows=1)

X_train = train[:, :-1]
y_train_split = train[:, -1]
X_test = test[:, :-1]
y_test_split = test[:, -1]

y_train = onehot(y_train_split)
y_test = onehot(y_test_split)

print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)

# fit model no training data
model = XGBClassifier(n_estimators=500, learning_rate=0.2, max_depth=4, random_state=32)
model.fit(X_test, y_test)
print(model)

expected_y = y_test
predicted_y = model.predict(X_test)

accuracy = accuracy_score(expected_y, predicted_y)
print("Accuracy: %.2f%%" % (accuracy * 100))

# actions = np.array(['hands_up', 'neck_down', 'neck_side'])
# actions[np.argmax(predicted_y[0])]

# save model
model.save_model("xgb_13pose.json")
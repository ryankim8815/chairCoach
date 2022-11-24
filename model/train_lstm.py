import os.path
import numpy as np
import pandas as pd

from keras.models import Sequential
from keras.layers import LSTM, Dense
from keras.callbacks import TensorBoard

from sklearn.model_selection import train_test_split
from keras.utils import to_categorical

pose_classes = ['hands_up', 'neck_down', 'neck_side']
label_map = {'hands_up': 0, 'neck_down': 1, 'neck_side': 2}

train_csv = pd.read_csv('train_data.csv')
X_train = train_csv.iloc[:,:-1]
# train_csv = np.array(train_csv)
# print(train_csv.shape)

a = train_csv.iloc[:,-1]
label = []
for i in a:
    label.append([int(i)])

y_train = to_categorical(label).astype(int)


# print(label)
# print(y_train)
# print(X_train.shape)


# logging
log_dir = os.path.join('Logs')
tb_callback = TensorBoard(log_dir=log_dir)

# model learning
model = Sequential()
model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(12,33)))
model.add(LSTM(128, return_sequences=True, activation='relu'))
model.add(LSTM(64, return_sequences=False, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(3, activation='softmax'))

model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])

model.fit(X_train, y_train, epochs=100, callbacks=[tb_callback])

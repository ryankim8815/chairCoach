import numpy as np
from sklearn import svm
from sklearn.metrics import accuracy_score
from keras.utils import to_categorical

# load data
train = np.loadtxt('../data/csvs/train_data.csv', delimiter=",")
test = np.loadtxt('../data/csvs/test_data.csv', delimiter=",")

X_train = train[:, :-1]
y_train_split = train[:, -1]
X_test = test[:, :-1]
y_test_split = test[:, -1]

# create a svm Classifier
clf = svm.SVC(kernel='linear')

# train the model using the training sets
clf.fit(X_train, y_train_split)

# predict the response for test dataset
y_pred = clf.predict(X_test)

# Model Accuracy: how often is the classifier correct?
print("Accuracy:", accuracy_score(y_test_split, y_pred))

# save model
import pickle

# print('Model score:', clf.score(X_test_scaled, y_test))
pickle.dump(clf, open('svm_model.sav', 'wb'))
from imblearn.over_sampling import SMOTE
import numpy as np
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score


# load csv
X_train = np.loadtxt('./data/csvs/train_data_mv_22.csv', delimiter=",", skiprows=1) 
y_train = np.loadtxt('./data/csvs/train_y_mv_22.csv', delimiter=",", skiprows=1)
X_test = np.loadtxt('./data/csvs/test_data_mv_22.csv', delimiter=",", skiprows=1)
y_test = np.loadtxt('./data/csvs/test_y_mv_22.csv', delimiter=",", skiprows=1)

# over sampling using SMOTE
smote = SMOTE(random_state=11)
X_train_over, y_train_over = smote.fit_resample(X_train, y_train)

# train with XGBClassifier
model = XGBClassifier(n_estimators=500, learning_rate=0.2, max_depth=4, random_state=32)
model.fit(X_train_over, y_train_over)
print(model)

expected_y = y_test
predicted_y = model.predict(X_test)

accuracy = accuracy_score(expected_y, predicted_y)
print("Accuracy: %.2f%%" % (accuracy * 100))
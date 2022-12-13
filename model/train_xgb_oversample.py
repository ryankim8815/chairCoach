from imblearn.over_sampling import SMOTE
import numpy as np
from xgboost import XGBClassifier, DMatrix, cv
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split, KFold, cross_val_score


# load csv
X_train = np.loadtxt('./data/csvs/csv_2/train_data_mv2_22.csv', delimiter=",", skiprows=1) 
y_train = np.loadtxt('./data/csvs/csv_2/train_y_mv2_22.csv', delimiter=",", skiprows=1)
X_test = np.loadtxt('./data/csvs/csv_2/test_data_mv2_22.csv', delimiter=",", skiprows=1)
y_test = np.loadtxt('./data/csvs/csv_2/test_y_mv2_22.csv', delimiter=",", skiprows=1)

# over sampling using SMOTE
smote = SMOTE(random_state=11)
X_train_over, y_train_over = smote.fit_resample(X_train, y_train)

# split train, validation
X_train, X_val, y_train, y_val = train_test_split(X_train_over, y_train_over, test_size=0.10)

# train with XGBClassifier
model = XGBClassifier(n_estimators=100, learning_rate=0.16, max_depth=4, random_state=32)
# xgb_model = model.fit(X_train, y_train, early_stopping_rounds=100, eval_metric='logloss', eval_set=[(X_val, y_val)], verbose=True)
xgb_model = model.fit(X_train_over, y_train_over, eval_metric='logloss', verbose=True)
print(xgb_model)



# cross validation - cv
# data_dmatrix = DMatrix(data=X_train_over, label=y_train_over)
# params = {"objective":"binary:logistic", "learning_rate": 0.1, "max_depth": 5, "alpha": 10}
# xgb_cv = cv(dtrain=data_dmatrix, params=params, nfold=3, num_boost_round=50, early_stopping_rounds=10, metrics="logloss", as_pandas=True)
# print('교차 검증별 정확도:\n', np.round(xgb_cv, 4))
# print('평균 검증 정확도:\n', np.round(np.mean(xgb_cv), 4))

# cross validation - kfold
kfold = KFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_val_score(xgb_model, X_train_over, y_train_over, cv=kfold)

# validation score
print("교차 검증별 정확도: ", (np.round(scores, 4)* 100))
print("평균 검증 정확도: ", (np.round(np.mean(scores), 4)*100))

# prediction test
expected_y = y_test
predicted_y = xgb_model.predict(X_test)

# class report
print(classification_report(expected_y, predicted_y))

# accuracy score
accuracy = accuracy_score(expected_y, predicted_y)
print("Accuracy: %.2f%%" % (accuracy * 100))


# save model
xgb_model.save_model('xgb_mv2_params.json')
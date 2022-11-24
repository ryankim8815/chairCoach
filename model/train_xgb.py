import pandas as pd
import numpy as np

import xgboost as xgb
from sklearn.model_selection import cross_val_score, KFold
from keras.utils import to_categorical

# make csv
# y_train.to_csv('./y_train.csv', index=False)
# X_train.to_csv('./X_train.csv', index=False)


train_csv = pd.read_csv('train_data_2.csv')
test_csv = pd.read_csv('test_data_2.csv')

X_train = train_csv.iloc[:,:-1]

a = train_csv.iloc[:,-1]
label = []
for i in a:
    label.append([int(i)])
y_train = to_categorical(label).astype(int)
# y_train : [[1,0,0], [0,1,0], [0,0,1]]

# y_train = np.array(y_train)
# X_train = np.array(X_train)
# print(y_train.shape)
# print(X_train.shape)

#Validation function
n_folds = 5

def rmsle_cv(model):
    kf = KFold(n_folds, shuffle=True, random_state=42).get_n_splits(X_train.values)
    rmse= np.sqrt(-cross_val_score(model, X_train.values, y_train, scoring="neg_mean_squared_error", cv = kf))
    return(rmse)

model_xgb = xgb.XGBRegressor(colsample_bytree=0.4603, gamma=0.0468,
                             learning_rate=0.05, max_depth=3,
                             min_child_weight=1.7817, n_estimators=2200,
                             reg_alpha=0.4640, reg_lambda=0.8571,
                             subsample=0.5213, silent=1,
                             random_state =7, nthread = -1)

score = rmsle_cv(model_xgb)
xgb_score = score.mean()
print("XGBRegressor score: {:.4f} ({:.4f})".format(score.mean(), score.std()))


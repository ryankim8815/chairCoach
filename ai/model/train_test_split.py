
import os
from utils.split import split_into_train_test

dataset_in = './data/images'

# You can leave the rest alone:
if not os.path.isdir(dataset_in):
    raise Exception("dataset_in is not a valid directory")

dataset_out = './ouput folder path'
split_into_train_test(dataset_in, dataset_out, test_split=0.2)
IMAGES_ROOT = dataset_out
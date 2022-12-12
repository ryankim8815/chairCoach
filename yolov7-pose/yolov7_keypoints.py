
import cv2
import csv
import os
import tqdm
import numpy as np
import torch
from matplotlib import pyplot as plt
from PIL import Image, ImageDraw, ImageFont
from torchvision import transforms

from models.experimental import attempt_load
from utils.general import non_max_suppression
from utils.plots import output_to_keypoint, plot_skeleton_kpts


WEIGHTS = "./yolov7-w6-pose.pt"
DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
IMAGE_SIZE = 640  # Detection size

model = attempt_load(WEIGHTS, DEVICE)


def predict_keypoints(image, image_size=640, conf_thresh=0.25, iou_thresh=0.65):
    image = np.asarray(image)

    # Resize image to the inference size
    ori_h, ori_w = image.shape[:2]
    image = cv2.resize(image, (image_size, image_size))

    # Transform image from numpy to torch format
    image_pt = torch.from_numpy(image).permute(2, 0, 1).to(DEVICE)
    image_pt = image_pt.float() / 255.0

    # Infer
    with torch.no_grad():
        pred = model(image_pt[None], augment=False)[0]

    # NMS
    pred = non_max_suppression(
        pred, conf_thresh, iou_thresh,
        nc=model.yaml['nc'], nkpt=model.yaml['nkpt'], kpt_label=True
    )
    pred = output_to_keypoint(pred)
    
    # Drop
    pred = pred[:, 7:]
    
    # normalization
    pred[:,0::3] *= 100 / image_size
    pred[:,1::3] *= 100 / image_size
    
    # Resize boxes to the original image size
    # pred[:, 0::3] *= ori_w / image_size
    # pred[:, 1::3] *= ori_h / image_size

    
    return pred


def extract(kpts, steps):
    num_kpts = len(kpts) // steps
    temp = []
    for kid in range(num_kpts - 6):
        x_coord, y_coord = kpts[steps * kid], kpts[steps * kid + 1]
        if steps == 3:
            conf = kpts[steps * kid + 2]
            if conf < 0.5:
                x_coord, y_coord = 0.0, 0.0
                temp.extend([x_coord, y_coord])
                continue
            temp.extend([x_coord, y_coord])

    return temp

def process(img_in_folder, img_out_folder, csv_out_path):
    pose_class_names = sorted(
        [n for n in os.listdir(img_in_folder) if not n.startswith('.')]
    )
    label_map = {label:num for num, label in enumerate(pose_class_names)} 
    # label_map {'hands_up': 0, 'neck_down': 1, 'neck_side': 2}


    # write csv train_data
    with open(csv_out_path, 'w', newline='') as csv_out_file:
        csv_out_writer = csv.writer(csv_out_file,
                                    delimiter=',',
                                    quoting=csv.QUOTE_MINIMAL)
        
        for pose_class_name in pose_class_names:
            print("Preprocessing", pose_class_name)

            img_in = os.path.join(img_in_folder, pose_class_name)
            img_out = os.path.join(img_out_folder, pose_class_name)

            image_names = sorted(
                [n for n in os.listdir(img_in) if not n.startswith('.')])

            print('img_in: ', img_in)
            print('img_out: ', img_out)

            kpnt_values = []
            for image_name in tqdm.tqdm(image_names):
                img_path = os.path.join(img_in, image_name)

                # predict keypoints from image
                image = Image.open(img_path)
                pred = predict_keypoints(image, image_size=IMAGE_SIZE)

                # extract keypoint
                kpnt_array = extract(pred[0].T, 3)
                kpnt_array.extend([label_map[pose_class_name]])
                kpnt_values.append(kpnt_array)

            
            for i in kpnt_values:
                csv_out_writer.writerow(i)


# train or test dataset load & save csv
img_in_train_folder = os.path.join('./data/images', 'test')
img_out_train_folder = 'image_out_test'
csv_out_train_path = 'test_data_13pose.csv'
process(img_in_train_folder, img_out_train_folder, csv_out_train_path)

# test code
# image = Image.open('./data/images/3.jpg')
# pred = predict_keypoints(image, image_size=IMAGE_SIZE)
# print("pred: ", pred)
# kpnt_array = extract(pred[0].T, 3)
# print("kpnt_array: ", kpnt_array)


# show skeleton line and image
# image = np.asarray(image)
# for idx in range(pred.shape[0]):
#     plot_skeleton_kpts(image, pred[idx].T, 3)
#
# image = Image.fromarray(image)
# image.show()

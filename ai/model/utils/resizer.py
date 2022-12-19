from PIL import Image
import os
file_list = os.listdir("input path")
img_list = [file for file in file_list if ".jpg" in file]
print(img_list)

BASE_DIR = "input path"
REPLACE_DIR = "output path"

for i, img_file in enumerate(img_list):
    img = Image.open(BASE_DIR + "/" + img_file).convert("RGB")
    new_img = img.resize((1280, 720), Image.ANTIALIAS)
    new_img.save(REPLACE_DIR + "/" + "{}.jpg".format(img_file.replace(".jpg", "")), format='jpeg', quality=90)
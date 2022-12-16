import os

file_path = "file path"
file_names = os.listdir(file_path)
file_names

i = 0
for name in file_names:
    src = os.path.join(file_path, name)
    dst = str(i) + '.jpg'
    dst = os.path.join(file_path, dst)
    os.rename(src, dst)
    i += 1
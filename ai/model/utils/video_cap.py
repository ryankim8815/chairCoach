# program that can be captured from a video
import cv2

# video path
vidcap = cv2.VideoCapture('./video path.MP4')

count = 0
while(vidcap.isOpened()):
    ret, image = vidcap.read()

    if(ret==False):
        print("영상 끝!")
        break

    # 30 frame per a second
    if(int(vidcap.get(1)) % 20 == 0):
        print('Saved frame number :' + str(int(vidcap.get(1))))
        #save image path
        cv2.imwrite("./save folder path/image%d.jpg" % count, image)
        print('Saved frame%d.jpg' % count)
        count += 1

vidcap.release()
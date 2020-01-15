import cv2
from fastai import *
from fastai.vision import *
learn = load_learner('zip')
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("fail")


while 1:
    ret, img = cap.read()
    # img = cv2.imread('C:/Users/IS96273/Desktop/hababam.jpg')

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

# print(faces) #locations of detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)  # draw rectangle to main image

        detected_face = img[int(y):int(y + h), int(x):int(x + w)]  # crop detected face
        #detected_face = cv2.cvtColor(detected_face, cv2.COLOR_BGR2GRAY)  # transform to gray scale
        detected_face = cv2.resize(detected_face, (48, 48))  # resize to 48x48
        pred_class = learn.predict(Image(pil2tensor(detected_face, np.float32).div_(255)))[0]


        # write emotion text above rectangle
        cv2.putText(img, str(pred_class), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # process on detected face end0
        # -------------------------

    cv2.imshow('img', img)

    if cv2.waitKey(1) & 0xFF == ord('q'):  # press q to quit
        break


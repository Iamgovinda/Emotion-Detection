import cv2
import numpy as np
import base64
from PIL import Image
from io import BytesIO
from keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

def emotion_detector(frame):
    # Assuming 'frame' is the image captured from the camera
    face_classifier = cv2.CascadeClassifier(r'C:/Users/default.LAPTOP-6IMDNNN0/Documents/CodePlayground/emotion_detection/Emotion-Detection/backend/emotion_detector/detector/haarcascade_frontalface_default.xml')
    classifier = load_model(
        r'C:/Users/default.LAPTOP-6IMDNNN0/Documents/CodePlayground/emotion_detection/Emotion-Detection/backend/emotion_detector/detector/emotion_detection_model_100epochs.h5')

    emotion_labels = ['Angry', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_NEAREST)
        if np.sum([roi_gray]) != 0:
            roi = roi_gray.astype('float') / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)
            prediction = classifier.predict(roi)[0]
            label = emotion_labels[prediction.argmax()]
            return label
        else:
            return 'No faces'

def face_detector():
    # Using camera for face detection
    cap = cv2.VideoCapture(0)  # 0 corresponds to the default camera, change if using an external camera

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Call emotion_detector function for emotion detection
        emotion_label = emotion_detector(frame)

        # Display the emotion label on the frame
        cv2.putText(frame, f'Emotion: {emotion_label}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        # Display the frame
        cv2.imshow('Emotion Detection', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Call the face_detector function
face_detector()

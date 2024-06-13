import cv2
import numpy as np
import tensorflow as tf
import facenet
import align.detect_face
import pickle
import pyodbc
import datetime
import pygame
import time
import base64

class FaceRecognitionCamera:
    def __init__(self):
        # Load paths to classifier and FaceNet model
        self.CLASSIFIER_PATH = r'D:\AI_PROJECT\Face_Pro\Models\facemodel.pkl'  
        self.FACENET_MODEL_PATH = r'D:\AI_PROJECT\Face_Pro\Models\20180402-114759.pb'  

        # Load classifier model
        with open(self.CLASSIFIER_PATH, 'rb') as file:
            self.model, self.class_names = pickle.load(file)

        # Load FaceNet model
        with tf.Graph().as_default():
            self.sess = tf.compat.v1.Session()
            facenet.load_model(self.FACENET_MODEL_PATH)
            self.images_placeholder = tf.compat.v1.get_default_graph().get_tensor_by_name("input:0")
            self.embeddings = tf.compat.v1.get_default_graph().get_tensor_by_name("embeddings:0")
            self.phase_train_placeholder = tf.compat.v1.get_default_graph().get_tensor_by_name("phase_train:0")
            self.mtcnn_pnet, self.mtcnn_rnet, self.mtcnn_onet = align.detect_face.create_mtcnn(self.sess, None)

        # Kết nối đến cơ sở dữ liệu SQL Server
        self.conn = pyodbc.connect('DRIVER={SQL Server};'
                                   'SERVER=.;'
                                   'DATABASE=DiemdanhAI;'
                                   'UID=sa;'
                                   'PWD=123456')
        self.cursor = self.conn.cursor()

        # Khởi tạo tập hợp để theo dõi những khuôn mặt đã được nhận diện
        self.detected_faces = set()

        # Khởi tạo cửa sổ Pygame và âm thanh
        pygame.init()
        self.success_sound = pygame.mixer.Sound(r'D:\AI_PROJECT\Face_Pro\news-ting-6832.mp3')

        # Khởi tạo biến lưu thông tin nhận diện
        self.recognized_name = None
        self.recognized_time = None
        self.recognized_success = False

    def detect_faces_camera(self):
        cap = cv2.VideoCapture(0)

        while cap.isOpened():
            ret, frame = cap.read()
            if ret:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                self.detect_faces(frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            else:
                break

        cap.release()
        cv2.destroyAllWindows()

    def detect_faces(self, image):
        bounding_boxes, _ = align.detect_face.detect_face(image, 20, self.mtcnn_pnet, self.mtcnn_rnet, self.mtcnn_onet,
                                                          [0.6, 0.7, 0.7], 0.709)
        faces_found = bounding_boxes.shape[0]

        if faces_found > 0:
            largest_face_area = 0
            largest_face_index = 0
            for i, bbox in enumerate(bounding_boxes):
                det = np.squeeze(bbox[0:4])
                bb = np.zeros(4, dtype=np.int32)
                bb[0] = np.maximum(det[0], 0)
                bb[1] = np.maximum(det[1], 0)
                bb[2] = np.minimum(det[2], image.shape[1])
                bb[3] = np.minimum(det[3], image.shape[0])

                face_area = (bb[2] - bb[0]) * (bb[3] - bb[1])
                if face_area > largest_face_area:
                    largest_face_area = face_area
                    largest_face_index = i

            largest_bbox = bounding_boxes[largest_face_index]
            det = np.squeeze(largest_bbox[0:4])
            bb = np.zeros(4, dtype=np.int32)
            bb[0] = np.maximum(det[0], 0)
            bb[1] = np.maximum(det[1], 0)
            bb[2] = np.minimum(det[2], image.shape[1])
            bb[3] = np.minimum(det[3], image.shape[0])

            cropped = image[bb[1]:bb[3], bb[0]:bb[2], :]
            scaled = cv2.resize(cropped, (160, 160), interpolation=cv2.INTER_CUBIC)
            scaled = facenet.prewhiten(scaled)
            scaled_reshape = scaled.reshape(-1, 160, 160, 3)

            feed_dict = {self.images_placeholder: scaled_reshape, self.phase_train_placeholder: False}
            emb_array = self.sess.run(self.embeddings, feed_dict=feed_dict)
            predictions = self.model.predict_proba(emb_array)
            best_class_indices = np.argmax(predictions, axis=1)
            best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]

            if best_class_probabilities >= 0.8:
                best_name = self.class_names[best_class_indices[0]]
                # Kiểm tra xem khuôn mặt đã được nhận diện chưa
                if best_name not in self.detected_faces:
                    # Lưu thông tin vào biến
                    self.recognized_name = best_name
                    self.recognized_time = time.time()
                    self.recognized_success = True
                    # Lưu vào CSDL
                    self.save_recognition()
                    self.detected_faces.add(best_name)
                    self.success_sound.play()
                    print(f"{best_name} đã được điểm danh.")
            else:
                cv2.rectangle(image, (bb[0], bb[1]), (bb[2], bb[3]), (255, 0, 0), 2)
                cv2.putText(image, "Unknown", (bb[0], bb[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2,
                            cv2.LINE_AA)

            cv2.imshow('Face Recognition', cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
        else:
            cv2.imshow('Face Recognition', cv2.cvtColor(image, cv2.COLOR_RGB2BGR))

    def save_recognition(self):
        # Lưu thông tin vào CSDL
        self.cursor.execute("INSERT INTO data_sv (namesv, tt) VALUES (?, ?)", (self.recognized_name, 1))
        self.conn.commit()

    def __del__(self):
        # Đóng kết nối CSDL khi hủy đối tượng
        self.conn.close()
        pygame.quit()

def main():
    face_recognition = FaceRecognitionCamera()
    face_recognition.detect_faces_camera()

if __name__ == "__main__":
    main()

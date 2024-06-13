import cv2
import numpy as np
import tensorflow as tf
import facenet
import align.detect_face
import pickle

class FaceRecognitionCamera:
    def __init__(self):
        # Load paths to classifier and FaceNet model
        self.CLASSIFIER_PATH = r'D:\AI_PROJECT\ProJect_DiemDanh\BackEnd\Face_AI\Models\facemodel.pkl'
        self.FACENET_MODEL_PATH = r'D:\AI_PROJECT\ProJect_DiemDanh\BackEnd\Face_AI\Models\20180402-114759.pb'

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

    def detect_faces_camera(self):
        cap = cv2.VideoCapture(0)

        while cap.isOpened():
            ret, frame = cap.read()
            if ret:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                self.detect_faces(frame)
                # Hiển thị video với kết quả nhận diện khuôn mặt
                cv2.imshow('Face Recognition', cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))

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
            for bbox in bounding_boxes:
                det = np.squeeze(bbox[0:4])
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
                    # Hiển thị kết quả nhận diện trên video
                    self.show_detection_result(image, bb, best_name)

        else:
            # Hiển thị "Không có khuôn mặt được phát hiện" nếu không có khuôn mặt nào trong khung hình
            cv2.putText(image, "Khong co khuon mat duoc phat hien", (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    def show_detection_result(self, image, bb, name):
        # Hiển thị khuôn mặt và tên của người được nhận diện
        cv2.rectangle(image, (bb[0], bb[1]), (bb[2], bb[3]), (0, 255, 0), 2)
        cv2.putText(image, name, (bb[0], bb[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

def main():
    face_recognition = FaceRecognitionCamera()
    face_recognition.detect_faces_camera()

if __name__ == "__main__":
    main()

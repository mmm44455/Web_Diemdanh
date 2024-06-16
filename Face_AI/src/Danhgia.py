import cv2
import numpy as np
import os
import tensorflow as tf
import facenet
import align.detect_face
import pickle
from tkinter import *
from tkinter import filedialog
from PIL import Image, ImageTk
import tkinter as tk
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

class FaceRecognitionApp:
    def __init__(self, root):
        # ... (phần khởi tạo giữ nguyên)

        # Thêm một nút để bắt đầu quá trình đánh giá mô hình
        self.results_label = Text(root, width=40, height=10)
        self.results_label.pack(pady=5, anchor=NE)

        self.evaluate_model_button = Button(root, text="Đánh giá mô hình", command=self.evaluate_model)
        self.evaluate_model_button.pack(pady=5, anchor=NE)

    def evaluate_model(self):
        # Load paths to classifier and FaceNet model
        CLASSIFIER_PATH = r'../Models/facemodel.pkl'  # Đường dẫn đến file classifier
        FACENET_MODEL_PATH = '../Models/20180402-114759.pb'  # Đường dẫn đến file FaceNet model

        # Load classifier model
        with open(CLASSIFIER_PATH, 'rb') as file:
            model, class_names = pickle.load(file)

        # Load FaceNet model
        with tf.Graph().as_default():
            sess = tf.compat.v1.Session()
            facenet.load_model(FACENET_MODEL_PATH)
            images_placeholder = tf.compat.v1.get_default_graph().get_tensor_by_name("input:0")
            embeddings = tf.compat.v1.get_default_graph().get_tensor_by_name("embeddings:0")
            phase_train_placeholder = tf.compat.v1.get_default_graph().get_tensor_by_name("phase_train:0")
            embedding_size = embeddings.get_shape()[1]

        # Load paths and labels for the test dataset
        dataset = facenet.get_dataset("../Dataset/FaceData/processed")
        paths, labels = facenet.get_image_paths_and_labels(dataset)

        # Calculate embeddings for the test dataset
        emb_array = np.zeros((len(paths), embedding_size))
        for i in range(len(paths)):
            img = cv2.imread(paths[i])
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            scaled = cv2.resize(img, (160, 160), interpolation=cv2.INTER_CUBIC)
            scaled = facenet.prewhiten(scaled)
            scaled_reshape = scaled.reshape(-1, 160, 160, 3)
            feed_dict = {images_placeholder: scaled_reshape, phase_train_placeholder: False}
            emb_array[i, :] = sess.run(embeddings, feed_dict=feed_dict)

        # Predict labels for the test dataset
        predictions = model.predict(emb_array)
        accuracy = accuracy_score(labels, predictions)

        # Display accuracy in the results label
        if hasattr(self, 'results_label') and isinstance(self.results_label, Text):
            self.results_label.delete('1.0', END)
            self.results_label.insert(END, f"Độ chính xác trên tập kiểm tra: {accuracy:.2%}")

        # Vẽ biểu đồ
        self.plot_accuracy_curve(model, emb_array, labels, class_names)

    def plot_accuracy_curve(self, model, emb_array, labels, class_names):
        # Vẽ biểu đồ độ chính xác
        predictions = model.predict_proba(emb_array)
        best_class_indices = np.argmax(predictions, axis=1)
        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]

        plt.figure(figsize=(10, 6))
        plt.plot(range(len(best_class_indices)), best_class_probabilities, marker='o', linestyle='-')
        plt.xticks(range(len(best_class_indices)), [class_names[i] for i in best_class_indices], rotation='vertical')
        plt.xlabel('Lớp')
        plt.ylabel('Độ chính xác')
        plt.title('Độ chính xác của mô hình trên tập kiểm tra')
        plt.grid(True)
        plt.tight_layout()
        plt.show()


def main():
    root = Tk()
    app = FaceRecognitionApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()

import subprocess

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout, stderr

# Câu lệnh cắt ảnh khuôn mặt từ ảnh gốc
align_command = "python src/align_dataset_mtcnn.py Dataset/FaceData/raw Dataset/FaceData/processed --image_size 160 --margin 32 --random_order --gpu_memory_fraction 0.25"

# Câu lệnh tạo model
model_command = "python src/classifier.py TRAIN Dataset/FaceData/processed Models/20180402-114759.pb Models/facemodel.pkl --batch_size 1000"

# Chạy cả hai câu lệnh
align_output, align_error = run_command(align_command)
model_output, model_error = run_command(model_command)

# Hiển thị kết quả (tùy chọn)
print("Kết quả của câu lệnh cắt ảnh khuôn mặt từ ảnh gốc:")
print(align_output.decode("utf-8"))
print("Lỗi (nếu có):")
print(align_error.decode("utf-8"))

print("\nKết quả của câu lệnh tạo model:")
print(model_output.decode("utf-8"))
print("Lỗi (nếu có):")
print(model_error.decode("utf-8"))

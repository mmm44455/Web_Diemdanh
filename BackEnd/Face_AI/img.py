import cv2
import os


def capture_frames(video_path, output_folder, num_frames=100):
    # Tạo thư mục đầu ra nếu nó không tồn tại
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Mở video
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Không thể mở video.")
        return

    frame_count = 0
    success = True

    while frame_count < num_frames and success:
        # Đọc frame từ video
        success, frame = cap.read()
        if not success:
            break

        # Lưu frame vào thư mục đầu ra
        output_path = os.path.join(output_folder, f"frame_{frame_count}.jpg")
        cv2.imwrite(output_path, frame)

        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()


def main():
    video_path = r"C:\Users\57\Downloads\5527066175944.mp4"
    output_folder = r"D:\AI_PROJECT\ProJect_DiemDanh\BackEnd\Face_AI\Dataset\FaceData\raw\K205480106035"
    num_frames = 100

    capture_frames(video_path, output_folder, num_frames)


if __name__ == "__main__":
    main()

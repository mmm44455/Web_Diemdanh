import cv2
import os


def create_student_folder(parent_folder, student_id):
    folder_path = os.path.join(parent_folder, student_id)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    return folder_path


def capture_images(folder_path, num_images=100):
    count = 0

    directions = ['front', 'left', 'right', 'up', 'down']
    direction_index = 0

    while count < num_images:
        direction = directions[direction_index]
        print(f"Look {direction} and press any key to capture image for this direction.")

        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        cap.release()

        if not ret:
            break

        image_path = os.path.join(folder_path, f'{count:03d}_{direction}.jpg')
        cv2.imwrite(image_path, frame)
        count += 1
        print(f"Captured image {count}/{num_images} for direction {direction}.")

        direction_index = (direction_index + 1) % len(directions)

    cv2.destroyAllWindows()


def main():
    parent_folder = r'D:\AI_PROJECT\Face_Pro\Dataset\FaceData\raw'
    student_id = input("Enter student ID: ")

    folder_path = create_student_folder(parent_folder, student_id)
    capture_images(folder_path)


if __name__ == "__main__":
    main()

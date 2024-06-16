import React, { useRef, useState } from 'react';
import { Card, CardMedia, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const TrainFace = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [studentId, setStudentId] = useState('');
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [capturedImagesCount, setCapturedImagesCount] = useState(0);

    const startVideo = async () => {
        const constraints = {
            video: true,
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsVideoStarted(true);
            }
        } catch (err) {
            console.error('Error accessing webcam:', err);
        }
    };

    const captureAndSaveImage = async () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Draw current video frame onto the canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas content to base64 data URL (JPEG format with 0.92 quality)
        const image_data = canvas.toDataURL('image/jpeg', 0.92);

        try {
            // Save captured image
            const response = await axios.post('/api/capture-image/', {
                student_id: studentId,
                image_data: image_data,
            });
            console.log(response.data.message);

            // Increment captured images count after successful capture
            setCapturedImagesCount(prevCount => prevCount + 1);

            // Clear student ID after successful capture
            setStudentId('');
        } catch (error) {
            console.error('Error capturing image:', error);
            alert('Failed to capture image.');
        }
    };

    const handleCaptureImages = async () => {
        if (!studentId) {
            alert('Vui lòng nhập mã sinh viên trước khi chụp ảnh và lưu.');
            return;
        }

        if (!isVideoStarted) {
            await startVideo(); // Start video if not already started
        }

        // Capture 100 images (you can adjust this as needed)
        const totalImages = 100;
        for (let i = 0; i < totalImages; i++) {
            await captureAndSaveImage();

            // Delay between captures (adjust as needed)
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay 500ms between captures
        }

        // Stop video after capturing all images
        stopVideo();
    };

    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setIsVideoStarted(false);
    };

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleTrainModel = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/align-dataset');
            alert(response.data.message);  // Hiển thị thông báo thành công từ backend
        } catch (error) {
            console.error('Failed to train model:', error);
            alert('Failed to train model. Please check the console for details.');
        }
    };
   
    return (
        <>
            <Card sx={{ width: '100%', height: '300px', position: 'relative' }}>
                <CardMedia
                    component="video"
                    ref={videoRef}
                    autoPlay={false} // Set autoPlay to false to prevent automatic starting of video
                    muted
                    sx={{ width: '100%', height: '100%' }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
            </Card>
            <TextField
                label="Mã sinh viên"
                value={studentId}
                onChange={handleStudentIdChange}
                sx={{ marginTop: '10px', width: '100%' }}
            />
            <Button
                variant="contained"
                onClick={handleCaptureImages}
                sx={{ marginTop: '10px' }}
            >
                Chụp 100 ảnh và lưu
            </Button>
            <Button
                variant="contained"
                onClick={stopVideo}
                sx={{ marginTop: '10px', marginLeft: '5px' }}
                color="error"
            >
                Tắt cam
            </Button>
            <Button
            variant="contained"
            onClick={handleTrainModel}
            sx={{ marginTop: '10px' ,marginLeft: '5px' }}
            color="success"
        >
            Train mô hình
        </Button>

     
            <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
                Số lượng ảnh đã chụp: {capturedImagesCount}
            </Typography>
        </>
    );
};

export default TrainFace;

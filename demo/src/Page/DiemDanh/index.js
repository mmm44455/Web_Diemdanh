import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Box, Grid, Paper, Card, CardMedia } from '@mui/material';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import getUserInfo from '../../common/Api/ApiInFo';
import CardStudent from '../../common/component/Card';
import PostStu from '../../common/Api/ApiInsetDD';

const FaceRecognition = () => {
    const nav = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const location = useLocation();
    const [faces, setFaces] = useState([]);
    const [isDetecting, setIsDetecting] = useState(false);
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [studentInfo, setStudentInfo] = useState(null);
    const { MaMon, MaLop, TenMon, date, startTime, endTime } = location.state || {};
    const [maLop, setMaLop] = useState(MaLop || '');
    const [maMon, setMaMon] = useState(MaMon || '');
    const [tenMon, setTenMon] = useState(TenMon || '');
    const [mess, setMess] = useState('');

    let day, month, year, formattedDate, formattedDateStart, formattedDateEnd;
    if (date) {
        [day, month, year] = date.split('/');
        formattedDate = `${year}-${parseInt(month)}-${parseInt(day)}`;
        formattedDateStart = `${formattedDate} ${startTime}`;
        formattedDateEnd = `${formattedDate} ${endTime}`;
    }

    useEffect(() => {
        if (maLop && maMon && tenMon) {
            startVideo();
        }
    }, [maLop, maMon, tenMon]);

    const fetchPost = async (mssv, timeAtt) => {
        if (mssv && timeAtt) {
            PostStu(mssv, MaLop, MaMon, formattedDateStart, formattedDateEnd, timeAtt)
                .then(data => {
                    setMess(data);
                })
                .catch(error => {
                    console.error('Error posting student info:', error.message);
                });
        } else {
            console.warn('Missing mssv or timeAtt data. Skipping post request.');
        }
    };
    console.log(mess);
    useEffect(() => {
        if (isVideoStarted) {
            const intervalId = setInterval(detectFaces, 3000);
            return () => clearInterval(intervalId);
        }
    }, [isVideoStarted]);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsVideoStarted(true);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setIsVideoStarted(false);
        setStudentInfo(false);
    };

    const detectFaces = async () => {
        setIsDetecting(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        try {
            const response = await axios.post('http://localhost:8000/face-recognition', { image_data: imageData });
            setFaces(response.data);
            console.log('API Response:', response.data);
            if (response.data.length > 0) {
                const mssv = response.data[0];
                const currentDate = new Date();
                const formattedCurrentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                fetchStudentInfo(mssv);
                if (mssv !== null && MaLop && MaMon && formattedDateStart && formattedDateEnd) {
                    fetchPost(mssv, formattedCurrentDate);
                }
            }
        } catch (error) {
            console.error('Error detecting faces:', error);
        } finally {
            setIsDetecting(false);
        }
    };

    const fetchStudentInfo = async (mssv) => {
        getUserInfo(mssv)
            .then(response => {
                setStudentInfo(response);
                console.log('Student Info:', studentInfo);
            })
            .catch(error => {
                console.error('Error fetching student info:', error.message);
            });
    };

    const handleTKB = () => {
        nav("/tkb");
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box my={2}>
                        <Card sx={{ width: '100%', height: '300px', position: 'relative' }}>
                            <CardMedia
                                component="video"
                                ref={videoRef}
                                muted
                                sx={{ width: '100%', height: '100%' }}
                            />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </Card>
                    </Box>
                    <Box display="flex" justifyContent="center" my={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item>
                                {!isVideoStarted ? (
                                    <Button variant="contained" color="primary" onClick={startVideo}>
                                        Nhận diện
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="error" onClick={stopVideo}>
                                        Kết thúc
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    {maLop && maMon && tenMon && (
                        <Grid item xs={12} md={6}>
                            <Card sx={{ padding: 2, textAlign: 'center' }}>
                                <Typography variant="subtitle1">Tên môn: {tenMon}</Typography>
                                <Typography variant="subtitle1">Mã môn: {maMon}</Typography>
                                <Typography variant="subtitle1">Mã lớp: {maLop}</Typography>
                            </Card>
                        </Grid>
                    )}
                    {faces && faces.length > 0 && (
                        <Grid container spacing={2} justifyContent="center" my={2}>
                            {faces.map((face, index) => (
                                <Grid item key={index} xs={12} className='StudSV'>
                                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', marginTop: '5px' }}>
                                        <Typography variant="subtitle1">Mã số sinh viên :  {face} </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {studentInfo && (
                        <Box mt={2}>
                            <CardStudent 
                                name={studentInfo.UserName}
                                date={studentInfo.Date}
                                gioitinh={studentInfo.Role}
                                img={studentInfo.img}
                                nameGV={studentInfo.ClassTeacher}
                                Class={studentInfo.Class}
                            />
                            {mess.Message === 'Attendance has been taken' && (
                                <Paper elevation={3} sx={{ textAlign: 'center',padding:'10px', marginTop: '5px',backgroundColor:'#dffbff' }}>
                                    <Typography variant="subtitle1">Điểm danh thành công</Typography>
                                </Paper>
                            )}
                            {mess.Message === 'Attendance time is not within the course time period' && (
                                <Paper elevation={3} sx={{ textAlign: 'center',padding:'10px', marginTop: '5px',backgroundColor:'red' }}>
                                    <Typography variant="subtitle1">Thời gian điểm danh đã qua</Typography>
                                </Paper>
                            )}
                            {mess.Message === 'Students have taken attendance' && (
                                <Paper elevation={3} sx={{ textAlign: 'center',padding:'10px', marginTop: '5px',backgroundColor:'green'}}>
                                    <Typography variant="subtitle1">Bạn đã điểm danh</Typography>
                                </Paper>
                            )}
                        </Box>
                    )}
                    {maLop && maMon && tenMon && (
                        <Button variant="contained" onClick={handleTKB} style={{marginTop:'5px'}}>Trở về</Button>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default FaceRecognition;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './Componnet/LoginForm'
import Logo from './Componnet/Logo'
import './sytle.css';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='FormLogin'>
            <Logo />
            <LoginForm />
    
        </div>
    );
};

export default LoginPage;

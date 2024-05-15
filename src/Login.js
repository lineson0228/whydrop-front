import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); 
        const loginData = {
            userID,
            password
        };

        try {
            const response = await axios.post('여기다가 주소 적어줘', loginData); 

            // 성공적인 응답 처리
            if (response.status === 200) {
                alert('Login Success');
                onLogin(); // 로그인 상태 업데이트
                navigate('/'); // 메인 화면으로 리디렉션
            } else {
                alert('Login Failed');
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert('Login Failed'); 
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="loginPage">
            <img src="main.png" alt="Main" className="mainImage" />
            <form className="loginForm" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="UserID"
                    value={userID}
                    onChange={e => setUserID(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>} {/* 에러 메시지 표시 */}
        </div>
    );
}

export default Login;

import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Body from './Body';
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = async (navigate) => {
        try {
            const response = await axios.post('로그아웃 엔드포인트'); // 서버에 로그아웃 요청을 보냅니다.
            if (response.status === 200) {
                setIsLoggedIn(false); // 로그아웃 상태로 변경
                navigate('/'); // 메인 화면으로 리디렉션
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    };

    const imageRef = useRef(null);
    const [buttonSize, setButtonSize] = useState(0);
    const [stage, setStage] = useState(0);

    useEffect(() => {
        function updateButtonSize() {
            if (imageRef.current) {
                const width = imageRef.current.clientWidth;
                const minButtonWidth = 120;
                const buttonWidth = Math.max(width * 0.25, minButtonWidth);
                setButtonSize(buttonWidth);
            }
        }

        window.addEventListener('resize', updateButtonSize);
        updateButtonSize();

        const timers = [
            setTimeout(() => setStage(1), 1000),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
        ];

        return () => {
            window.removeEventListener('resize', updateButtonSize);
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return (
        <div className="app">
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Body imageRef={imageRef} buttonSize={buttonSize} stage={stage} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;

import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
    const imageRef = useRef(null);
    const [buttonSize, setButtonSize] = useState(0);
    const [stage, setStage] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

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

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="app">
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Body imageRef={imageRef} buttonSize={buttonSize} stage={stage} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

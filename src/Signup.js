import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
    // 상태 변수 설정
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();  // 폼의 기본 제출 이벤트 방지
        const userData = {
            username,
            email,
            userID,
            password
        };

        try {
            const response = await axios.post('여기다가 엔드포인트', userData);
            console.log('Success:', response.data); 
        } catch (error) {
            console.error('Error:', error.response.data); // 에러 응답 출력
        }
    };

    return (
        <div className="signupPage">
            <img src="main.png" alt="Main" className="mainImage" />
            <form className="signupForm" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" placeholder="UserID" value={userID} onChange={e => setUserID(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;

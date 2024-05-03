import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); 
        const loginData = {
            userID,
            password
        };

        try {
            const response = await axios.post('', loginData);
            console.log('Login success:', response.data);
            alert('Login Success'); 
        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert('Login Failed'); 
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="loginPage">
            <img src="main.png" alt="Main" className="mainImage" />
            <form className="loginForm" onSubmit={handleLogin}>
                <input type="text" placeholder="UserID" value={userID} onChange={e => setUserID(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}  // 에러 메시지 표시
        </div>
    );
}

export default Login;

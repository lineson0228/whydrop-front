import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';  // CSS 모듈 불러오기

function Header({ isLoggedIn, onLogout }) {
    return (
        <div className={styles.header}>
            <div className={styles.logoSection}>
                <Link to="/" className={styles.logoLink}>
                    <img src="logo.png" alt="Logo" className={styles.logo} />
                    <h1 className={styles.title}>왜 떨어졌니?</h1>
                </Link>
            </div>
            <div className={styles.buttonSection}>
                {isLoggedIn ? (
                    <>
                        <Link to="/mypage">
                            <button className={styles.button}><img src="button3.png" alt="My Page" /></button>
                        </Link>
                        <button className={styles.button} onClick={onLogout}><img src="button4.png" alt="Logout" /></button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">
                            <button className={styles.button}><img src="button1.png" alt="Sign Up" /></button>
                        </Link>
                        <Link to="/login">
                            <button className={styles.button}><img src="button2.png" alt="Login" /></button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;

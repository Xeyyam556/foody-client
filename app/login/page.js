
"use client";
import styles from './login.module.css';
import loginImg from '../image/Rectangle 79.png';
import registerImg from '../image/Rectangle 79 (2).png';
import Image from 'next/image';
import { useState, useCallback, useRef, useEffect,useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { userContext } from "../context/userContext";

export default function Login() {
    const [showLogin, setShowLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); 
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useContext(userContext)

    const fNameRef = useRef();
    const showLogIn = true
    const nameRef = useRef();
    const mailRef = useRef();
    const passRef = useRef();
    const router = useRouter();

    useEffect(() => {
        if (fNameRef.current) fNameRef.current.value = '';
        if (nameRef.current) nameRef.current.value = '';
        if (mailRef.current) mailRef.current.value = '';
        if (passRef.current) passRef.current.value = '';
    }, []);


    const createRegister = async (e) => {
        e.preventDefault();
        try {
            if (showLogin) {
                const response = await axios.post("/api/auth/signin", {
                    email: mailRef.current.value,
                    password: passRef.current.value,
                });
                let data = {
                    nameRef: response.data.user.username,
                    fNameRef: response.data.user.fullname,
                    id: response.data.user.id,
                    mailRef: response.data.user.email
                }
                setUser(data)

                if (response && response.data) {
                    localStorage.setItem('refresh_token', response.data.user.refresh_token);
                    localStorage.setItem('access_token', response.data.user.access_token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    showAlertMessage('Login successful!', 'success');

                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                }
            } else {
                const response = await axios.post("/api/auth/signup", {
                    email: mailRef.current.value,
                    password: passRef.current.value,
                    fullname: fNameRef.current.value,
                    username: nameRef.current.value,
                });

                if (response && response.data) {
                    showAlertMessage('Registration successful!', 'success');

                }
            }
        } catch (error) {
            showAlertMessage('An error occurred. Please try again.', 'error');
        }
    };

    useEffect(() => {
        if (alertType === 'success' && showAlert) {
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
    }, [alertType, showAlert]);



    const showAlertMessage = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };
    const resetForm = () => {
        if (fNameRef.current) fNameRef.current.value = '';
        if (nameRef.current) nameRef.current.value = '';
        if (mailRef.current) mailRef.current.value = '';
        if (passRef.current) passRef.current.value = '';
    };


    const login = () => {
        console.log(showLogin, "login")
        setShowLogin(true);
        resetForm()
    };
    useEffect(() => {
        console.log(showLogin, 'showLogin changed');
    }, [showLogin]);


    const register = () => {
        console.log(showLogin, "register")

        setShowLogin(false);
        resetForm
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };



    const foody = useCallback(() => {
        router.push('/');
    }, []);

    return (
        <>
            <header>
                <div className={styles.headDiv}>
                    <h1 onClick={foody}>Foody.</h1>
                </div>
            </header>
            <main className={styles.mainDiv}>
                <div className={styles.imageDiv}>
                    <Image
                        width={650}
                        height={650}
                        className={styles.loginImgg}
                        src={showLogin ? loginImg : registerImg}
                        alt="sekil"
                    />
                </div>
                <div className={styles.loginDiv}>
                    <div className={styles.loginWriting}>
                        <a onClick={login} style={{ color: showLogin ? 'rgb(235, 87, 87)' : 'rgb(130, 130, 130)' }}>Login</a>
                        <a onClick={register} style={{ color: showLogin ? 'rgb(130, 130, 130)' : 'rgb(235, 87, 87)' }}>Register</a>
                    </div>
                    {showAlert && (
                        <div className={`${styles.alert} ${alertType === 'success' ? styles.alertSuccess : styles.alertError}`} style={{ display: showAlert ? 'block' : 'none' }}>
                            {alertMessage}
                        </div>
                    )}
                    <form onSubmit={createRegister}>
                        <div className={styles.login}>
                            <label>Email</label>
                            <input type="email" ref={mailRef} id='mail' required />

                            <div className={styles.register} style={{ display: showLogin ? 'none' : 'flex' }}>
                                <label>Full Name</label>
                                <input type="text" ref={fNameRef} required={!showLogin} id='full name' />
                                <label>Username</label>
                                <input type="text" ref={nameRef} required={!showLogin} id='username' />
                            </div>

                            <label>Password</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    ref={passRef}
                                    required
                                    style={{ paddingRight: '30px', width: '80%' }}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{ position: 'absolute', right: '100px', cursor: 'pointer' }}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>

                            <button type="submit" className={styles.registerBtn}>
                                {showLogin ? 'Log In' : 'Register'}
                            </button>
                        </div>
                    </form>


                </div>
            </main>
        </>
    );
}

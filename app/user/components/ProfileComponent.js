"use client";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect,useContext } from "react";
import Image from "next/image";
import styles from "../components/css/profile.module.css";
import profilImg from "../../image/Vector (21).png";
import basketImg from "../../image/Vector (22).png";
import addImg from "../../image/Vector (26).png";
import { userContext } from '../../context/userContext'
import spinGif from "../../image/spin.gif";

import axios from "axios";
import { useAuth } from "../../context/userContext";

export default function ProfileComponent() {
    
    const [user, setUser] = useContext(userContext)
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState(null);
    const [profile, setProfile] = useState({
        email: '',
        username: '',
        phone: '',
        address: '',
        fullName: '',
    });
    const fileInputRef = useRef();
    const email = useRef()
    const contact = useRef()
    const address = useRef()
    const username = useRef()
    const fullname = useRef()
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        email.current.value = user.email
        username.current.value = user.username
        fullname.current.value = user.fullname
    }, [user])

    const getProfile = async () => {
        let authorization;
        if (window) {
            authorization = localStorage.getItem('access_token');
        }
        try {
            const response = await axios.get("/api/auth/user", {
                headers: {
                    Authorization: `Bearer ${authorization}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

   

    const handleUploadClick = () => {
        fileInputRef.current.click();
        if (imageSrc) {
            setImageSrc("");
        }
    };

    const logout = () => {
        if (window) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("ally-supports-cache");
            localStorage.removeItem("refresh_token");
            setIsLoggedIn(false); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile updated:", profile);
    };

    return (
        <section className={styles.profilSection}>
            <div className={styles.profileNavDiv}>
                <nav>
                    <ul>
                        <li>
                            <Link className={styles.mainLink} href="/user?page=profile">
                                <Image alt="profil" src={profilImg} className={styles.image} />
                                <button className={styles.mainBtn}>Profile</button>
                            </Link>
                            <Link href="/user?page=basket" className={styles.otherLink}>
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Your Basket</button>
                            </Link>
                            <Link href="/user?page=orders" className={styles.otherLink}>
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Your Orders</button>
                            </Link>
                            <Link href="/user?page=checkout" className={styles.otherLink}>
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Checkout</button>
                            </Link>
                            <Link href="/" className={styles.otherLink} onClick={logout} >
                                <Image alt="basket" src={basketImg} className={styles.image}  />
                                <button className={styles.otherBtn} onClick={logout}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.profilDiv}>
                <div className={styles.profileUpload}>
                    <h1>Profile</h1>
                    <div onClick={handleUploadClick} className={styles.uploadIcon}>
                        <Image
                            src={addImg}
                            alt="Upload"
                            style={{ cursor: "pointer", width: "90px", height: "70px" }}
                        />
                        <p>Upload</p>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                    {imageSrc && (
                        <div className={styles.imagePreview}>
                            <Image
                                width={150}
                                height={150}
                                src={imageSrc}
                                alt="Uploaded"
                            />
                        </div>
                    )}
                </div>
                <div className={styles.formDiv}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label>Contact</label><br />
                            <input
                                type="tel"
                                id="phone"
                                className={styles.inputs}
                                placeholder="Enter your phone number"
                                value={profile.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Email</label><br />
                            <input
                                ref={email}
                                type="email"
                                id="email"
                                className={styles.inputs}
                                placeholder="Enter your email"
                                value={profile.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Username</label><br />
                            <input
                                ref={username}
                                type="text"
                                id="username"
                                className={styles.inputs}
                                placeholder="Enter your username"
                                value={profile.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Address</label><br />
                            <input
                                ref={
                                    address
                                }
                                type="text"
                                id="address"
                                className={styles.inputs}
                                placeholder="Enter your address"
                                value={profile.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Full Name</label><br />
                            <input
                                ref={fullname}
                                type="text"
                                id="fullName"
                                className={styles.inputs}
                                placeholder="Enter your full name"
                                value={profile.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

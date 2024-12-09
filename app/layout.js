"use client";

import Link from "next/link";
import Image from "next/image";
import insta from "./image/Vector (16).png";
import fb from "./image/Vector (15).png";
import twitter from "./image/Vector (17).png";
import styles from "./layout.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import pp from './image/pngwing.com (26).png';
import "./globals.css";
import UserContext from './context/userContext'

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'], // İstediğiniz ağırlıkları ekleyin
  subsets: ['latin'],
  display: 'swap',
});
export default function Layout({ children }) {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");
    const pathname = usePathname();
    const router = useRouter();
    const [isMenu, setIsMenu] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const otherMenu = () => {
        setIsMenu(!isMenu)

        console.log(isMenu)
    }

    const signUp = useCallback(() => {
        router.push("/login");
    }, [router]);

    const foody = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem('refresh_token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const logout = () => {
        setIsLoggedIn(false)
        setIsMenu(false)
        if (window) {
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')

            localStorage.removeItem('ally-supports-cache')

            localStorage.removeItem('refresh_token')

        }

    }
    const otherMenubtn = () => {
        setIsMenu(false)
    }

    return (
        <>
            <html lang="en">
                <body>
                    <UserContext>

                        <header style={{ display: pathname === "/login" ? "none" : "block" }}>
                            <div className={styles.head}>
                                <button className={styles.hamburger} onClick={toggleMenu}>
                                <div className={styles.backFont} style={{display: isOpen?"block":"none" }}></div>

                                    &#9776;
                                </button>
                                <h1 onClick={foody}>Foody.</h1>

                                <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>

                                    <ul>
                                        <li>
                                            <Link href="/" className={styles.link} onClick={toggleMenu} >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/restaurants" className={styles.link} onClick={toggleMenu}>
                                                Restaurants
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/about-us" className={styles.link} onClick={toggleMenu}>
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/how-it-works" className={styles.link} onClick={toggleMenu}>
                                                How It Works
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faqs" className={styles.link} onClick={toggleMenu}>
                                                FAQs
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>

                                {isLoggedIn ? (
                                    <button className={styles.profilBtn} onClick={otherMenu}>
                                        <Image
                                            src={pp}
                                            alt="Profile"
                                            className={styles.profileImage}
                                            width={50}
                                            height={50}
                                        />
                                    </button>
                                ) : (
                                    <button onClick={signUp} className={styles.signUpBtn}>
                                        Sign up
                                    </button>
                                )}
                                {isMenu && (
                                    <>
                                    <div onClick={(otherMenu)} className={styles.backFont}></div>
                                        <div className={styles.otherMenuDiv}>
                                            <Link href="/user?page=profile">
                                                <button onClick={otherMenubtn}>Profile</button>
                                            </Link>
                                            <Link href="/user?page=basket">
                                                <button onClick={otherMenubtn}>Your Basket</button>
                                            </Link>
                                            <Link href="/user?page=orders">
                                                <button onClick={otherMenubtn}>Your Orders</button>
                                            </Link>
                                            <Link href="/user?page=checkout">
                                                <button onClick={otherMenubtn}>Checkout</button>
                                            </Link>
                                            <button onClick={logout}>Logout</button>
                                        </div>
                                    </>
                                )}


                            </div>
                        </header>

                        {isOpen && <div /*className={styles.overlay}*/ onClick={toggleMenu} />}
                        <main>

                            {children}
                        </main>                    <footer
                            style={{ display: pathname === "/login" ? "none" : "block" }}
                            className={styles.footer}
                        >
                            <div className={styles.footerDiv}>
                                <div className={styles.media}>
                                    <h1>Foody.</h1>
                                    <p>Social media of the person who prepared the Foody project</p>
                                    <div className={styles.socialMedia}>
                                        <Link rel="noopener noreferrer" target="_blank" href={"https://www.instagram.com/h_xeyyam_11"}><Image src={insta} alt="insta" /></Link>
                                        <Link target="_blank" rel="noopener noreferrer" href={"https://x.com/Xeyyam556"}><Image src={twitter} alt="twit" /></Link>
                                        <Link target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/xeyyam.huseynov.543"}><Image src={fb} alt="fb" /></Link>
                                    </div>
                                </div>
                                <div className={styles.otherInfo}>
                                    <div className={styles.popular}>
                                        <h1>Popular</h1>
                                        <p>Programming</p>
                                        <p>Book for children</p>
                                        <p>Psychology</p>
                                        <p>Business</p>
                                    </div>
                                    <div className={styles.popular}>
                                        <h1>Cash</h1>
                                        <p>Delivery</p>
                                        <p>About the story</p>
                                    </div>
                                    <div className={styles.popular}>
                                        <h1>Help</h1>
                                        <p>Contacts</p>
                                        <p>Purhase returns</p>
                                        <p>Buyer help</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footerDiv2}>
                                <h1>All rights reserved © 2003-2024 Foody TERMS OF USE | Privacy Policy</h1>
                            </div>
                        </footer>
                    </UserContext>
                </body>
            </html>
        </>
    );
}

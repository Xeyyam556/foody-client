"use client";
import styles from './aboutUs.module.css';
import backgroundImg from '../image/Rectangle 103.png';
import burger from '../image/Rectangle 69.png';
import pizza from '../image/Rectangle 69 (1).png';
import soup from '../image/Rectangle 69 (2).png';
import coffee from '../image/Rectangle 69 (3).png';
import backgroundImg2 from '../image/Rectangle 104.png';
import spinGif from '../image/spin.gif';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutUs() {
    const [spin, setSpin] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpin(false);
        }, 1000);

        return () => clearTimeout(timer); r
    }, []);

    return (
        <>
            {spin ? (
                <div className={styles.spinnerContainer}>
                    <Image className={styles.spin} width={600} height={600} src={spinGif} alt="Loading..." />
                </div>
            ) : (
                <section className={styles.aUSection}>
                    <div className={styles.aUDIv}>
                        <h1>About Us</h1>
                        <p>Welcome to <span>FOODY.</span>, where we connect you to the best local restaurants and stores at the tap of a button. Our mission is to make your daily life easier by bringing delicious meals, essential groceries, and more right to your door, quickly and reliably.

                            We believe in supporting local businesses, and we partner with trusted vendors to offer a wide variety of high-quality products. Whether you're craving your favorite dish or need something from the store, we're here to make it happen, anytime and anywhere.

                            At <span>FOODY.</span>, we’re committed to excellent service, seamless delivery, and ensuring customer satisfaction every step of the way.
                        </p>
                    </div>
                    <div className={styles.aUImg}>
                        <Image className={styles.backgroundImg} src={backgroundImg} alt="background" />
                        <Image className={styles.backgroundImg2} src={backgroundImg2} alt="background2" />
                        <div className={styles.burgerDiv}>
                            <Image src={burger} className={styles.burger} alt="burger" />
                            <h1>Hamburger</h1>
                            <p>$5.90</p>
                        </div>
                        <div className={styles.pizzaDiv}>
                            <Image src={pizza} className={styles.pizza} alt="pizza" />
                            <h1>Sausage Pizza</h1>
                            <p>$7.90</p>
                        </div>
                        <div className={styles.soupDiv}>
                            <Image src={soup} className={styles.soup} alt="soup" />
                            <h1>Tomato Soup</h1>
                            <p>$7.90</p>
                        </div>
                        <div className={styles.coffeeDiv}>
                            <Image src={coffee} className={styles.coffee} alt="coffee" />
                            <h1>Papa Coffee</h1>
                            <p>$7.90</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

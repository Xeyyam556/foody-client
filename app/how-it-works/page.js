"use client";
import styles from './howItWorks.module.css';
import Image from 'next/image';
import background from '../image/Rectangle 103 (1).png';
import delivery from '../image/Rectangle 105.png';
import backgroundMobile from '../image/Rectangle 120.png';
import spinGif from '../image/spin.gif';
import { useState, useEffect } from 'react';

export default function HowItWorks() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={styles.spinnerContainer}>
                    <Image src={spinGif} alt='Loading...' className={styles.spin} width={600} height={600} />
                </div>
            ) : (
                <section className={styles.hIWSection}>
                    <div className={styles.hIWDiv}>
                        <h1>How it works</h1>
                        <p>
                            Delivery may be extended during sale periods. Please refer to the checkout page for an updated estimate for your location. Kindly note that once you have placed an order, it is no longer possible to modify your order. Taxes and duties are included in all product prices. It is possible to place an order with shipment to a different address than your home or billing address when paying with a credit card. Please note that Klarna payments require that your order is shipped to your registered home address.
                        </p>
                    </div>
                    <div className={styles.hIWImg}>
                        <Image
                            src={background}
                            className={styles.backgroundImg}
                            alt='background'
                            width={900}
                            height={500}
                        />
                        <Image 
                            src={backgroundMobile}
                            alt='mobil'
                            width={400}
                            height={600}
                            className={styles.backgroundMobileImg}
                        />
                        <Image
                            src={delivery}
                            className={styles.deliveryImg}
                            alt='delivery'
                            width={700}
                            height={700}
                        />
                    </div>
                </section>
            )}
        </>
    );
}

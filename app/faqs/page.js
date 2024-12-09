'use client'
import FaqItem from './faqsitem'
import styles from './faqs.module.css'
import Image from 'next/image';

import spinGif from '../image/spin.gif'
import { useState, useEffect } from 'react'

export default function Faqs() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    const faqs = [
        {
            question: "How to contact with Customer Service?",
            answer: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!"
        },
        {
            question: "There are products not available in the webshop.",
            answer: "If you cannot find a product in the webshop, it might be out of stock. Please check back later or contact us for more information."
        },
        {
            question: "I want to cancel my order.",
            answer: "To cancel your order, please visit your order history and select the cancel option or contact customer service."
        },
        {
            question: "What payment options are there?",
            answer: "We accept various payment options including credit/debit cards, PayPal, and bank transfers."
        }
    ];

    return (
        <>
            {isLoading ? (
                <div className={styles.spinnerContainer}>
                    <Image src={spinGif} alt='Loading...' className={styles.spin} width={600} height={600} />
                </div>
            ) : (
                <div className={styles.container}>
                    <h1 className={styles.title}>F.A.Q</h1>
                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

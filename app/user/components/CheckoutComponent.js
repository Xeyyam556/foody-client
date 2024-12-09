"use client";
import Link from "next/link";
import styles from '../components/css/checkout.module.css';
import profilImg from '../../image/Vector (23).png';
import Image from "next/image";
import basketImg from '../../image/Vector (22).png';
import basketImg2 from '../../image/shopping_basket.png';
import emtyBasketImg from "../../image/Rectangle 149 (1).png";
import succesImg from "../../image/check.png";
import spinGif from "../../image/spin.gif";
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from "react";

export default function CheckoutComponent() {
    const [phone, setPhone] = useState('+994');
    const [selectedMethod, setSelectedMethod] = useState('payAtDoor');
    const [basket, setBasket] = useState({ items: [] });
    const [showSucces, setShowSucces]=useState(false);
    const [showCheckout, setShowCheckout]=useState(true);
    const [loading, setLoading] = useState(true);

    const contact = useRef();
    const address = useRef();

    const calculateTotalPrice = () => {
        return basket.items.reduce((total, item) => total + item.price * item.count, 0);
    };

    const fetchBasket = useCallback(async () => {
        const authorization = localStorage.getItem('access_token');
        setLoading(true);
        try {
            const responseBasket = await axios.get('/api/basket', {
                headers: {
                    Authorization: `Bearer ${authorization}`
                }
            });
            setBasket(responseBasket.data.result.data);
        } catch (error) {
            console.error('Error fetching basket:', error);
        } finally {
            setLoading(false); 
        }
    }, []);

    useEffect(() => {
        fetchBasket();
    }, [fetchBasket]);

    const handlePaymentChange = (method) => {
        setSelectedMethod(method);
        console.log("Selected payment method:", method);
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('ally-supports-cache');
            localStorage.removeItem('refresh_token');
        }
    };

    const checkout = useCallback(async (e) => {
        e.preventDefault();
        let token;
        if (typeof window !== undefined) {
            token = localStorage.getItem('access_token');
        }
        let method;
        if (selectedMethod === 'payAtDoor') {
            method = 0;
        } else {
            method = 1;
        }
        setShowSucces(true);
        setShowCheckout(false);
        try {
            console.log(method, address.current.value, contact.current.value);

            await axios.post('/api/order', {
                basket_id: basket.id,
                contact: contact.current.value,
                delivery_address: address.current.value,
                payment_method: method
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setSelectedMethod('payAtDoor');
    }, [basket.id, selectedMethod]);

    const inputChange = useCallback((e) => {
        let inpValue = e.target.value;
        inpValue = inpValue.replace(/[^\d+]/g, '');
        if (!inpValue.startsWith('+994') && !inpValue) {
            inpValue = '+994' + inpValue.replace(/^\+994/, '');
        }
        setPhone(inpValue);
    }, []);

    return (
        <section className={styles.profilSection}>
            <div className={styles.profileNavDiv}>
                <nav>
                    <ul>
                        <li>
                            <Link className={styles.otherLink} href="/user?page=profile">
                                <Image alt="profil" src={profilImg} className={styles.image} />
                                <button className={styles.otherBtn}>Profile</button>
                            </Link>
                            <Link href="/user?page=basket" className={styles.otherLink}>
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Your Basket</button>
                            </Link>
                            <Link href="/user?page=orders" className={styles.otherLink}>
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Your Orders</button>
                            </Link>
                            <Link href="/user?page=checkout" className={styles.mainLink}>
                                <Image alt="basket" src={basketImg2} className={styles.image} />
                                <button className={styles.mainBtn}>Checkout</button>
                            </Link>
                            <Link href="/" className={styles.otherLink} onClick={logout} >
                                <Image alt="basket" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn} onClick={logout}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {showSucces && (
                <div className={styles.succesDiv}>
                    <Image alt="succes" src={succesImg} className={styles.success} />
                    <h1>Your order has been received</h1>
                </div>
            )}

            {loading ? ( 
                <div className={styles.loadingDiv}>
                    <Image src={spinGif} alt="Loading..." className={styles.spin} width={600} height={600}  />
                </div>
            ) : (
                showCheckout && (
                    <div className={styles.checkoutDiv}>
                        <div className={styles.checkout}>
                            <h1>Checkout</h1>
                            <form className={styles.form}>
                                <div>
                                    <label className={styles.labels}>Delivery Address</label><br />
                                    <input className={styles.inputs} ref={address} type="text" placeholder="Enter your address" /><br />
                                </div>
                                <div>
                                    <label className={styles.labels}>Contact Number</label><br />
                                    <input className={styles.inputs} onChange={inputChange} value={phone} ref={contact} type="tel" placeholder="Enter your contact number" />
                                </div>
                            </form>
                            <div className={styles.paymentDiv}>
                                <h3 className={styles.paymentTitle}>Payment Method</h3>
                                <div className={styles.optionContainer}>
                                    <label className={styles.option}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="payAtDoor"
                                            checked={selectedMethod === 'payAtDoor'}
                                            onChange={() => handlePaymentChange('payAtDoor')}
                                            className={styles.radioInput}
                                        />
                                        <span className={styles.customRadio}></span>
                                        Pay at the door
                                    </label>
                                    <label className={styles.option}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="creditCard"
                                            checked={selectedMethod === 'creditCard'}
                                            onChange={() => handlePaymentChange('creditCard')}
                                            className={styles.radioInput}
                                        />
                                        <span className={styles.customRadio}></span>
                                        Pay at the door by credit card
                                    </label>
                                </div>
                                <button className={styles.checkoutBtn} onClick={checkout}>Checkout</button>
                            </div>
                        </div>
                        <div className={styles.orderDiv}>
                            <h1>Your Order</h1>
                            <div className={styles.basketDiv2}>
                                {basket.items.length > 0 ? (
                                    basket.items.map((item, index) => (
                                        <div key={index} className={styles.basketDiv}>
                                            <div className={styles.productDiv}>
                                                <p>{item.count}</p>
                                                <p>x</p>
                                                <h2>{item.name}</h2>
                                                <h3>${item.price}</h3>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Image src={emtyBasketImg} alt="empty" className={styles.emtyBasket} width={230} height={230} />
                                )}
                            </div>
                            <hr className={styles.hr}></hr>
                            <div className={styles.totalDiv}>
                                <h4>Total</h4>
                                <p>${calculateTotalPrice()}</p>
                            </div>
                            <button className={styles.checkoutBtn2}>Checkout</button>
                        </div>
                    </div>
                )
            )}
        </section>
    );
}

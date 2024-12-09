"use client";
import Link from "next/link";
import styles from '../components/css/basket.module.css';
import profilImg from '../../image/Vector (23).png';
import Image from "next/image";
import basketImg from '../../image/Vector (22).png';
import basketImg2 from '../../image/shopping_basket.png';
import imgDelete from "../../image/Vector (25).png";
import emtyBasketImg from "../../image/Rectangle 149 (1).png";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export default function BasketComponent() {
    const [basket, setBasket] = useState({ items: [] });
    // const logout = () => {
    //     setIsLoggedIn(false)
    //     setIsMenu(false)
    //     if (window) {
    //         localStorage.removeItem('user')
    //         localStorage.removeItem('access_token')

    //         localStorage.removeItem('ally-supports-cache')

    //         localStorage.removeItem('refresh_token')

    //     }

    // }

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('ally-supports-cache');
            localStorage.removeItem('refresh_token');
        }
    };

    const fetchBasket = useCallback(async () => {
        let authorization = localStorage.getItem('access_token');
        try {
            const responseBasket = await axios.get('/api/basket', {
                headers: {
                    Authorization: `Bearer ${authorization}`
                }
            });
            setBasket(responseBasket.data.result.data);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    }, []);

    useEffect(() => {
        fetchBasket();
    }, [fetchBasket]);

    const calculateTotalPrice = () => {
        return basket.items.reduce((total, item) => total + item.price * item.count, 0);
    };

    const updateProductQuantity = async (productId, action) => {
        let authorization = localStorage.getItem('access_token');
        const endpoint = action === "increase" ? '/api/basket/add' : '/api/basket/delete';
        try {
            await axios({
                method: action === "increase" ? 'POST' : 'DELETE',
                url: endpoint,
                headers: { Authorization: `Bearer ${authorization}` },
                data: { product_id: productId }
            });
            fetchBasket();
        } catch (error) {
            console.error(`Error updating product quantity (${action}):`, error);
        }
    };

    const clearProduct = useCallback(async () => {
        let authorization;
        if (window) {
            authorization = localStorage.getItem('access_token');
        }

        try {
            await axios.delete('/api/basket/clear', {
                headers: {
                    Authorization: `Bearer ${authorization}`,
                },
                data: {
                    basket_id: basket.id,
                },
            });
            await fetchBasket();
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    }, [basket.id]);

    return (
        <section className={styles.basketSection}>
            <div className={styles.basketNavDiv}>
                <nav>
                    <ul>
                        <li>
                            <Link className={styles.otherLink} href="/user?page=profile">
                                <Image alt="profile" src={profilImg} className={styles.image} />
                                <button className={styles.otherBtn}>Profile</button>
                            </Link>
                            <Link href="/user?page=basket" className={styles.mainLink}>
                                <Image alt="basket" src={basketImg2} className={styles.image} />
                                <button className={styles.mainBtn}>Your Basket</button>
                            </Link>
                            <Link href="/user?page=orders" className={styles.otherLink}>
                                <Image alt="orders" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Your Orders</button>
                            </Link>
                            <Link href="/user?page=checkout" className={styles.otherLink}>
                                <Image alt="checkout" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn}>Checkout</button>
                            </Link>
                            <Link href="/" className={styles.otherLink} onClick={logout}>
                                <Image alt="logout" src={basketImg} className={styles.image} />
                                <button className={styles.otherBtn} onClick={logout}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={styles.basketDiv}>
                <h1>Your Basket</h1>
                
                {basket.items.length > 0 ? (
                    basket.items.map(item => (
                        <div className={styles.productDiv} key={item.id}>
                            <Image
                                src={item.img_url || "/default-product.png"}
                                alt={item.name}
                                width={60}
                                height={60}
                                className={styles.imgg}
                            />
                            <div className={styles.aboutProduct}>
                                <h2>{item.name}</h2>
                                <p>${item.price}</p>
                            </div>
                            <div className={styles.increaseDiv}>
                                <button onClick={() => updateProductQuantity(item.id, "increase")}>+</button>
                                <p>{item.count}</p>
                                <button onClick={() => updateProductQuantity(item.id, "decrease")}>-</button>
                            </div>
                            <Image
                                onClick={() => clearProduct(item.id)}
                                src={imgDelete}
                                alt="delete"
                                className={styles.delete}
                                width={30}
                                height={30}
                            />
                        </div>
                    ))
                ) : (
                    <Image src={emtyBasketImg} alt="empty" className={styles.emtyBasket} width={530} height={530} />
                )}

                <Link href="/user?page=checkout" className={styles.checkout}>
            
                        <h1>Checkout</h1>
                        <p>${calculateTotalPrice()}</p>
                </Link>
            </div>
        </section>
    );
}

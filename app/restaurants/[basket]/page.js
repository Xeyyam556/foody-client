"use client";
import styles from "./basket.module.css";
import Image from 'next/image';
import axios from "axios";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import deleteImg from './Vector (19).png';
import img from './Rectangle 69 (5).png';
import emptyBasket from './Rectangle 149.png';
import imgDelete from './Vector (20).png';

export default function Basket() {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState({});
    const [empty, setEmpty] = useState(true);
    const [restaurant, setRestaurant] = useState({});
    const path = useParams();
    const router = useRouter();

    useEffect(() => {
        if (basket.items && basket.items.length > 0) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    }, [basket]);

    const goBack = () => {
        router.push('/restaurants');
        setBasket("");
    };

    const addProduct = useCallback(async (id) => {
        let authorization = localStorage.getItem('access_token');
        try {
            await axios.post('/api/basket/add', { product_id: id }, {
                headers: { Authorization: `Bearer ${authorization}` }
            });
            await fetchBasket();
        } catch (error) {
            console.error('Error adding product to basket:', error);
        }
    }, []);

    const fetchBasket = async () => {
        let authorization = localStorage.getItem('access_token');
        try {
            const responseBasket = await axios.get('/api/basket', {
                headers: { Authorization: `Bearer ${authorization}` }
            });
            setBasket(responseBasket.data.result.data);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    };

    useEffect(() => {
        const getRestaurants = async () => {
            let authorization = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`/api/restuarants/${path.basket}`);
                const restaurantData = response.data.result.data;
                setRestaurant(restaurantData);

                const responseProduct = await axios.get('/api/products');
                const filteredProducts = responseProduct.data.result.data.filter(
                    product => product.rest_id === restaurantData.id
                );
                await fetchBasket();
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching restaurants or products:", error);
            }
        };
        getRestaurants();
    }, [path.basket]);

    const calculateTotalPrice = () => {
        return basket.items.reduce((total, item) => total + item.price * item.count, 0);
    };

    const clearProduct = useCallback(async () => {
        let authorization = localStorage.getItem('access_token');
        try {
            await axios.delete('/api/basket/clear', {
                headers: { Authorization: `Bearer ${authorization}` },
                data: { basket_id: basket.id }
            });
            await fetchBasket();
        } catch (error) {
            console.error("Error clearing basket:", error);
        }
    }, [basket.id]);

    const increaseProduct = useCallback(async (id) => {
        let authorization = localStorage.getItem('access_token');
        try {
            await axios.delete('/api/basket/delete', {
                headers: { Authorization: `Bearer ${authorization}` },
                data: { product_id: id }
            });
            await fetchBasket();
        } catch (error) {
            console.error('Error deleting product from basket:', error);
        }
    }, []);

    return (
        <>
            <section className={styles.sectionImg}>
                <div className={styles.divAboutRest}>
                    <Image
                        src={restaurant.img_url || "/default-image.png"}
                        className={styles.restImg}
                        alt="image"
                        width={300}
                        height={150}
                    />
                </div>
                <div className={styles.restDiv}>
                    <div className={styles.nameAndAdrrss}>
                        <h1>{restaurant.name}</h1>
                        <p>{restaurant.address}</p>
                    </div>
                    <div className={styles.cuisine}>
                        <h1>Cuisine</h1>
                        <p>{restaurant.cuisine}</p>
                    </div>
                    <div className={styles.restBtn}>
                        <button>${restaurant.delivery_price} Delivery</button>
                        <button onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </section>

            <section className={styles.basketSection}>
                <div className={styles.productDiv}>
                    <h1 className={styles.product}>Product</h1>
                    {products.length > 0 ? (
                        products.map(product => (
                            <div className={styles.productss} key={product.id}>
                                <Image
                                    src={product.img_url || "/default-product.png"}
                                    width={60}
                                    height={60}
                                    className={styles.productImg}
                                    alt={product.name}
                                />
                                <div className={styles.aboutProduct}>
                                    <h1>{product.name}</h1>
                                    <p>{product.description}</p>
                                </div>
                                <h1 className={styles.price}>From ${product.price}</h1>
                                <button
                                    onClick={() => addProduct(product.id)}
                                    className={styles.buy}
                                >
                                    +
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products found for this restaurant.</p>
                    )}
                </div>

                {!empty ? (
                    <div className={styles.basketDiv}>
                        <div className={styles.items}>
                            <Image src={deleteImg} alt="Basket" width={35} height={28} />
                            <h2>{basket.items.length} items</h2>
                        </div>
                        {basket.items.map(item => (
                            <div className={styles.productsInBasket} key={item.id}>
                                <Image
                                    src={item.img_url || "/default-product.png"}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className={styles.imgg}
                                />
                                <div className={styles.aboutProduct}>
                                    <h1>{item.name}</h1>
                                    <p>${item.price}</p>
                                </div>
                                <div className={styles.increaseDiv}>
                                    <button onClick={() => addProduct(item.id)}>+</button>
                                    <p>{item.count}</p>
                                    <button onClick={() => increaseProduct(item.id)}>-</button>
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
                        ))}
                            <Link  href="/user?page=checkout" className={styles.checkout}>
                            <h1>Checkout</h1>
                            <p>${calculateTotalPrice()}</p>
                            </Link>
                        
                    </div>
                ) : (
                    <div className={styles.basketDiv}>
                        <Image
                            className={styles.emptyBasket}
                            src={emptyBasket}
                            alt="Empty Basket"
                            width={300}
                            height={300}
                        />
                        <h1 className={styles.oops}>Opps! Basket empty</h1>
                    </div>
                )}
            </section>
        </>
    );
}

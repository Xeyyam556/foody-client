"use client"
import Image from 'next/image';
import styles from './restaurant.module.css'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import filterImg from "../image/Vector (27).png"
import cancelImg from "../image/cancel.png"
import spinGif from '../image/spin.gif'

export default function Restaurants() {
    const [category, setCategory] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [categoryId, setCategoryId] = useState('all');
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [spin, setSpin] = useState(true); 
    const [filter, setFilter] = useState(false);
    const router = useRouter();

    const basket = useCallback((id) => {
        router.push(`/restaurants/${id}`);
    }, [router]);

    const addProduct = useCallback(async (id) => {
        let authorization;
        if (window) {
            authorization = localStorage.getItem('access_token');
        }
        try {
            await axios.post('/api/basket/add', {
                product_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${authorization}`
                }
            });
        } catch (error) {
            console.error('Error adding product to basket:', error);
        }
    }, []);

    const getCategory = async () => {
        const response = await axios.get("/api/category");
        setCategory(response.data.result.data);
    };

    const getRestaurant = async () => {
        const responses = await axios.get("/api/restuarants");
        setRestaurant(responses.data.result.data);
        setSpin(false);
    };

    const fetchRestaurants = useCallback(() => {
        const filteredRestaurants = categoryId === "all" ? restaurant : restaurant.filter(res => res.category_id === categoryId);
        setTotalRestaurants(filteredRestaurants.length);
    }, [categoryId, restaurant]);

    useEffect(() => {
        fetchRestaurants();
    }, [categoryId, fetchRestaurants]);

    useEffect(() => {
        setSpin(true);
        getCategory();
        getRestaurant();
    }, []);

    const changeCategory = useCallback((id) => {
        setCategoryId(id);
        setFilter(false)
    }, []);

    const showFilter = () => {
        setFilter(!filter);
    };

    useEffect(() => {
        if (filter) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [filter]);

    const cancel = () => {
        setFilter(false);
    };

    return (
        <>
            <section className={styles.sectionRest} style={{ display: spin ? 'none' : 'flex' }}>
                <div className={styles.filterDiv} onClick={showFilter}>
                    <Image alt='filter' src={filterImg} className={styles.filterImg} />
                    <h1>Filters</h1>
                </div>
                <div className={styles.divCategory}>
                    <button
                        className={styles.allRest}
                        onClick={() => changeCategory('all')}
                        style={{
                            backgroundColor: categoryId === 'all' ? '#E53935' : '#F3F4F6',
                            color: categoryId === 'all' ? '#FFF' : '#333333',
                            border: categoryId === 'all' ? '1px solid rgb(214, 54, 38)' : 'none'
                        }}
                    >
                        All
                    </button>
                    {category.map((categorys) => (
                        <div className={styles.category}
                            onClick={() => changeCategory(categorys.id)}
                            style={{ backgroundColor: categoryId === categorys.id ? '#E53935' : '#F3F4F6' }}
                            key={categorys.id}>
                            <Image src={categorys.img_url} width={35} height={35} alt='food' className={styles.categoryImg} />
                            <h1 style={{ color: categoryId === categorys.id ? '#FFF' : '#333333' }}>{categorys.name}</h1>
                        </div>
                    ))}
                </div>
                <div className={styles.divRest}>
                    {restaurant
                        .filter(res => categoryId === "all" || res.category_id === categoryId)
                        .map((restaurants) => (
                            <div key={restaurants.id} onClick={() => basket(restaurants.id)} className={styles.restaurants}>
                                <div className={styles.imgDiv}>
                                    <Image src={restaurants.img_url} className={styles.restImg} width={100} height={100} alt="restFood" />
                                </div>
                                <h1>{restaurants.name}</h1>
                                <h2>{restaurants.cuisine}</h2>
                                <div className={styles.infoRest}>
                                    <p>${restaurants.delivery_price} delivery</p>
                                    <button>{restaurants.delivery_min} min</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {filter && (
                    <div className={styles.overlay} onClick={cancel}>
                        <div className={`${styles.categoryFilter} ${!filter ? styles['categoryFilter-exit'] : ''}`} onClick={cancel}>
                            <div className={styles.filterContent} onClick={(e) => e.stopPropagation()}>
                                <Image src={cancelImg} alt='cancel' width={50} height={50} className={styles.cancelImg} onClick={cancel} />
                                <button
                                    className={styles.allRest}
                                    onClick={() => changeCategory('all')}
                                    style={{
                                        backgroundColor: categoryId === 'all' ? '#E53935' : '#F3F4F6',
                                        color: categoryId === 'all' ? '#FFF' : '#333333',
                                        border: categoryId === 'all' ? '1px solid rgb(214, 54, 38)' : 'none'
                                    }}
                                >
                                    All
                                </button>
                                {category.map((categorys) => (
                                    <div
                                        className={styles.category}
                                        onClick={() => changeCategory(categorys.id)}
                                        style={{ backgroundColor: categoryId === categorys.id ? '#E53935' : '#F3F4F6' }}
                                        key={categorys.id}
                                    >
                                        <h1 style={{ color: categoryId === categorys.id ? '#FFF' : '#333333' }}>{categorys.name}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Image className={styles.spin} style={{ display: spin ? 'block' : 'none' }} width={600} height={600} src={spinGif} alt='spin' />
        </>
    );
}

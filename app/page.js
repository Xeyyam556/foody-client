"use client";
import styles from "./home.module.css";
import Image from "next/image";
import burger from "./image/Rectangle 45.png";
import fries from "./image/Rectangle 47.png";
import miniBurger from "./image/Rectangle 47 (1).png";
import pizza from "./image/Rectangle 47 (2).png";
import fhd from "./image/Rectangle 49 (2).png";
import fhf from "./image/Rectangle 49 (1).png";
import db from "./image/Rectangle 49.png";
import cheeseBurger from "./image/Rectangle 49 (3).png";
import twister from "./image/Rectangle 49 (5).png";
import margarita from "./image/Rectangle 49 (4).png";
import spinGif from "./image/spin.gif";
import bigBurger from "./image/Rectangle 54.png";
import bigPizza from "./image/Rectangle 51 (1).png";
import rightImg from "./image/Rectangle 50.png";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import leftImg from "./image/Rectangle 50 (1).png";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [spin, setSpin] = useState(true);

    const getOffers = async () => {
        const response = await axios.get("/api/offer");
        setOffers(response.data.result.data);
        setSpin(false);
    };

    useEffect(() => {
        getOffers();
    }, []);

    const router = useRouter();

    const signUp = useCallback(() => {
        router.push("/login");
    }, []);

    const order = useCallback(() => {
        router.push("/restaurants");
    }, []);

    return (
        <>
            {spin ? (
                
                    <Image className={styles.spinner} src={spinGif} alt="Loading" width={600} height={600} />
            ) : (
                <>
                    <section className={styles.sectionBegin}>
                        <div className={styles.open}>
                            <div className={styles.info}>
                                <h1>Our Food site makes it easy to find local food</h1>
                                <p>
                                    You can register by clicking on the "register" button below,
                                    and you can click on the "order now" button to place your order.
                                </p>
                                <div className={styles.button}>
                                    <button onClick={signUp}>Register</button>
                                    <button onClick={order}>Order now</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.burgerDiv}>
                            <div className={styles.burger}>
                                <Image className={styles.burgerImg} src={burger} alt="burger" />
                            </div>
                            <div className={styles.miniDiv}>
                                <div className={styles.pizza}>
                                    <Image src={pizza} height={55} width={65} alt="pizza" />
                                    <div>
                                        <h1>Pizza Hut</h1>
                                        <p>Yummy...</p>
                                    </div>
                                </div>
                                <div className={styles.fries}>
                                    <Image src={fries} height={55} width={65} alt="fries" />
                                    <div>
                                        <h1>French Fries</h1>
                                        <p>Yummy...</p>
                                    </div>
                                </div>
                                <div className={styles.miniBurger}>
                                    <Image src={miniBurger} height={55} width={65} alt="mini burger" />
                                    <div>
                                        <h1>Cheese Burger</h1>
                                        <p>Yummy...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.foodsSection}>
                        <div className={styles.writing}>
                            <h1>Features</h1>
                            <p>
                                Lorem ipsum is placeholder text commonly used in the graphic,
                                print, and publishing industries for previewing layouts and visual mockups.
                            </p>
                        </div>
                        <div className={styles.food}>
                            <div className={styles.DB}>
                                <Image className={styles.foodImg} src={db} alt="db" />
                                <h1>Discount Voucher</h1>
                                <p>
                                    Use this Discount Voucher to save on your next purchase and
                                    enjoy exclusive savings just for you!
                                </p>
                            </div>
                            <div className={styles.FHF}>
                                <Image src={fhf} className={styles.foodImg} alt="fhf" />
                                <h1>Fresh healthy Food</h1>
                                <p>
                                    Enjoy fresh, healthy food at a great price use this voucher to
                                    savor delicious savings on your next meal!
                                </p>
                            </div>
                            <div className={styles.FHD}>
                                <Image src={fhd} alt="fhd" className={styles.foodImg} />
                                <h1>Fast Home Delivery</h1>
                                <p>
                                    Experience fast home delivery use this voucher to get your
                                    favorite items delivered right to your door with extra savings!
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className={styles.offersSection}>
                        <h1>Offers</h1>
                        {offers.map((offer, index) => (
                            <div key={`${index}-div`} style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }} className={styles.offerDiv}>
                                <div className={styles.offerInfo}>
                                    <h2>{offer.name}</h2>
                                    <p>{offer.description}</p>
                                </div>
                                <div className={styles.offerImg}>
                                    <Image className={styles.leftImg} src={offer.img_url} width={340} height={340} alt="offer" />
                                    <Image width={450} height={480} src={index % 2 === 0 ? rightImg : leftImg} alt="img" />
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className={styles.popularFoodSection}>
                        <div className={styles.popFoodsWriting}>
                            <h1>Our Popular Update New Foods</h1>
                            <p>
                                Discover our updated selection of popular new foods and enjoy
                                exclusive savings with this voucher on your next purchase!
                            </p>
                        </div>
                        <div className={styles.popFoods}>
                            <div className={styles.cheeseBurger}>
                                <Image src={cheeseBurger} alt="burger" className={styles.popFoodImg} />
                                <h1>Double Cheese</h1>
                                <p>
                                    Indulge in our double cheeseburger, featuring two juicy patties
                                    and two layers of melted cheese for a deliciously satisfying meal.
                                </p>
                            </div>
                            <div className={styles.margarita}>
                                <Image src={margarita} alt="margarita" className={styles.popFoodImg} />
                                <h1>Margarita</h1>
                                <p>
                                    Enjoy our classic margarita pizza, topped with fresh tomatoes,
                                    mozzarella, and basil for a simple yet delicious flavor.
                                </p>
                            </div>
                            <div className={styles.twister}>
                                <Image src={twister} alt="twister" className={styles.popFoodImg} />
                                <h1>Twister Menu</h1>
                                <p>
                                    Try our Twister Menu for a variety of mouthwatering wraps and
                                    sides that are perfect for a flavorful and satisfying meal.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className={styles.discoverRest}>
                            <Image width={230} height={230} src={bigPizza} alt="pizza" className={styles.lastImg} />
                            <div>
                                <h2>Discover Restaurants Near From You</h2>
                                <button>Explore now</button>
                            </div>
                            <Image width={200} height={200} src={bigBurger} alt="burger" className={styles.lastImg} />
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

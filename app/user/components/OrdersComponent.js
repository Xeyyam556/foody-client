import Link from "next/link";
import styles from '../components/css/orders.module.css';
import profilImg from '../../image/Vector (23).png';
import Image from "next/image";
import basketImg from '../../image/Vector (22).png';
import basketImg2 from '../../image/shopping_basket.png';
import addImg from '../../image/Vector (26).png';
import spinGif from "../../image/spin.gif"; 

import { useState, useRef, useEffect, useCallback } from 'react';
import axios from "axios";

export default function OrdersComponent() {
  const [productss, setProducts] = useState([]); // Düzgün `productss` state
  const [orders, setOrders] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true); 

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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const cancel = () => {
    setShowProduct(false);
  }

  const logout = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();
    if (window) {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('ally-supports-cache');
      localStorage.removeItem('refresh_token');
    }
  };

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = localStorage.getItem('access_token');
  }

  const fetchBasket = useCallback(async () => {
    const authorization = localStorage.getItem('access_token');
    setLoading(true); 
    try {
      const responseBasket = await axios.get('/api/basket', {
        headers: {
          Authorization: `Bearer ${authorization}`
        }
      });
      console.log('Basket data:', responseBasket.data);
      // setBasket(responseBasket.data.result.data);
    } catch (error) {
      console.error('Error fetching basket:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchOrders = async () => {
    const responsee = await axios.get("api/order/user", {
      headers: { 
        Authorization: `Bearer ${authorization}`
      }
    });
    console.log(responsee.data.result.data, "habahab");

    setOrders(responsee.data.result.data);
    const productsArray = responsee.data.result.data.flatMap(order => order.products);
    setProducts(productsArray); 
  };

  useEffect(() => {
    fetchOrders();
  }, []);

const deleteOrder = useCallback(async (id) => {
  const authorization = localStorage.getItem('access_token');
  console.log(id, "mehsulun id si");
  try {
    await axios.delete('/api/order', {
      headers: {
        Authorization: `Bearer ${authorization}`
      },
      data: {
        order_id: id
      }
    });
    await fetchOrders(); // `fetchOrders` funksiyasını çağırın ki, `orders` yenilənsin
  } catch (error) {
    console.error('Error deleting order:', error.response?.data || error.message);
  }
}, []);
console.log(orders,'orders  '); 
  const show = () => {
    setShowProduct(!showProduct);
  };

  useEffect(() => {
    document.body.style.overflow = showProduct ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showProduct]);

  return (
    <section className={styles.ordersSection}>
      {loading ? ( 
        <div className={styles.loadingContainer}>
          <Image src={spinGif} className={styles.spin} alt="Loading..." width={600} height={600} />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {showProduct && (
            <>
            <div className={styles.backFont} onClick={cancel}></div>
            <div className={styles.showProductDiv}>
              
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>Image</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Price $</th>
                    <th className={styles.th}>Count</th>
                    <th className={styles.th}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                {productss.map((producc, index) => (
                    <tr key={index} className={styles.tr}>
                      <td><Image src={producc.img_url} width={40} height={40} alt="img" className={styles.Img} /></td>
                      <td style={{ maxWidth: '120px' }} className={styles.td}>{producc.name}</td>
                      <td className={styles.td}>{producc.price}</td>
                      <td className={styles.td}>{producc.count}</td>
                      <td className={styles.td}>{producc.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
          <div className={styles.backFont} style={{ display: product.display ? 'block' : 'none' }}></div>
          <div className={styles.profileNavDiv}>
            <nav>
              <ul>
                <li>
                  <Link className={styles.otherLink} href="/user?page=profile">
                    <Image alt="profil" src={profilImg} className={styles.image} />
                    <button className={styles.otherBtn}>Profile</button>
                  </Link>
                  <Link href="/user?page=basket" className={styles.otherLink}>
                    <Image alt="basekt" src={basketImg} className={styles.image} />
                    <button className={styles.otherBtn}>Your Basket</button>
                  </Link>
                  <Link href="/user?page=orders" className={styles.mainLink}>
                    <Image alt="basekt" src={basketImg2} className={styles.image} />
                    <button className={styles.mainBtn}>Your Orders</button>
                  </Link>
                  <Link href="/user?page=checkout" className={styles.otherLink}>
                    <Image alt="basekt" src={basketImg} className={styles.image} />
                    <button className={styles.otherBtn}>Checkout</button>
                  </Link>
                  <Link href="/" className={styles.otherLink} onClick={logout} >
                    <Image alt="basekt" src={basketImg} className={styles.image} />
                    <button className={styles.otherBtn} onClick={logout}>Logout</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.ordersDiv}>
            <div className={styles.countainerDiv}>
              <h1>Your Orders</h1>
              <div className={styles.tableWrapper}>
                <table className={styles.ordersTable}>
                  <thead className={styles.tableHeader}>
                    <tr className={styles.headerRow}>
                      <th className={styles.headerCell}>ID</th>
                      <th className={styles.headerCell}>Time</th>
                      <th className={styles.headerCell}>Delivery Address</th>
                      <th className={styles.headerCell}>Amount</th>
                      <th className={styles.headerCell}>Payment Method</th>
                      <th className={styles.headerCell}>Contact</th>
                      <th className={styles.headerCell}>Actions</th>
                    </tr>
                  </thead>        
                  <tbody className={styles.tableBody}>
                    {orders.map((order, index) => (
                      <tr className={styles.bodyRow} key={index}>
                        <td className={styles.bodyCell}>{index + 1}</td>
                        <td>{order.date ? order.date.slice(4, 16) : 'Mövcud deyil'}</td>
                        <td className={styles.bodyCell}>{order.delivery_address}</td>
                        <td className={styles.bodyCell}>{order.amount}</td>
                        <td className={styles.bodyCell}>
        {order.payment_method === 0
          ? "Pay at the door"
          : order.payment_method === 1
          ? "Pay at the door by credit card"
          : "Unknown Payment Method"}
      </td>
                        <td className={styles.bodyCell}>{order.contact}</td>
                        <td className={styles.actions}>
                          <button className={styles.delete} onClick={() => deleteOrder(order.id)}>Delete</button>
                          <button className={styles.show} onClick={show}>Show</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

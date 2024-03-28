import React, { useState, useEffect, useContext } from 'react';
import styles from './Order.module.css'; 
import { getOrders } from '@/services/operations/orderAPI';
import { ThemeContext } from '../../context/ThemeContext';
import { UsernameContext } from '@/context/UsernameContext';

const Order = () => {
    const [userOrders, setUserOrders] = useState([]);
    const { theme } = useContext(ThemeContext);
    const {username} = useContext(UsernameContext);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const orderData = await getOrders();
            setUserOrders(orderData);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className={`${styles['order-wrapper']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
            <div className={`${styles['order-container']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
                <h2 className={styles['order-message']}>Your Orders</h2>
                {username ? (
                    <>
                        {userOrders.map((orderInfo, index) => (
                            <div key={index} className={`${styles['order']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
                                <h3>Order ID: {index + 1}</h3>
                                {orderInfo.products.map((product, idx) => (
                                    <div key={idx} className={styles['order-item']}>
                                        <img src={product.image} alt={product.name} className={styles['order-item-image']} />
                                        <div className={styles['order-item-details']}>
                                            <h4>{product.name}</h4>
                                            <p>Price: Rs {product.price}</p>
                                        </div>
                                    </div>
                                ))}
                                <h3 className={styles['total-price']}>Total Price: Rs {orderInfo.totalPrice}</h3>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className={styles['empty-order-message']}>Log in to view your Order</div>
                )}
            </div>
        </div>
    );
};

export default Order;

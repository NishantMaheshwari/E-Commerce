import React, { useState, useEffect, useContext } from 'react';
import './Order.css'; 
import { getOrders } from '../../services/operations/orderAPI';
import { ThemeContext } from '../../context/ThemeContext';

const Order = ({userName}) => {
    const [userOrders, setUserOrders] = useState([]);

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
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

    return (
        <div className="order-wrapper">
            <div className={`order-container ${theme.darkMode ? 'dark-mode' : ''}`}>
                <h2>Your Orders</h2>
                    {userName ? (
                        <>
                        {userOrders.map((order, index) => (
                        <div key={index} className="order">
                            <h3>Order ID: {index+1}</h3>
                            {order.map((product, idx) => (
                                <div key={idx} className="order-item">
                                    <img src={product.image} alt={product.name} className="order-item-image" />
                                    <div className="order-item-details">
                                        <h4>{product.name}</h4>
                                        <p>Price: Rs {product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        ))}
                        </>
                    ) : (
                        <div className="empty-cart-message">Log in to view your Order</div>
                    )}
            </div>
        </div>
    );
};

export default Order;

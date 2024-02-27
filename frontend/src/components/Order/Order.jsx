import React, { useState, useEffect } from 'react';
import './Order.css'; // Import your CSS file for styling
import { getOrders } from '../../services/operations/orderAPI';

const Order = ({userName}) => {
    const [userOrders, setUserOrders] = useState([]);

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
            <div className="order-container">
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

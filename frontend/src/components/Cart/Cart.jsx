import { useState, useEffect } from "react";
import { getCart, removeProductFromCart, emptyCart } from "../../services/operations/cartAPI";
import { addProductsToOrder } from "../../services/operations/orderAPI";
import {RiDeleteBinLine} from 'react-icons/ri'
import "./Cart.css";

const Cart = ({userName}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotalAmount(total);
  };

  const fetchCartItems = async() => {
    try {
        const cartData = await getCart(); 
        setCartItems(cartData);
        calculateTotalAmount(cartData);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
  }

 
  const handleDelete = async (itemId) => {
    try {
      await removeProductFromCart(itemId);
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const productIds = cartItems.map((item) => {
        return item._id;
      });
      // console.log(productIds);
      await addProductsToOrder(productIds,totalAmount);
      await emptyCart();
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>Your Cart</h2>
          {userName ? (
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>Price: Rs {item.price}</p>
                                    </div>
                                    <RiDeleteBinLine className="delete-icon" onClick={() => handleDelete(item._id)} />
                                </div>
                            </div>
                        ))}
                        <div className="total-amount">
                            <h3>Total Amount: Rs {totalAmount}</h3>
                        </div>
                        <div className="cart-buttons">
                            <button onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart-message">Your cart is empty</div>
                )}
            </div>
          ) : (
            <div className="empty-cart-message">Log in to view your Cart</div>
          )}
      </div>
    </div>
  );
};

export default Cart;

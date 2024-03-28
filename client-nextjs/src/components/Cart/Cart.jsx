import { useState, useEffect, useContext } from "react";
import { getCart, removeProductFromCart, emptyCart } from "@/services/operations/cartAPI";
import { addProductsToOrder } from "../../services/operations/orderAPI";
import { RiDeleteBinLine } from 'react-icons/ri';
import { ThemeContext } from "../../context/ThemeContext";
import { UsernameContext } from "@/context/UsernameContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { theme } = useContext(ThemeContext);
  const {username} = useContext(UsernameContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchCartItems();
  }, []);

 

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.product.price;
    });
    setTotalAmount(total);
  };

  const fetchCartItems = async () => {
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
      const productIds = cartItems.map((item) => item.product.id);
      await addProductsToOrder(productIds, totalAmount);
      await emptyCart();
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };



  if (!isMounted) {
    return null;
  }

  return (
    <div className={`${styles['cart-wrapper']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles['cart-container']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
        <h2 className={styles['cart-message']}>Your Cart</h2>
        {username ? (
          <div className={styles['cart-items']}>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.product.id} className={styles['cart-item']}>
                    <img src={item.product.image} alt={item.product.name} className={styles['cart-item-image']} />
                    <div className={styles['cart-item-details']}>
                      <div>
                        <h3>{item.product.name}</h3>
                        <p>Price: Rs {item.product.price}</p>
                      </div>
                      <RiDeleteBinLine className={styles['delete-icon']} onClick={() => handleDelete(item.product.id)} />
                    </div>
                  </div>
                ))}
                <div className={styles['total-amount']}>
                  <h3>Total Amount: Rs {totalAmount}</h3>
                </div>
                <div className={styles['cart-buttons']}>
                  <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
              </div>
            ) : (
              <div className={styles['empty-cart-message']}>Your cart is empty</div>
            )}
          </div>
        ) : (
          <div className={styles['empty-cart-message']}>Log in to view your Cart</div>
        )}
      </div>
    </div>
  );
};

export default Cart;

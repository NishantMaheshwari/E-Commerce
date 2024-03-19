import { useContext } from 'react';
import { addProductToCart } from '@/services/operations/cartAPI';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Product.module.css'; 
import { useRouter } from 'next/router';

const Product = ({product}) => {
  const router = useRouter();
  const productId = router.query.productId;

  const { theme } = useContext(ThemeContext);

  const handleAddCart = async () => {
    try {
      await addProductToCart(productId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${styles['product-wrapper']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles['product-container']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
        {product ? (
          <>
            <div className={styles['product-image']}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles['product-details']}>
              <h2>{product.name}</h2>
              <p className={styles['category']}>Category: {product.category}</p>
              <p className={styles['price']}>Price: Rs {product.price}</p>
              <div className={styles['rating']}>
                {Array.from({ length: product.rating }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <p className={styles['description']}>{product.description}</p>
              <button onClick={handleAddCart} className={styles['add-to-cart-btn']}>Add to Cart</button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Product;


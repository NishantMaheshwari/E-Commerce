import { BsFillBagFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { addProductToCart } from "../../services/operations/cartAPI";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Card.module.css"; 

const Card = ({ name, category, price, rating, image, id }) => {
  const { theme } = useContext(ThemeContext);

  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.round(rating); 

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsFillStarFill key={i} className={`${styles['rating-star']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />);
    }
    for (let i = fullStars; i < totalStars; i++) {
      stars.push(<BsStar key={i} className={`${styles['rating-star']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />);
    }
    return stars;
  };

  const handleAddCart = async () => {
    try {
      await addProductToCart(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`${styles.card} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
      <img src={image} alt={name} className={styles['card-img']} />
      <div className={styles['card-details']}>
        <Link href={`/product/${id}`} className={`${styles['card-title']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
          <h3>{name}</h3>
        </Link>
        <section className={styles['card-reviews']}>
          {renderStars()}
          <span className={styles['total-reviews']}>{rating}</span>
        </section>
        <section className={styles['card-price']}>
          <div className={styles['price']}>Rs {price}</div>
          <div className={styles['bag']}>
            <BsFillBagFill onClick={handleAddCart} className={`${styles['bag-icon']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Card;

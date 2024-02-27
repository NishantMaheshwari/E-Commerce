import { BsFillBagFill } from "react-icons/bs";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { addProductToCart } from "../../services/operations/cartAPI";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Card = ({ name,category,price,rating,image,id }) => {

  const {theme,dispatch} = useContext(ThemeContext);

  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.round(rating); 

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsFillStarFill key={i} className={`rating-star ${theme.darkMode ? 'dark-mode' : ''}`} />);
    }
    for (let i = fullStars; i < totalStars; i++) {
      stars.push(<BsStar key={i} className={`rating-star ${theme.darkMode ? 'dark-mode' : ''}`} />);
    }
    return stars;
  };

  const handleAddCart = async () => {
    try{
      // console.log(id);
      await addProductToCart(id);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <section className={`card ${theme.darkMode ? 'dark-mode' : ''}`}>
        <img src={image} alt={name} className="card-img" />
        <div className="card-details">
          <NavLink to={`/product/${id}`}  className={`card-title ${theme.darkMode ? 'dark-mode' : ''}`}><h3 >{name}</h3></NavLink>
          {/* <h3 className="card-title">{name}</h3> */}
          <section className="card-reviews">
            {renderStars()}
            <span className="total-reviews">{rating}</span>
          </section>
          <section className="card-price">
            <div className="price">
               Rs {price}
            </div>
            <div className="bag">
              <BsFillBagFill onClick={handleAddCart} className={`bag-icon ${theme.darkMode ? 'dark-mode' : ''}`} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
import { BsFillBagFill } from "react-icons/bs";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { addProductToCart } from "../../services/operations/cartAPI";
import { NavLink } from "react-router-dom";

const Card = ({ name,category,price,rating,image,id }) => {

  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.round(rating); // Round the rating to the nearest whole number

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsFillStarFill key={i} className="rating-star" />);
    }
    for (let i = fullStars; i < totalStars; i++) {
      stars.push(<BsStar key={i} className="rating-star" />);
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
      <section className="card">
        <img src={image} alt={name} className="card-img" />
        <div className="card-details">
          <NavLink to={`/product/${id}`} className="card-title"><h3 >{name}</h3></NavLink>
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
              <BsFillBagFill onClick={handleAddCart} className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
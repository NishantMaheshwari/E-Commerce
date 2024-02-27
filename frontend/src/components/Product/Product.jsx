import './Product.css'; 
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/operations/productAPI';
import { useState,useEffect } from 'react';
import { addProductToCart } from '../../services/operations/cartAPI';

const Product = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState(null);
 // console.log(productId);
  useEffect(() => {
    // console.log('Inside use effect');
    fetchProduct(productId);
  },[productId]);

  
  const fetchProduct = async (productId) => {
    try {
      const productData = await getProduct(productId);
      console.log(productData);
      setProduct(productData);  
    } catch (error) {
      throw new Error('Error fetching product');
    }
  };
  
  const handleAddCart = async () => {
    try{
      // console.log(id);
      await addProductToCart(productId);
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <div className="product-container">
      {product ? (
        <>
        <div className="product-image">
            <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details">
            <h2>{product.name}</h2>
            <p className="category">Category: {product.category}</p>
            <p className="price">Price: Rs {product.price}</p>
            <div className="rating">
            {Array.from({ length: product.rating }).map((_, index) => (
                <span key={index}>⭐</span>
            ))}
            </div>
            <p className="description">{product.description}</p>
        
            <button onClick={handleAddCart} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </>
      ) : (
        <></>
      )}
      
    </div>
  );
};

export default Product;

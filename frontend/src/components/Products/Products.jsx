import "./Products.css";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { getAllProducts } from "../../services/operations/productAPI";

const Products = ({searchQuery,sortQuery,category,rating}) => {
    const [products,setProducts] = useState([]);
    const [searchProducts,setSearchProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts(category,rating,sortQuery); 
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    },[category,rating,sortQuery]);

    useEffect(() => {
        setSearchProducts(products.filter((product) => {                                       
                const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                const descriptionMatch = product.description.toLowerCase().includes(searchQuery.toLowerCase());
                return nameMatch || descriptionMatch;
            })
        );
    },[searchQuery,products]);


    return (
        <div className="card-container">
            {
                searchProducts.map(({name,category,price,rating,image,_id}) => (
                    <Card 
                    key = {_id}
                    name = {name}
                    category = {category}
                    price = {price}
                    rating = {rating}
                    image = {image}
                    id = {_id}
                    />
                ))
            }
        </div>
    );
};

export default Products;
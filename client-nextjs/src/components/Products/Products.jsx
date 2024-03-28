import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { getAllProducts } from "@/services/operations/productAPI";
import { ThemeContext } from "../../context/ThemeContext";
import { SearchContext,SortContext,RatingContext,CategoryContext } from "@/context/ModifyProductsContext";
import styles from "./Products.module.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);


    const {sortQuery} = useContext(SortContext);
    const {searchQuery} = useContext(SearchContext);
    const {category} = useContext(CategoryContext);
    const {rating} = useContext(RatingContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts(category, rating, sortQuery);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [category, rating, sortQuery]);

    useEffect(() => {
        setSearchProducts(products.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const descriptionMatch = product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return nameMatch || descriptionMatch;
        }));
    }, [searchQuery, products]);


    return (
        <div className={`${styles['card-container']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
            {searchProducts.map(({ name, category, price, rating, image, id }) => (
                <Card
                    key={id}
                    name={name}
                    category={category}
                    price={price}
                    rating={rating}
                    image={image}
                    id={id}
                />
            ))}
        </div>
    );
};

export default Products;

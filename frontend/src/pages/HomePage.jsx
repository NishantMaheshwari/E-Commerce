import Sidebar from "../components/Sidebar/Sidebar";
import Products from "../components/Products/Products";
import { useState } from "react";


const HomePage = ({searchQuery,sortQuery}) => {
    const [category,setCategory] = useState('All'); 
    const handleCategoryChange = (e) => {
        // console.log(category,e.target.value);
        setCategory(e.target.value);
    }
    const [rating,setRating] = useState('All'); 
    const handleRatingChange = (e) => {
        // console.log(category,e.target.value);
        setRating(e.target.value);
    }
    return (
        <div>
            <Sidebar  handleCategoryChange={handleCategoryChange} handleRatingChange={handleRatingChange}/>
            <Products searchQuery={searchQuery} sortQuery={sortQuery} category={category} rating={rating}/>
        </div>  
    );
};

export default HomePage;
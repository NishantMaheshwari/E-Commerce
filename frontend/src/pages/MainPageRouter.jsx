import Navbar from "../components/Navbar/Navbar";
import Cart from "../components/Cart/Cart";
import Order from "../components/Order/Order";
import Product from "../components/Product/Product";
import {Route, Routes, useNavigate } from "react-router-dom";
import { useState, useReducer } from "react";
import HomePage from "./HomePage";
import { themeReducer } from "../reducers/themeReducer";
import { ThemeContext } from "../context/ThemeContext";


const MainPageRouter = () => {
    // console.log('Inside main page');
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    const [searchQuery,setSearchQuery]=useState('');
    const [sortQuery,setSortQuery] = useState('none');

    const initialTheme = {
        darkMode:false
    }

    const [theme,dispatch] = useReducer(themeReducer,initialTheme);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortQuery(e.target.value);
    }

    return (
        <>
            <Navbar userName={userName} setUserName={setUserName} searchQuery={searchQuery} handleInputChange={handleInputChange}
                handleSortChange={handleSortChange}
            />
            <Routes>
                <Route path="/" element={<HomePage searchQuery={searchQuery} sortQuery={sortQuery}/>}/>
                <Route path="/cart" element={<Cart userName={userName}/>}/>
                <Route path="/orders" element={<Order userName={userName}/>}/>
                <Route path="/product/:productId" element={<Product/>} />
            </Routes>
        </>  
    );
};

export default MainPageRouter;
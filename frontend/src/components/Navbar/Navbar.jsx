import { FaBoxOpen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useEffect, useState,useContext } from 'react';
import { Link } from "react-router-dom";
import SortOptions from "../SortOptions/SortOptions";
import "./Navbar.css";
import { TOGGLE_THEME, themeReducer } from "../../reducers/themeReducer";
import { ThemeContext } from "../../context/ThemeContext";
import { BiMoon, BiSun } from 'react-icons/bi';



const Navbar = ({ handleInputChange, searchQuery, userName,setUserName,handleSortChange }) => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  const {theme,dispatch} = useContext(ThemeContext);

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || null);
  },[]);

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

 // console.log(showUserOptions);

 const toggleTheme = () => {
    dispatch({type : TOGGLE_THEME});
 }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName(null);
  };

  return (
    <nav className={`navbar-wrapper ${theme.darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme.darkMode ? <BiSun /> : <BiMoon />}
        {theme.darkMode ? ' Light Mode' : ' Dark Mode'}
      </div>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={searchQuery}
          placeholder="Enter your search shoes."
        />
      </div>
      <SortOptions handleSortChange={handleSortChange}/> 
      <div className="profile-container">
        {userName ? (
          <>
            <span className="user-name" onClick={toggleUserOptions}>
              {userName}
            </span>
            {showUserOptions && (
              <div className="user-options">
                <button onClick={handleLogout}><RiLogoutCircleRFill className={`nav-icons ${theme.darkMode ? 'dark-mode' : ''}`} /> Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <HiUserAdd className={`nav-icons ${theme.darkMode ? 'dark-mode' : ''}`} />
          </Link>
        )}
        <Link to="/">
          <FaHome className={`nav-icons ${theme.darkMode ? 'dark-mode' : ''}`} />
        </Link> 
        <Link to="/orders">
          <FaBoxOpen className={`nav-icons ${theme.darkMode ? 'dark-mode' : ''}`} />
        </Link> 
        <Link to="/cart">
          <FaShoppingCart className={`nav-icons ${theme.darkMode ? 'dark-mode' : ''}`} />
        </Link>  
      </div>
    </nav>
  );
};

export default Navbar;

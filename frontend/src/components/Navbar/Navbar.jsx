import { AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SortOptions from "../SortOptions/SortOptions";
import "./Navbar.css";

const Navbar = ({ handleInputChange, searchQuery, userName,setUserName,handleSortChange }) => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || null);
  },[]);

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

  console.log(showUserOptions);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName(null);
  };

  return (
    <nav className="navbar-wrapper">
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
                <button onClick={handleLogout}><AiOutlineLogout className="nav-icons" /> Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <AiOutlineUserAdd className="nav-icons" />
          </Link>
        )}
        <Link to="/orders">
          <FaBoxOpen className="nav-icons" />
        </Link> 
        <Link to="/cart">
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>  
      </div>
    </nav>
  );
};

export default Navbar;

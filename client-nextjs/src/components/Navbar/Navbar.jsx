import { FaBoxOpen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useEffect, useState, useContext } from 'react';
import Link from "next/link";
import SortOptions from "../SortOptions/SortOptions";
import styles from "./Navbar.module.css"; // Import CSS module
import { TOGGLE_THEME } from "../../reducers/themeReducer";
import { ThemeContext } from "../../context/ThemeContext";
import { BiMoon, BiSun } from 'react-icons/bi';
import { UsernameContext } from "@/context/UsernameContext";
import { SearchContext, SortContext } from "@/context/ModifyProductsContext";


const Navbar = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { theme, themeDispatch } = useContext(ThemeContext);
  const {username,usernameDispatch} = useContext(UsernameContext);
  const {searchQuery, searchDispatch} = useContext(SearchContext);
  const {sortDispatch} = useContext(SortContext);

  const [isMounted, setIsMounted] = useState(false);

  

  const handleInputChange = (e) => {
    searchDispatch({type : 'SET_SEARCH_QUERY' , payload : e.target.value});
  }

  const handleSortChange = (e) => {
    sortDispatch({type : 'SET_SORT_QUERY' , payload : e.target.value});
  } 

  useEffect(() => {
    setIsMounted(true);
    const currentUser = (localStorage.getItem('userName') || null);
    usernameDispatch({type : 'LOGIN' , payload : currentUser});
  }, []);

  if (!isMounted) {
    return null;
  }


  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

  const toggleTheme = () => {
    themeDispatch({ type: TOGGLE_THEME });
  }

  const handleLogout = () => {
    usernameDispatch({type : 'LOGOUT'});
  };

  return (
    <nav className={`${styles['navbar-wrapper']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
      <div className={styles['theme-toggle']} onClick={toggleTheme}>
        {theme.darkMode ? <BiSun /> : <BiMoon />}
        {theme.darkMode ? ' Light Mode' : ' Dark Mode'}
      </div>
      <div className={styles['nav-container']}>
        <input
          className={styles['search-input']}
          type="text"
          onChange={handleInputChange}
          value={searchQuery}
          placeholder="Enter your search shoes."
        />
      </div>
      <SortOptions handleSortChange={handleSortChange} />
      <div className={styles['profile-container']}>
        {username ? (
          <>
            <span className={styles['user-name']} onClick={toggleUserOptions}>
              {username}
            </span>
            {showUserOptions && (
              <div className={styles['user-options']}>
                <button onClick={handleLogout}><RiLogoutCircleRFill className={`${styles['nav-icons']} ${theme.darkMode ? styles['dark-mode'] : ''}`} /> Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <HiUserAdd className={`${styles['nav-icons']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />
          </Link>
        )}
        <Link href="/">
          <FaHome className={`${styles['nav-icons']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />
        </Link>
        <Link href="/orders">
          <FaBoxOpen className={`${styles['nav-icons']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />
        </Link>
        <Link href="/cart">
          <FaShoppingCart className={`${styles['nav-icons']} ${theme.darkMode ? styles['dark-mode'] : ''}`} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

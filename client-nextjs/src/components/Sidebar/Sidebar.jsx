import { useContext } from "react";
import FilterList from "./FilterList/FilterList";
import styles from "./Sidebar.module.css"; 
import { ThemeContext } from "../../context/ThemeContext";
import { CategoryContext, RatingContext } from "@/context/ModifyProductsContext";

const Sidebar = () => {
  const categoryOptions = [
    {
      name: "test",
      value: "All",
      checked: true,
      title: "All",
    },
    {
      name: "test",
      value: "sneakers",
      checked: false,
      title: "Sneakers",
    },
    {
      name: "test",
      value: "flats",
      checked: false,
      title: "Flats",
    },
    {
      name: "test",
      value: "sandals",
      checked: false,
      title: "Sandals",
    },
    {
      name: "test",
      value: "heels",
      checked: false,
      title: "Heels",
    },
  ];

  const ratingOptions = [
    {
      name: "test1",
      value: "All",
      checked: true,
      title: "All",
    },
    {
      name: "test1",
      value: "1",
      checked: false,
      title: "1 ⭐",
    },
    {
      name: "test1",
      value: "2",
      checked: false,
      title: "2 ⭐",
    },
    {
      name: "test1",
      value: "3",
      checked: false,
      title: "3 ⭐",
    },
    {
      name: "test1",
      value: "4",
      checked: false,
      title: "4 ⭐",
    },
    {
      name: "test1",
      value: "5",
      checked: false,
      title: "5 ⭐",
    },
  ];


  const { theme } = useContext(ThemeContext);
  const {ratingDispatch} = useContext(RatingContext);
  const { categoryDispatch } = useContext(CategoryContext);

  const handleCategoryChange = (e) => {
    
    categoryDispatch({ type: 'SET_CATEGORY', payload: e.target.value });
  };

  const handleRatingChange = (e) => {
    ratingDispatch({ type: 'SET_RATING', payload: e.target.value });
  };

  return (
    <>
      <section className={`${styles.sidebar} ${theme.darkMode ? styles["dark-mode"] : ""}`}> 
        <div className={styles["logo-container"]}> 
          <h1>🛒</h1>
        </div>
        <FilterList options={categoryOptions} handleChange={handleCategoryChange} heading="Category" />
        <FilterList options={ratingOptions} handleChange={handleRatingChange} heading="Rating" />
      </section>
    </>
  );
};

export default Sidebar;

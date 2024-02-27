import Category from "./Category/Category";
import Rating from "./Rating/Rating";
import "./Sidebar.css";

const Sidebar = ({ handleCategoryChange, handleRatingChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleCategoryChange={handleCategoryChange} />
        <Rating handleRatingChange={handleRatingChange} />
      </section>
    </>
  );
};

export default Sidebar;
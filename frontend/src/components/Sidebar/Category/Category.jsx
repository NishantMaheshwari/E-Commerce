import "./Category.css";
import Input from "../../utility/Input";

function Category({ handleCategoryChange }) {
  // console.log(category);
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleCategoryChange} type="radio" value='All' name="test" defaultChecked/>
          <span className="checkmark"></span>All
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleCategoryChange} type="radio" value='sneakers' name="test" />
          <span className="checkmark"></span>Sneakers
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleCategoryChange} type="radio" value='flats' name="test" />
          <span className="checkmark"></span>Flats
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleCategoryChange} type="radio" value='sandals' name="test" />
          <span className="checkmark"></span>Sandals
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleCategoryChange} type="radio" value='heels' name="test" />
          <span className="checkmark"></span>Heels
        </label>
      </div>
    </div>
  );
}

export default Category;
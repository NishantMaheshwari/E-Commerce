import "../Category/Category.css";

function Rating({ handleRatingChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Rating</h2>
      <div>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='All' name="test1" defaultChecked/>
          <span className="checkmark"></span>All
        </label>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='1' name="test1" />
          <span className="checkmark"></span>1 <span>⭐</span>
        </label>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='2' name="test1" />
          <span className="checkmark"></span>2 <span>⭐</span>
        </label>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='3' name="test1" />
          <span className="checkmark"></span>3 <span>⭐</span>
        </label>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='4' name="test1" />
          <span className="checkmark"></span>4 <span>⭐</span>
        </label>
        <label className="sidebar-label-container1">
          <input onChange={handleRatingChange} type="radio" value='5' name="test1" />
          <span className="checkmark"></span>5 <span>⭐</span>
        </label>
      </div>
    </div>
  );
}

export default Rating;
import "./SortOptions.css"; // Import your CSS file for styling

function SortOptions({ handleSortChange }) {
  return (
    <div className="sort-options-container">
      <h2 className="sort-subheading">Sort Products by Price</h2>
      <div className="radio-buttons-container">
        <label className="radio-label">
          <input
            type="radio"
            value="lowToHigh"
            name="sort"
            onChange={handleSortChange}
          />
          Price: Low to High
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="highToLow"
            name="sort"
            onChange={handleSortChange}
          />
          Price: High to Low
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="none"
            name="sort"
            onChange={handleSortChange}
            defaultChecked
          />
          None
        </label>
      </div>
    </div>
  );
}

export default SortOptions;

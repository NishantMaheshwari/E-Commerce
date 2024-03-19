import styles from "./SortOptions.module.css";

function SortOptions({ handleSortChange }) {
  return (
    <div className={styles["sort-options-container"]}> 
      <h2 className={styles["sort-subheading"]}>Sort Products by Price</h2> 
      <div className={styles["radio-buttons-container"]}> 
        <label className={styles["radio-label"]}>
          <input
            type="radio"
            value="lowToHigh"
            name="sort"
            onChange={handleSortChange}
          />
          Price: Low to High
        </label>
        <label className={styles["radio-label"]}>
          <input
            type="radio"
            value="highToLow"
            name="sort"
            onChange={handleSortChange}
          />
          Price: High to Low
        </label>
        <label className={styles["radio-label"]}>
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

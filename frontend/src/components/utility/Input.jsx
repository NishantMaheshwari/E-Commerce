const Input = ({ handleCategoryChange, value, title, name }) => {
    return (
      <label className="sidebar-label-container">
        <input onChange={handleCategoryChange} type="radio" value={value} name={name} />
        <span className="checkmark" ></span>
        {title}
      </label>
    );
  };
  
  export default Input;
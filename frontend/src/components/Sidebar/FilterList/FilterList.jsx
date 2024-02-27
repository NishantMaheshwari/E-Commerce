import "./FilterList.css";

function FilterList({ options, handleChange, heading }) {
  return (
    <div>
      <h2 className="sidebar-title">{heading}</h2>
      <div>
        {
          options?.map((option,index) => {
            return (
              <label className="sidebar-label-container" key={index}>
              <input onClick={handleChange} type="radio" value={option.value} name={option.name} defaultChecked={option.checked}/>
              <span className="checkmark"></span>{option.title}
              </label>
            );
          })
        }
      </div>
    </div>
  );
}

export default FilterList;
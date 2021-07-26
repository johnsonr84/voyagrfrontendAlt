import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm({ setNameFilter }) {
  const handleOnChange = (event) => {
    setNameFilter(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div class="container-fluid">
      <div className="searchDiv">
        <input
          type="text"
          onChange={handleOnChange}
          name="search"
          className="friendSearchInput"
          placeholder="Search by name"
        />
      </div>
    </div>
  );
}

export default SearchForm;

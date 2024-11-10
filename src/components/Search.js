import React from "react";

function Search({ setSearchQuery, setInStockFilter }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;

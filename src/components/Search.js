import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="mt-3">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        className="search p-1"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default Search;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search input value
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleSearch = (e) => {
    // Handle form submission
    e.preventDefault();
    if (searchTerm.trim()) {
      // Check if the search term is not empty
      navigate(`/user/${searchTerm}`); // Navigate to the user details page based on the search term
      setSearchTerm(""); // Clear the search input after submission
    }
  };

  return (
    <div className="search container my-5">
      <form
        onSubmit={handleSearch}
        className="d-flex justify-content-center align-items-center"
        style={{ gap: "10px" }}
      >
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search GitHub Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state as the user types
        />
        <button type="submit" className="btn btn-dark">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

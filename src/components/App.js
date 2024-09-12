import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import RepoDetails from "./RepoDetails";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    // Center all content on the page vertically and horizontally
    <div className="d-flex justify-content-center align-items-center vh-100">
      <header className="text-center">
        <h1 className="display-4 text-dark">GitHub Galaxy Explorer</h1>
        <p className="lead text-muted">
          Explore GitHub profiles and repositories with ease
        </p>
        <Routes>
          {/* Define the routes for main app pages */}
          <Route path="/" element={<Search />} /> {/* Search page */}
          <Route path="/user/:username" element={<UserDetails />} />{" "}
          {/* User details page */}
          <Route path="/repos/:owner/:repo" element={<RepoDetails />} />{" "}
          {/* Repo details page */}
        </Routes>
      </header>
    </div>
  );
}

export default App;

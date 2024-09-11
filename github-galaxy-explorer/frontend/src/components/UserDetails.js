import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";

const UserDetails = () => {
  const { username } = useParams(); // Retrieve the username from the URL parameters
  const [user, setUser] = useState(null); // State for storing user details
  const [repos, setRepos] = useState([]); // State for storing user repositories
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    // Fetch user data and repositories when the component mounts
    const fetchUserData = async () => {
      try {
        // Fetch user details from the backend API
        const userResponse = await fetch(
          `http://localhost:5000/api/user/${username}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");

        const userData = await userResponse.json();

        // Fetch user repositories from the backend API
        const reposResponse = await fetch(
          `http://localhost:5000/api/user/${username}/repos`
        );
        if (!reposResponse.ok) throw new Error("Failed to fetch repos data");

        const reposData = await reposResponse.json();

        setUser(userData); // Set user data in state
        setRepos(reposData); // Set repositories data in state
        setError(null); // Clear any existing errors
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(
          "User or repositories not found. Please check the username and try again."
        );
      } finally {
        setLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    fetchUserData(); // Trigger the data fetching function
  }, [username]);

  if (loading) {
    // Display spinner while data is loading
    return <Spinner loading={loading} />;
  }

  return (
    <div className="user-details container text-center my-5">
      {error ? (
        <p className="text-danger">{error}</p> // Show error message if data fetch fails
      ) : user ? (
        <>
          {/* Display user details including avatar, name, and bio */}
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px" }}
          />
          <h2 className="text-dark">{user.name || user.login}</h2>
          <p className="text-muted">{user.bio || "This user has no bio."}</p>
          <h3 className="text-dark">Repositories</h3>
          {repos.length ? (
            <ul className="list-unstyled">
              {repos.map((repo) => (
                <li key={repo.id} className="mb-2">
                  {/* Link to repository details page */}
                  <Link
                    to={`/repos/${user.login}/${repo.name}`}
                    className="text-dark"
                  >
                    {repo.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No repositories found for this user.</p>
          )}
        </>
      ) : (
        <p className="text-danger">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const RepoDetails = () => {
  const { owner, repo } = useParams(); // Get the owner and repo name from the URL parameters
  const [repoDetails, setRepoDetails] = useState(null); // State to hold repository details
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchRepoData = async () => {
      // Fetch repository details from the backend API
      try {
        const response = await fetch(
          `http://localhost:5000/api/repos/${owner}/${repo}`
        );
        if (!response.ok) throw new Error("Failed to fetch repo data");

        const data = await response.json();
        setRepoDetails(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching repo data:", error); // Log any errors encountered
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchRepoData(); // Trigger data fetch on component mount
  }, [owner, repo]);

  if (loading) {
    // Show spinner while loading
    return <Spinner loading={loading} />;
  }

  return (
    <div className="repo-details container text-center my-5">
      {repoDetails ? (
        <>
          {/* Display repository details */}
          <h2 className="text-dark">{repoDetails.name}</h2>
          <p className="text-muted">{repoDetails.description}</p>
          <p>
            Created on: {new Date(repoDetails.created_at).toLocaleDateString()}
          </p>
          <p>
            Last updated:{" "}
            {new Date(repoDetails.updated_at).toLocaleDateString()}
          </p>
          <h3 className="text-dark">Last 5 Commits</h3>
          <ul className="list-unstyled">
            {repoDetails.commits.map((commit, index) => (
              <li key={index} className="mb-2">
                {commit.commit.message}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-danger">Repo details not found.</p> // Show error message if repo details are not found
      )}
    </div>
  );
};

export default RepoDetails;

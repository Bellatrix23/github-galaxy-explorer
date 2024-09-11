const express = require("express");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Fetch GitHub user details
app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    res.status(404).json({ message: "User not found" });
  }
});

// Fetch GitHub user repos
app.get("/api/user/:username/repos", async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching repos:",
      error.response?.data || error.message
    );
    res.status(404).json({ message: "Repos not found" });
  }
});

// Fetch repo details including last 5 commits
app.get("/api/repos/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    res.json({
      ...repoResponse.data,
      commits: commitsResponse.data.slice(0, 5),
    });
  } catch (error) {
    console.error(
      "Error fetching repo details:",
      error.response?.data || error.message
    );
    res.status(404).json({ message: "Repo not found" });
  }
});

// Only start the server if this file is being run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is warping to port ${PORT}`);
  });
}

module.exports = app; // Export the app for testing

const request = require("supertest");
const app = require("../index");
let server;

beforeAll((done) => {
  // Start the server before running tests
  server = app.listen(5000, done);
});

afterAll((done) => {
  // Close the server after tests complete
  server.close(done);
});

describe("GitHub API Integration", () => {
  it("should fetch user details", async () => {
    // Test fetching GitHub user details
    const response = await request(app).get("/api/user/octocat");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("login", "octocat");
  });

  it("should fetch user repositories", async () => {
    // Test fetching GitHub user repositories
    const response = await request(app).get("/api/user/octocat/repos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch repo details with commits", async () => {
    // Test fetching repo details including commits
    const response = await request(app).get("/api/repos/octocat/hello-world");
    expect(response.statusCode).toBe(200);
    expect(response.body.name.toLowerCase()).toBe("hello-world"); // Case insensitive check
    expect(response.body).toHaveProperty("commits");
  });
});

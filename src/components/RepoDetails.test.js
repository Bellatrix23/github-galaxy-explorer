import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoDetails from "./RepoDetails";

// Mock useParams to return expected values for the test
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    owner: "testuser",
    repo: "Test Repo",
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    console.log("Mocked Fetch URL:", url); // Log to verify the URL
    if (url === "http://localhost:5000/api/repos/testuser/Test Repo") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "Test Repo",
            description: "This is a test repo",
            created_at: "2023-01-01T00:00:00Z",
            updated_at: "2023-01-02T00:00:00Z",
            commits: [
              { commit: { message: "Initial commit" } },
              { commit: { message: "Second commit" } },
            ],
          }),
      });
    }
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Repo not found" }),
    });
  });
});

afterEach(() => {
  global.fetch.mockClear();
});

describe("RepoDetails Component", () => {
  it("renders repo details after loading", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <RepoDetails />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const repoTitles = screen.getAllByText(/Test Repo/i); // Use getAllByText
      expect(repoTitles.length).toBeGreaterThan(0); // Check if multiple elements exist
      expect(screen.getByText(/This is a test repo/i)).toBeInTheDocument();
      expect(screen.getByText(/Initial commit/i)).toBeInTheDocument();
    });
  });
});

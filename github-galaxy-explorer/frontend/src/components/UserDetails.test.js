import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDetails from "./UserDetails";

// Mock useParams to return expected values for the test
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    username: "testuser",
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === "http://localhost:5000/api/user/testuser") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            login: "testuser",
            name: "User Name",
            bio: "This is a test user bio",
          }),
      });
    }
    if (url === "http://localhost:5000/api/user/testuser/repos") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, name: "Test Repo 1", description: "Description 1" },
            { id: 2, name: "Test Repo 2", description: "Description 2" },
          ]),
      });
    }
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "User not found" }),
    });
  });
});

afterEach(() => {
  global.fetch.mockClear();
});

describe("UserDetails Component", () => {
  it("displays user details after loading", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/User Name/i)).toBeInTheDocument();
      expect(screen.getByText(/This is a test user bio/i)).toBeInTheDocument();
    });
  });

  it("matches the snapshot", async () => {
    let container;
    await act(async () => {
      const rendered = render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      );
      container = rendered.container;
    });

    expect(container).toMatchSnapshot(); // Snapshot test
  });
});

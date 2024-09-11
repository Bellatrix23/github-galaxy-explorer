import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "./Search";

describe("Search Component", () => {
  it("renders the search input", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(
      screen.getByPlaceholderText("Search GitHub Users...")
    ).toBeInTheDocument();
  });

  it("searches when the search button is clicked", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Search GitHub Users...");
    fireEvent.change(input, { target: { value: "octocat" } });
    fireEvent.click(screen.getByText("Search"));
    expect(input.value).toBe(""); // Check if the input is cleared after the search
  });
});

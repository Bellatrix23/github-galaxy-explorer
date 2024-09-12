import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner Component", () => {
  it("renders the spinner when loading is true", () => {
    render(<Spinner loading={true} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("does not render the spinner when loading is false", () => {
    render(<Spinner loading={false} />);
    // Check if the spinner element is not present
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
});

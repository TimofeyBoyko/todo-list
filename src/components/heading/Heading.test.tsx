import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Heading from ".";

describe("Heading Component", () => {
  it("renders the heading with the provided text", () => {
    render(<Heading text="Test Heading" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H1");
  });

  it("applies the default classes", () => {
    render(<Heading text="Test Heading" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass("text-2xl");
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("select-none");
  });

  it("applies additional classes when provided", () => {
    render(<Heading text="Test Heading" className="text-red-500" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass("text-2xl");
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("select-none");
    expect(headingElement).toHaveClass("text-red-500");
  });
});

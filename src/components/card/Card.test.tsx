import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct default styles", () => {
    const { container } = render(<Card>Test Content</Card>);
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("w-full");
    expect(cardElement).toHaveClass("md:w-[500px]");
    expect(cardElement).toHaveClass("h-screen");
    expect(cardElement).toHaveClass("md:h-[500px]");
  });

  it("applies additional className when provided", () => {
    const { container } = render(<Card className="test-class">Test Content</Card>);
    // Get the first div in the container which should be our Card component
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("test-class");
  });
});

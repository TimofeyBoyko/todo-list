import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";

import Button from "./index";

describe("Button Component", () => {
  it("renders with default props", () => {
    const { container } = render(<Button text="Click me" />);

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);

    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Button text="Click me" className="custom-class" />
    );

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("renders with different sizes", () => {
    const { rerender, container } = render(<Button text="Small" size="sm" />);
    let buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("h-6");

    rerender(<Button text="Medium" size="md" />);
    buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("h-8");
  });

  it("renders with different variants", () => {
    const { rerender, container } = render(
      <Button text="Primary" variant="primary" />
    );
    let buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("bg-blue-500");

    rerender(<Button text="Secondary" variant="secondary" />);
    buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("bg-gray-200");

    rerender(<Button text="Danger" variant="danger" />);
    buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("bg-red-500");
  });

  it("applies default variant when not specified", () => {
    const { container } = render(<Button text="Default Variant" />);
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("bg-blue-500"); // primary is default
  });
});

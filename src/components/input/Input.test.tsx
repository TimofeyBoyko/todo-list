import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

describe("Input Component", () => {
  it("renders with default props", () => {
    const handleChange = jest.fn();
    const { container } = render(<Input value="" onChange={handleChange} />);

    const inputElement = container.querySelector("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("handles value changes", () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} />);

    const inputElement = screen.getByDisplayValue("test");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} className="custom-class" />
    );

    const inputElement = container.querySelector("input");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("renders with different types", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} type="password" />
    );

    const inputElement = container.querySelector("input");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("applies disabled state", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Input value="" onChange={handleChange} disabled />
    );

    const inputElement = container.querySelector("input");
    expect(inputElement).toBeDisabled();
  });
});

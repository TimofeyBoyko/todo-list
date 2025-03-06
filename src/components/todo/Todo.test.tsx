import { render, screen, fireEvent } from "@testing-library/react";
import Todo from ".";

describe("Todo Component", () => {
  const mockTodo = {
    id: "todo-1",
    title: "Learn React",
    completed: false,
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<Todo {...mockTodo} />);
    expect(getByText("Learn React")).toBeInTheDocument();
  });

  it("renders with completed status", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<Todo {...completedTodo} />);
    
    const todoText = screen.getByText("Learn React");
    expect(todoText).toHaveClass("line-through");
    expect(todoText).toHaveClass("text-gray-500");
  });

  it("calls onToggle when clicked", () => {
    render(<Todo {...mockTodo} />);
    
    const todoElement = screen.getByRole("checkbox", { name: "Learn React" });
    fireEvent.click(todoElement);
    
    expect(mockTodo.onToggle).toHaveBeenCalledTimes(1);
    expect(mockTodo.onToggle).toHaveBeenCalledWith("todo-1");
  });

  it("has correct aria-checked attribute when not completed", () => {
    render(<Todo {...mockTodo} />);
    
    const todoElement = screen.getByRole("checkbox", { name: "Learn React" });
    expect(todoElement).toHaveAttribute("aria-checked", "false");
  });
  
  it("has correct aria-checked attribute when completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<Todo {...completedTodo} />);
    
    const completedTodoElement = screen.getByRole("checkbox", { name: "Learn React" });
    expect(completedTodoElement).toHaveAttribute("aria-checked", "true");
  });

  it("applies custom className when provided", () => {
    const { container } = render(<Todo {...mockTodo} className="custom-class" />);
    
    const todoElement = container.firstChild;
    expect(todoElement).toHaveClass("custom-class");
  });
  
  it("calls onToggle when Enter key is pressed", () => {
    render(<Todo {...mockTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    
    // Use fireEvent to simulate the keyDown event
    fireEvent.keyDown(todoDiv, { key: "Enter" });
    
    // Verify the handler was called
    expect(mockTodo.onToggle).toHaveBeenCalledTimes(1);
    expect(mockTodo.onToggle).toHaveBeenCalledWith("todo-1");
  });

  it("calls onToggle when Space key is pressed", () => {
    render(<Todo {...mockTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    
    // Use fireEvent to simulate the keyDown event
    fireEvent.keyDown(todoDiv, { key: " " });
    
    // Verify the handler was called
    expect(mockTodo.onToggle).toHaveBeenCalledTimes(1);
    expect(mockTodo.onToggle).toHaveBeenCalledWith("todo-1");
  });

  it("does not call onToggle when other keys are pressed", () => {
    render(<Todo {...mockTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    
    fireEvent.keyDown(todoDiv, { key: "Tab" });
    
    expect(mockTodo.onToggle).not.toHaveBeenCalled();
  });

  it("prevents event propagation when checkbox is clicked directly", () => {
    // Mock the stopPropagation method
    const originalStopPropagation = Event.prototype.stopPropagation;
    Event.prototype.stopPropagation = jest.fn();
    
    render(<Todo {...mockTodo} />);
    
    // Find the input element
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    const checkboxInput = todoDiv.querySelector('input[type="checkbox"]');
    expect(checkboxInput).not.toBeNull();
    
    // Click the checkbox directly
    if (checkboxInput) {
      fireEvent.click(checkboxInput);
      
      // Verify stopPropagation was called
      expect(Event.prototype.stopPropagation).toHaveBeenCalled();
    }
    
    // Restore the original method
    Event.prototype.stopPropagation = originalStopPropagation;
  });
  
  it("has the correct checkbox state when not completed", () => {
    render(<Todo {...mockTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    const checkboxInput = todoDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
    
    expect(checkboxInput).not.toBeNull();
    expect(checkboxInput.checked).toBe(false);
  });
  
  it("has the correct checkbox state when completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<Todo {...completedTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    const checkboxInput = todoDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
    
    expect(checkboxInput).not.toBeNull();
    expect(checkboxInput.checked).toBe(true);
  });
  
  it("calls onToggle handler when checkbox is clicked", () => {
    render(<Todo {...mockTodo} />);
    
    const todoDiv = screen.getByRole("checkbox", { name: "Learn React" });
    const checkboxInput = todoDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
    
    expect(checkboxInput).not.toBeNull();
    
    // Click the checkbox directly
    if (checkboxInput) {
      fireEvent.click(checkboxInput);
      
      // The onToggle handler should be called
      expect(mockTodo.onToggle).toHaveBeenCalledTimes(1);
      expect(mockTodo.onToggle).toHaveBeenCalledWith("todo-1");
    }
  });
});

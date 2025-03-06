import { render, screen, fireEvent } from "@testing-library/react";
import TodoContainer from "./index";
import { TodoItem } from "../../hooks";

describe("TodoContainer", () => {
  const mockTodos: TodoItem[] = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: true },
    { id: "3", title: "Todo 3", completed: false },
    { id: "4", title: "Todo 4", completed: false },
    { id: "5", title: "Todo 5", completed: true },
    { id: "6", title: "Todo 6", completed: false },
  ];

  const mockOnToggle = jest.fn();
  const mockOnRemoveCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders todos correctly", () => {
    render(
      <TodoContainer todos={mockTodos.slice(0, 3)} onToggle={mockOnToggle} />
    );

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
  });

  it('displays "No todos" message when there are no todos', () => {
    render(<TodoContainer todos={[]} onToggle={mockOnToggle} />);

    expect(screen.getByText("No todos in this category.")).toBeInTheDocument();
  });

  it("shows pagination when there are more todos than itemsPerPage", () => {
    render(
      <TodoContainer
        todos={mockTodos}
        onToggle={mockOnToggle}
        itemsPerPage={3}
      />
    );

    // Should have 2 pages (6 items with 3 per page)
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("changes page when pagination button is clicked", () => {
    render(
      <TodoContainer
        todos={mockTodos}
        onToggle={mockOnToggle}
        itemsPerPage={3}
      />
    );

    // First page should show first 3 todos
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
    expect(screen.queryByText("Todo 4")).not.toBeInTheDocument();

    // Click page 2
    fireEvent.click(screen.getByText("2"));

    // Second page should show next 3 todos
    expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Todo 4")).toBeInTheDocument();
    expect(screen.getByText("Todo 6")).toBeInTheDocument();
  });

  it("calls onToggle when a todo is clicked", () => {
    render(
      <TodoContainer todos={mockTodos.slice(0, 3)} onToggle={mockOnToggle} />
    );

    fireEvent.click(screen.getByText("Todo 1"));
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it('shows "Remove completed" button when onRemoveCompleted is provided and there are completed todos', () => {
    render(
      <TodoContainer
        todos={mockTodos}
        onToggle={mockOnToggle}
        onRemoveCompleted={mockOnRemoveCompleted}
        itemsPerPage={3} // Ensure pagination is visible
      />
    );

    // First make sure pagination is visible
    expect(screen.getByText("1")).toBeInTheDocument();
    
    const removeButton = screen.getByText("Remove completed");
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(mockOnRemoveCompleted).toHaveBeenCalled();
  });

  it('does not show "Remove completed" button when there are no completed todos', () => {
    const incompleteTodos = mockTodos.map((todo) => ({
      ...todo,
      completed: false,
    }));

    render(
      <TodoContainer
        todos={incompleteTodos}
        onToggle={mockOnToggle}
        onRemoveCompleted={mockOnRemoveCompleted}
        itemsPerPage={3} // Ensure pagination is visible
      />
    );

    // First make sure pagination is visible
    expect(screen.getByText("1")).toBeInTheDocument();
    
    // The button should not be present since hasCompletedTodos is false
    expect(screen.queryByText("Remove completed")).not.toBeInTheDocument();
  });

  it("resets to page 1 when todos change", () => {
    const { rerender } = render(
      <TodoContainer
        todos={mockTodos}
        onToggle={mockOnToggle}
        itemsPerPage={3}
      />
    );

    // Go to page 2
    fireEvent.click(screen.getByText("2"));

    // Verify we're on page 2
    expect(screen.getByText("Todo 4")).toBeInTheDocument();

    // Remove some todos so there's only one page
    rerender(
      <TodoContainer
        todos={mockTodos.slice(0, 3)}
        onToggle={mockOnToggle}
        itemsPerPage={3}
      />
    );

    // Should be back on page 1
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument(); // Pagination should be gone
  });
});

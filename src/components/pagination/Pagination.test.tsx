import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./index";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnRemoveCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when totalPages is 1 and hasCompletedTodos is false", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={false}
      />
    );

    // Should not render anything
    expect(container.firstChild).toBeNull();

    // Should not render page buttons
    expect(screen.queryByText("1")).not.toBeInTheDocument();

    // Should not render the Remove completed button
    expect(screen.queryByText("Remove completed")).not.toBeInTheDocument();
  });

  it("renders only 'Remove completed' button when totalPages is 1 and hasCompletedTodos is true", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={true}
        onRemoveCompleted={mockOnRemoveCompleted}
      />
    );

    // Should not render page buttons
    expect(screen.queryByText("1")).not.toBeInTheDocument();

    // Should render the Remove completed button
    expect(screen.getByText("Remove completed")).toBeInTheDocument();
  });

  it("renders all pagination buttons when totalPages <= 3", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Check if all page buttons are rendered
    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }

    // Check if current page button has primary variant
    const currentPageButton = screen.getByText("2");
    expect(currentPageButton.closest("button")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("renders specific pagination buttons when on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Should show pages 1, 2, and the last page (5)
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    
    // Pages 3 and 4 should not be visible
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
  });

  it("renders specific pagination buttons when on last page", () => {
    render(
      <Pagination
        currentPage={8}
        totalPages={8}
        onPageChange={mockOnPageChange}
      />
    );

    // Should show first page, second-to-last page, and last page
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    
    // Pages 2-6 should not be visible
    for (let i = 2; i <= 6; i++) {
      expect(screen.queryByText(i.toString())).not.toBeInTheDocument();
    }
  });

  it("renders pagination with correct buttons for middle pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    // Should show first page
    expect(screen.getByText("1")).toBeInTheDocument();
    
    // Should show current page and neighbors
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    // Should show last page
    expect(screen.getByText("10")).toBeInTheDocument();

    // Pages 2, 3, 7, 8, 9 should not be visible
    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("7")).not.toBeInTheDocument();
    expect(screen.queryByText("8")).not.toBeInTheDocument();
    expect(screen.queryByText("9")).not.toBeInTheDocument();
  });

  it("calls onPageChange when a page button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Click on page 3
    await user.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("renders 'Remove completed' button when hasCompletedTodos is true", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={true}
        onRemoveCompleted={mockOnRemoveCompleted}
      />
    );

    expect(screen.getByText("Remove completed")).toBeInTheDocument();
  });

  it("does not render 'Remove completed' button when hasCompletedTodos is false", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={false}
        onRemoveCompleted={mockOnRemoveCompleted}
      />
    );

    expect(screen.queryByText("Remove completed")).not.toBeInTheDocument();
  });

  it("calls onRemoveCompleted when 'Remove completed' button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={true}
        onRemoveCompleted={mockOnRemoveCompleted}
      />
    );

    await user.click(screen.getByText("Remove completed"));
    expect(mockOnRemoveCompleted).toHaveBeenCalled();
  });

  it("applies custom className correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        className="custom-class"
      />
    );

    // Find the div containing the pagination buttons
    const paginationContainer = screen.getByText("1").closest("div");
    expect(paginationContainer).toHaveClass("custom-class");
  });
});

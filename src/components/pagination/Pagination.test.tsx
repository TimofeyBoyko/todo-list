import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./index";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnRemoveCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination with a single page when totalPages is 1 and hasCompletedTodos is false", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        hasCompletedTodos={false}
      />
    );
    
    // Should render a single page button
    expect(screen.getByText("1")).toBeInTheDocument();
    
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

  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Check if all page buttons are rendered
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }

    // Check if current page button has primary variant
    const currentPageButton = screen.getByText("2");
    expect(currentPageButton.closest("button")).toHaveAttribute(
      "aria-current",
      "page"
    );
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

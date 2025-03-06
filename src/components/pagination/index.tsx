import React, { useMemo } from "react";
import Button from "../button";
import { PaginationProps, PaginationContainerProps } from "./Pagination.types";

const PaginationContainer = ({
  children,
  className,
}: PaginationContainerProps) => {
  return (
    <div className="py-4 border-t border-gray-200 dark:border-gray-700">
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {children}
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onRemoveCompleted,
  hasCompletedTodos = false,
  className = "",
}: PaginationProps) => {
  // Generate array of page numbers to display with advanced pagination logic
  const pageNumbers = useMemo(() => {
    // If totalPages is small or we're on early pages, show all buttons
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, totalPages];
    }

    if (currentPage === totalPages) {
      return [1, totalPages - 1, totalPages];
    }

    const pages = new Set<number>();

    // Always include first page
    pages.add(1);

    // Include current page and neighbors
    if (currentPage > 1) pages.add(currentPage - 1);
    pages.add(currentPage);
    if (currentPage < totalPages) pages.add(currentPage + 1);

    // Always include last page
    pages.add(totalPages);

    // Convert to sorted array
    return Array.from(pages).sort((a, b) => a - b);
  }, [totalPages, currentPage]);

  const RemoveButton = (
    <Button
      text="Remove completed"
      size="md"
      variant="danger"
      onClick={onRemoveCompleted}
      disabled={!hasCompletedTodos}
    />
  );

  if (hasCompletedTodos && totalPages <= 1)
    return (
      <PaginationContainer className={className}>
        {RemoveButton}
      </PaginationContainer>
    );

  if (totalPages === 1) return null;

  // Render pagination with ellipsis
  return (
    <PaginationContainer className={className}>
      {pageNumbers.map((page, index) => {
        // Add ellipsis between non-consecutive pages
        const showEllipsis =
          index > 0 && pageNumbers[index] - pageNumbers[index - 1] > 1;

        return (
          <React.Fragment key={page}>
            {showEllipsis && (
              <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
            )}
            <Button
              text={page.toString()}
              size="md"
              variant={currentPage === page ? "primary" : "secondary"}
              onClick={() => onPageChange(page)}
              className="min-w-8 flex items-center justify-center"
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
            />
          </React.Fragment>
        );
      })}
      {hasCompletedTodos && onRemoveCompleted && RemoveButton}
    </PaginationContainer>
  );
};

export default Pagination;

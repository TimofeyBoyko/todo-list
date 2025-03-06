import { useMemo } from "react";
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
  // Generate array of page numbers to display
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

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

  return (
    <PaginationContainer className={className}>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          text={page.toString()}
          size="md"
          variant={currentPage === page ? "primary" : "secondary"}
          onClick={() => onPageChange(page)}
          className="min-w-8 flex items-center justify-center"
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
        />
      ))}
      {hasCompletedTodos && onRemoveCompleted && RemoveButton}
    </PaginationContainer>
  );
};

export default Pagination;

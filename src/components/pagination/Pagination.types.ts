import React from "react";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  hasCompletedTodos?: boolean;
  onRemoveCompleted?: () => void;
};

export type PaginationContainerProps = {
  children: React.ReactNode;
  className: string;
};

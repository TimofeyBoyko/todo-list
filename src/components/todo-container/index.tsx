import React, { useState, useCallback, useMemo } from "react";
import Todo from "../todo";
import Pagination from "../pagination";

import { TodoContainerProps } from "./TodoContainer.types";

const TodoContainer = ({
  todos,
  onToggle,
  onRemoveCompleted,
  itemsPerPage = 6,
  className = "",
}: TodoContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages based on todos length and items per page
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(todos.length / itemsPerPage)),
    [todos.length, itemsPerPage]
  );

  // Get current todos based on pagination
  const currentTodos = useMemo(() => {
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    return todos.slice(indexOfFirstTodo, indexOfLastTodo);
  }, [todos, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Reset to page 1 when todos change
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [todos.length, totalPages, currentPage]);

  // Check if there are any completed todos
  const hasCompletedTodos = useMemo(
    () => todos.some((todo) => todo.completed),
    [todos]
  );

  return (
    <div className={`${className}`}>
      {/* Main container with fixed structure */}
      <div className="flex flex-col" style={{ height: "450px" }}>
        {/* Todo items list with fixed height */}
        <div className="h-[250px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
          {currentTodos.length > 0 ? (
            currentTodos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                onToggle={onToggle}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              No todos in this category.
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="w-full"
          hasCompletedTodos={hasCompletedTodos}
          onRemoveCompleted={onRemoveCompleted}
        />
      </div>
    </div>
  );
};

export default TodoContainer;

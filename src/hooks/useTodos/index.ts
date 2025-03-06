import { useState, useCallback } from "react";
import type { TodoItem, UseTodosReturn } from "./useTodos.types";

export type { TodoItem, UseTodosReturn };

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = useCallback((title: string) => {
    if (title.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    setTodos((todos) => [...todos, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Function to remove all completed todos
  const removeCompleted = useCallback(() => {
    setTodos((todos) => todos.filter((todo) => !todo.completed));
  }, []);

  // Derived state for filtered todos
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    removeCompleted,
  };
};

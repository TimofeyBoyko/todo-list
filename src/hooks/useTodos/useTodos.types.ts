export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type UseTodosReturn = {
  todos: TodoItem[];
  activeTodos: TodoItem[];
  completedTodos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeCompleted: () => void;
};

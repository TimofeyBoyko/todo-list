import { useState, useCallback } from "react";

import {
  Card,
  Heading,
  Input,
  Button,
  Tabs,
  TodoContainer,
} from "./components";
import { useTodos, useInput, TodoItem } from "./hooks";

function App() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    toggleTodo,
    removeCompleted,
  } = useTodos();

  // Initialize input first to have access to reset
  const {
    value,
    onChange: onChangeEvent,
    onKeyDown,
    isValid,
    reset,
  } = useInput({
    initialValue: "",
    onSubmit: (value) => {
      addTodo(value);
      reset();
    },
  });

  // Handle form submission with useCallback for better performance
  const handleSubmit = useCallback(
    (value: string) => {
      addTodo(value);
      reset();
    },
    [addTodo, reset]
  );

  // Handle button click with useCallback
  const handleAddClick = useCallback(() => {
    if (!isValid) return;

    handleSubmit(value);
  }, [isValid, handleSubmit, value]);

  const renderTodoList = (todoItems: TodoItem[]) => {
    return (
      <TodoContainer
        todos={todoItems}
        onToggle={toggleTodo}
        onRemoveCompleted={removeCompleted}
        itemsPerPage={6}
        className="mt-2"
      />
    );
  };

  const tabs = [
    {
      id: "all",
      label: "All",
      content:
        todos.length > 0 ? (
          renderTodoList(todos)
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No todos yet. Add one above!
          </div>
        ),
    },
    {
      id: "active",
      label: "Active",
      content: renderTodoList(activeTodos),
    },
    {
      id: "completed",
      label: "Completed",
      content: renderTodoList(completedTodos),
    },
  ];

  return (
    <div className="app-container w-full h-full bg-gray-400 flex flex-col items-center justify-start md:justify-center pt-0">
      <Card>
        <Heading text="Todo Application" />
        <div className="flex items-center gap-2 mt-4 mb-4 w-full">
          <div className="flex-grow">
            <Input
              value={value}
              onChange={onChangeEvent}
              onKeyDown={onKeyDown}
              placeholder="What needs to be done?"
            />
          </div>
          <Button
            text="Add"
            size="md"
            onClick={handleAddClick}
            disabled={!isValid}
          />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </Card>
    </div>
  );
}

export default App;

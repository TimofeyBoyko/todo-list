import { renderHook, act } from "@testing-library/react";
import { useTodos } from ".";

describe("useTodos Hook", () => {
  it("should initialize with empty todos", () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([]);
    expect(result.current.activeTodos).toEqual([]);
    expect(result.current.completedTodos).toEqual([]);
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Test Todo");
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].title).toBe("Test Todo");
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.activeTodos.length).toBe(1);
    expect(result.current.completedTodos.length).toBe(0);
  });

  it("should not add empty todos", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("");
    });

    expect(result.current.todos.length).toBe(0);
  });

  it("should trim whitespace from todo titles", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("  Test Todo  ");
    });

    expect(result.current.todos[0].title).toBe("Test Todo");
  });

  it("should toggle todo completion status", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Test Todo");
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);
    expect(result.current.activeTodos.length).toBe(0);
    expect(result.current.completedTodos.length).toBe(1);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.activeTodos.length).toBe(1);
    expect(result.current.completedTodos.length).toBe(0);
  });

  it("should handle toggling a non-existent todo ID", () => {
    const { result } = renderHook(() => useTodos());

    // Add a todo first
    act(() => {
      result.current.addTodo("Test Todo");
    });

    const initialTodos = [...result.current.todos];

    // Try to toggle a non-existent todo ID
    act(() => {
      result.current.toggleTodo("non-existent-id");
    });

    // Verify that todos remain unchanged
    expect(result.current.todos).toEqual(initialTodos);
    expect(result.current.todos[0].completed).toBe(false);
  });

  it("should remove all completed todos", () => {
    // Mock Date.now to return incrementing values
    const originalDateNow = Date.now;
    let mockTimestamp = 1000;
    Date.now = jest.fn(() => (mockTimestamp += 1000));

    try {
      // Create a fresh instance of the hook for this test
      const { result } = renderHook(() => useTodos());

      // Add todos one at a time to ensure different IDs
      act(() => {
        result.current.addTodo("Todo 1");
      });

      act(() => {
        result.current.addTodo("Todo 2");
      });

      act(() => {
        result.current.addTodo("Todo 3");
      });

      // Verify we have 3 todos initially, all active
      expect(result.current.todos.length).toBe(3);
      expect(result.current.activeTodos.length).toBe(3);
      expect(result.current.completedTodos.length).toBe(0);

      // Get the IDs of the todos we just created
      const todo1Id = result.current.todos[0].id;
      const todo2Id = result.current.todos[1].id;
      const todo3Id = result.current.todos[2].id;

      // Verify all IDs are different
      expect(todo1Id).not.toBe(todo2Id);
      expect(todo1Id).not.toBe(todo3Id);
      expect(todo2Id).not.toBe(todo3Id);

      // Toggle the first todo to completed
      act(() => {
        result.current.toggleTodo(todo1Id);
      });

      // Verify the first todo is now completed
      expect(
        result.current.todos.find((t) => t.id === todo1Id)?.completed
      ).toBe(true);
      expect(result.current.activeTodos.length).toBe(2);
      expect(result.current.completedTodos.length).toBe(1);

      // Toggle the third todo to completed
      act(() => {
        result.current.toggleTodo(todo3Id);
      });

      // Verify we now have 2 completed todos and 1 active
      expect(
        result.current.todos.find((t) => t.id === todo1Id)?.completed
      ).toBe(true);
      expect(
        result.current.todos.find((t) => t.id === todo2Id)?.completed
      ).toBe(false);
      expect(
        result.current.todos.find((t) => t.id === todo3Id)?.completed
      ).toBe(true);
      expect(result.current.activeTodos.length).toBe(1);
      expect(result.current.completedTodos.length).toBe(2);

      // Remove all completed todos
      act(() => {
        result.current.removeCompleted();
      });

      // Verify only the active todo remains
      expect(result.current.todos.length).toBe(1);
      expect(result.current.todos[0].id).toBe(todo2Id);
      expect(result.current.activeTodos.length).toBe(1);
      expect(result.current.completedTodos.length).toBe(0);
    } finally {
      // Restore the original Date.now function
      Date.now = originalDateNow;
    }
  });

  it("should do nothing when removeCompleted is called with no completed todos", () => {
    const { result } = renderHook(() => useTodos());

    // Add some active todos
    act(() => {
      result.current.addTodo("Todo 1");
      result.current.addTodo("Todo 2");
    });

    const initialTodos = [...result.current.todos];

    // Call removeCompleted
    act(() => {
      result.current.removeCompleted();
    });

    // Verify todos remain unchanged
    expect(result.current.todos).toEqual(initialTodos);
    expect(result.current.todos.length).toBe(2);
  });
});

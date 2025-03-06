import { TodoItem } from "../../hooks";

export type TodoContainerProps = {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onRemoveCompleted?: () => void;
  itemsPerPage?: number;
  className?: string;
};

export type TodoProps = {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  className?: string;
};

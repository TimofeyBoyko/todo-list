import { TodoProps } from "./Todo.types";

const Todo = ({
  id,
  title,
  completed,
  onToggle,
  className = "",
}: TodoProps) => {
  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div
      className={`
        flex 
        items-center 
        py-2 
        cursor-pointer
        hover:bg-gray-50
        dark:hover:bg-gray-800
        transition-colors
        duration-150
        select-none
        ${className}
      `}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={completed}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
        className="
          w-4 
          h-4 
          mr-3 
          text-blue-500 
          border-gray-300 
          rounded 
          focus:ring-blue-500 
          dark:focus:ring-blue-600 
          dark:ring-offset-gray-800 
          dark:bg-gray-700 
          dark:border-gray-600
        "
      />
      <span
        className={`
        text-gray-800 
        dark:text-gray-200 
        transition-all 
        duration-200
        ${completed ? "line-through text-gray-500 dark:text-gray-500" : ""}
      `}
      >
        {title}
      </span>
    </div>
  );
};

export default Todo;

"use client";

import { useOptimistic, startTransition } from "react";
import DeleteTodoDialog from "./DeleteTodoDialog";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  toggleTodo: (id: number, completed: boolean) => void;
}

export default function TodoItem({
  id,
  title,
  completed,
  onDelete,
  toggleTodo,
}: TodoItemProps) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    completed,
    (state: boolean) => !state
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="lg"
        className="flex-1 justify-start"
        onClick={() => {
          startTransition(() => {
            setOptimisticCompleted(!optimisticCompleted);
            toggleTodo(id, completed);
          });
        }}
      >
        <span className={optimisticCompleted ? "line-through opacity-70" : ""}>
          {title}
        </span>
      </Button>
      <DeleteTodoDialog onDelete={() => onDelete(id)} title={title} />
    </div>
  );
}

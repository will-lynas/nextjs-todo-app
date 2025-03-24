"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

export default function TodoItem({
  id,
  title,
  completed,
  onDelete,
  onToggle,
}: TodoItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <li
          onClick={() => onToggle(id, completed)}
          className="flex-1 p-4 bg-neutral-900 rounded-lg text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <span className={completed ? "line-through text-neutral-500" : ""}>
            {title}
          </span>
        </li>
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-[52px] px-3 bg-red-400 text-white rounded-lg hover:bg-red-700 transition-colors"
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            onDelete(id);
            setIsModalOpen(false);
          }}
          todoTitle={title}
        />
      )}
    </>
  );
}

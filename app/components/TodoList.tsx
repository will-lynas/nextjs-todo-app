"use client";

import { useOptimistic, useRef, startTransition } from "react";
import TodoItem from "./TodoItem";
import { createTodo, deleteTodo, toggleTodo } from "../actions";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleCreateTodo(formData: FormData) {
    const title = formData.get("title") as string;
    if (!title) return;

    // Create optimistic todo
    const optimisticTodo: Todo = {
      id: Math.random() * -1000000, // Temporary negative ID
      title,
      completed: false,
    };

    startTransition(() => {
      addOptimisticTodo(optimisticTodo);
      formRef.current?.reset();
    });

    await createTodo(formData);
  }

  return (
    <>
      <ul className="space-y-4 mb-8">
        {optimisticTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onDelete={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </ul>
      <form ref={formRef} action={handleCreateTodo} className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a new todo..."
          className="flex-1 p-2 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>
    </>
  );
}

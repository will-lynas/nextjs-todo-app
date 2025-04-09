"use client";

import { useOptimistic, useRef, startTransition } from "react";
import TodoItem from "./TodoItem";
import { createTodo, deleteTodo, toggleTodo } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state, action: { type: "add" | "delete"; todo: Todo }) => {
      if (action.type === "add") {
        return [...state, action.todo];
      } else if (action.type === "delete") {
        return state.filter((todo) => todo.id !== action.todo.id);
      }
      return state;
    }
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
      updateOptimisticTodos({ type: "add", todo: optimisticTodo });
      formRef.current?.reset();
    });

    await createTodo(formData);
  }

  async function handleDeleteTodo(id: number) {
    startTransition(() => {
      updateOptimisticTodos({
        type: "delete",
        todo: { id, title: "", completed: false },
      });
    });

    await deleteTodo(id);
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
            onDelete={handleDeleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </ul>
      <form ref={formRef} action={handleCreateTodo} className="flex gap-2">
        <Input
          type="text"
          name="title"
          placeholder="Add a new todo..."
          className="flex-1"
          required
        />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}

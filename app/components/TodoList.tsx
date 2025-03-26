"use client";

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
  return (
    <>
      <ul className="space-y-4 mb-8">
        {todos.map((todo) => (
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
      <form action={createTodo} className="flex gap-2">
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

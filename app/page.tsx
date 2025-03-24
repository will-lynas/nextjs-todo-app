import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

const prisma = new PrismaClient();

async function getTodos() {
  return await prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Todo App
        </h1>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-neutral-900 rounded-lg text-white hover:bg-neutral-800 transition-colors"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

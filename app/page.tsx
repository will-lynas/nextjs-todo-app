import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

const prisma = new PrismaClient();

async function getTodos() {
  return await prisma.todo.findMany();
}

async function createTodo(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  if (!title) return;

  await prisma.todo.create({
    data: { title },
  });
  revalidatePath("/");
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Todo App
        </h1>
        <ul className="space-y-4 mb-8">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-neutral-900 rounded-lg text-white hover:bg-neutral-800 transition-colors"
            >
              {todo.title}
            </li>
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
      </div>
    </div>
  );
}

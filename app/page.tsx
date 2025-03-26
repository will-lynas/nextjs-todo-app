import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import TodoItem from "./components/TodoItem";

const title = "ToDo App";
const description = "World's BEST ToDo App";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: "https://lumiere-a.akamaihd.net/v1/images/au_disneynews_pixar_cars_lightningmcqueen_incarticle_he_6c5d65dc.jpeg",
        width: 1200, // Recommended width for OG images
        height: 630, // Recommended height for OG images
        alt: "KACHOW",
      },
    ],
  },
};

const prisma = new PrismaClient();

async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { createdAt: "asc" },
  });
}

async function toggleTodo(id: number, completed: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { completed: !completed },
  });
  revalidatePath("/");
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

async function deleteTodo(id: number) {
  "use server";
  await prisma.todo.delete({
    where: { id },
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
      </div>
    </div>
  );
}

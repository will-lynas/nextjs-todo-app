"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function toggleTodo(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed: !completed },
  });
  revalidatePath("/");
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) return;

  await prisma.todo.create({
    data: { title },
  });
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
}

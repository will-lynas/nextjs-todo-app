"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as db from "./db/utils";

async function getUserId() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if (!sessionCookie?.value) {
    throw new Error("No session cookie found");
  }
  return sessionCookie.value;
}

export async function getTodos() {
  const userId = await getUserId();
  return await db.getTodos(userId);
}

export async function toggleTodo(id: number, currentState: boolean) {
  const userId = await getUserId();
  await db.changeTodoState(id, !currentState);
  revalidatePath("/");
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) return;

  const userId = await getUserId();
  await db.createTodo(userId, title);
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  const userId = await getUserId();
  await db.deleteTodo(id);
  revalidatePath("/");
}

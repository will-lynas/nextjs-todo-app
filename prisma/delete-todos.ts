import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllTodos() {
  try {
    const countBefore = await prisma.todo.count();
    console.log(`Found ${countBefore} todos before deletion`);

    await prisma.todo.deleteMany();

    const countAfter = await prisma.todo.count();
    console.log(`Found ${countAfter} todos after deletion`);

    if (countAfter === 0) {
      console.log("Successfully deleted all todos");
    } else {
      console.log("Warning: Some todos may not have been deleted");
    }
  } catch (error) {
    console.error("Error deleting todos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllTodos();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: "Learn Next.js", completed: false },
      { title: "Build a todo app", completed: true },
    ],
  });
  console.log("Seeded database with todos");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

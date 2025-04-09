import TodoList from "./components/TodoList";
import { getTodos } from "./actions";
import { ModeToggle } from "@/app/components/ModeToggle";

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="min-h-screen p-8">
      <ModeToggle />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
          Todo App
        </h1>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

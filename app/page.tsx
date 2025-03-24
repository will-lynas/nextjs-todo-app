import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Todo App</h1>
    </div>
  );
}

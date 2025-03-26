import { Metadata } from "next";
import TodoList from "./components/TodoList";
import { getTodos } from "./actions";

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

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Todo App
        </h1>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

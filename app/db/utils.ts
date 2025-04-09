import sql from "./connection";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
};

export async function getTodos(userId: string): Promise<Todo[]> {
  const todos = await sql`
    SELECT * FROM todos
    WHERE user_id = ${userId}
    ORDER BY created_at ASC
  `;
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.created_at,
    userId: todo.user_id,
  }));
}

export async function createTodo(userId: string, title: string) {
  await sql`
    INSERT INTO todos (user_id, title)
    VALUES (${userId}, ${title})
  `;
}

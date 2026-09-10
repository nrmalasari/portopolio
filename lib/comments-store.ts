import { promises as fs } from "fs";
import path from "path";

export interface Comment {
  id: string;
  name: string;
  comment: string;
  likes: number;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "comments.json");

async function readComments(): Promise<Comment[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeComments(comments: Comment[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(comments, null, 2), "utf-8");
}

export async function getComments(): Promise<Comment[]> {
  const comments = await readComments();
  return comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addComment(name: string, comment: string): Promise<Comment> {
  const comments = await readComments();
  const newComment: Comment = {
    id: crypto.randomUUID(),
    name: name.trim(),
    comment: comment.trim(),
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  comments.unshift(newComment);
  await writeComments(comments);
  return newComment;
}

export async function likeComment(id: string): Promise<Comment | null> {
  const comments = await readComments();
  const index = comments.findIndex((item) => item.id === id);
  if (index === -1) return null;

  comments[index] = { ...comments[index], likes: comments[index].likes + 1 };
  await writeComments(comments);
  return comments[index];
}

import { NextResponse } from "next/server";
import { addComment, getComments, likeComment } from "@/lib/comments-store";

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ error: "Gagal memuat komentar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "like") {
      if (!body.id || typeof body.id !== "string") {
        return NextResponse.json({ error: "ID komentar tidak valid" }, { status: 400 });
      }

      const updated = await likeComment(body.id);
      if (!updated) {
        return NextResponse.json({ error: "Komentar tidak ditemukan" }, { status: 404 });
      }

      return NextResponse.json(updated);
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const comment = typeof body.comment === "string" ? body.comment.trim() : "";

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Nama dan komentar wajib diisi" },
        { status: 400 }
      );
    }

    if (name.length > 80 || comment.length > 1000) {
      return NextResponse.json(
        { error: "Nama atau komentar terlalu panjang" },
        { status: 400 }
      );
    }

    const newComment = await addComment(name, comment);
    return NextResponse.json(newComment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan komentar" }, { status: 500 });
  }
}

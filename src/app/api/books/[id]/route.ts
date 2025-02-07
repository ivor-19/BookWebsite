import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Books from "@/lib/models/Books";


export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  await dbConnect();

  const book = await Books.findById(id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
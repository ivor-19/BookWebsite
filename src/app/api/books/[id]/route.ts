import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Books from "@/lib/models/Books";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();  
  
  const book = await Books.findById(params.id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
import dbConnect from "@/lib/dbConnect";
import Books from "@/lib/models/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
 await dbConnect();
 try {
  const books = await Books.find({});
  return NextResponse.json({ message: 'Fetch Successfully', books});
 } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch books'},
      { status: 500}
    )
 }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
   const body = await req.json();
   const book = await Books.create(body);
   return NextResponse.json({message: 'Book addded successfully', status: 201 }, book)
  } catch (error) {
     console.error(error);
     return NextResponse.json(
       { error: 'Failed to add a book'},
       { status: 500}
     )
  }
 }
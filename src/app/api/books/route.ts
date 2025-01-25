import dbConnect from "@/lib/dbConnect";
import Books from "@/lib/models/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const books = await Books.find({}).select('title details author image createdAt');  // Explicitly include createdAt field
    return NextResponse.json({ message: 'Fetch Successfully', books });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const book = await Books.create({
      title: body.title,
      details: body.details,
      author: body.author,
      image: body.imagePath || null, // Include image path received from frontend
      createdAt: new Date(),  // Manually add createdAt
      updatedAt: new Date()   // Manually add updatedAt
    });

    return NextResponse.json({
      message: 'Book added successfully',
      status: 201,
      book 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add a book' },
      { status: 500 }
    );
  }
}
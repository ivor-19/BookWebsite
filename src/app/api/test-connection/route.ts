import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to MongoDB', details: (error as Error).message }, { status: 500 });
  }
}

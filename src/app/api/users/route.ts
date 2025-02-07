
import dbConnect from '@/lib/dbConnect';
import Accounts from '@/lib/models/Accounts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const account = await Accounts.find();  // Explicitly include createdAt field
    return NextResponse.json({ message: 'Fetch Successfully', account });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

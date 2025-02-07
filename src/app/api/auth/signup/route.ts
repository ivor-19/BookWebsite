import dbConnect from "@/lib/dbConnect";
import Accounts from "@/lib/models/Accounts";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const account = await Accounts.create({
      username: body.username,
      email: body.email,
      password: body.password,
      createdAt: new Date(),  // Manually add createdAt
      updatedAt: new Date()   // Manually add updatedAt
    });

    return NextResponse.json({
      isSuccess: true,
      message: 'Account added successfully',
      status: 201,
      account 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add an account' },
      { status: 500 }
    );
  }
}
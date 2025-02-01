import dbConnect from "@/lib/dbConnect";
import Accounts from "@/lib/models/Accounts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const {email, password} = await req.json();
    const account = await Accounts.findOne({ email });
    if(!account){
      return NextResponse.json(
        { isSuccess: false, message: 'User not found' },{ status: 404 });
    }

    const isMatch = await account.comparePassword(password);
    if(!isMatch){
      return NextResponse.json({ isSuccess: false, message: 'Invalid Credentials' }, { status: 401 });
    }

    const { password: _, ...accountData } = account.toObject();
    return NextResponse.json({ isSuccess: true, message: "Login successful", account: accountData }, { status: 200 });
  } 
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
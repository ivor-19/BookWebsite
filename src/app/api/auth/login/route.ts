import dbConnect from "@/lib/dbConnect";
import Accounts from "@/lib/models/Accounts";
import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyToken } from "@/lib/services/jwt";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const account = await Accounts.findOne({ email });
    if (!account) {
      return NextResponse.json(
        { isSuccess: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const isMatch = await account.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { isSuccess: false, message: 'Invalid Credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...accountData } = account.toObject();
    const token = generateToken(account);

    // Save both the token and user data in a cookie
    const cookie = serialize("user", JSON.stringify({
      _id: account._id,
      username: account.username,
      email: account.email
    }), {
      httpOnly: true,  // Make sure the cookie is accessible only on the server side
      secure: process.env.NODE_ENV === "production",  // Only send over HTTPS in production
      maxAge: 3600,  // 1 hour expiration
      path: "/",  // Cookie available across the entire domain
    });

    const tokenCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 3600,
      path: "/",
    });

    return NextResponse.json({
      isSuccess: true,
      message: "Login successful",
      account: accountData,
    }, {
      status: 200,
      headers: {
        'Set-Cookie': `${cookie}, ${tokenCookie}`
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies and extract its value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized: Token is missing' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token); // Verify the token
    const user = await Accounts.findById(decoded.id).select('-password'); // Exclude password

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    // Set the cookie to expire immediately, effectively deleting it
    const cookie = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 0, // Set maxAge to 0 to delete the cookie
      path: "/", 
    });

    return NextResponse.json(
      { isSuccess: true, message: "Logout successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie, // Set the cookie with expired date to delete it
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}

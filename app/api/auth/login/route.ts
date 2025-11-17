// Example API route: app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Replace with your actual authentication logic
    // This is just an example
    if (email === "demo@kt.com" && password === "demo123") {
      const token = "your-jwt-token-here"; // Generate actual JWT token

      // Set HttpOnly cookie for auth token
      (await cookies()).set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      // Set user role cookie for RBAC
      (await cookies()).set("user_role", "internal-super-admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        data: {
          user: {
            id: "1",
            email: "demo@kt.com",
            name: "Demo User",
            avatar: "/media/avatars/300-2.png",
          },
        },
        responseCode: "SUCCESS",
        responseMessage: "Login successful",
      });
    }

    return NextResponse.json(
      {
        data: null,
        responseCode: "INVALID_CREDENTIALS",
        responseMessage: "Invalid email or password",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "An error occurred during login",
      },
      { status: 500 }
    );
  }
}

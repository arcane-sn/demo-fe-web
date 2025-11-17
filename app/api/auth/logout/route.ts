// Example API route: app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear HttpOnly cookies
    (await cookies()).delete("auth_token");
    (await cookies()).delete("user_role");

    return NextResponse.json({
      data: null,
      responseCode: "SUCCESS",
      responseMessage: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "An error occurred during logout",
      },
      { status: 500 }
    );
  }
}

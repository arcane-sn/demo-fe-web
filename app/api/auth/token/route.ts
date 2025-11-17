// app/api/auth/token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Read the HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          data: null,
          responseCode: "NO_TOKEN",
          responseMessage: "No authentication token found",
        },
        { status: 401 }
      );
    }

    // Return the token for Authorization header
    return NextResponse.json({
      data: { token },
      responseCode: "SUCCESS",
      responseMessage: "Token retrieved successfully",
    });
  } catch (error) {
    console.error("Token retrieval error:", error);
    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "Failed to retrieve token",
      },
      { status: 500 }
    );
  }
}

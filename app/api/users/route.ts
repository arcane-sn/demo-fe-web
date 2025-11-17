import { NextRequest, NextResponse } from "next/server";
import {
  CreateUserSchema,
  User,
} from "@/app/(protected)/user-management/forms/user-schema";
import { getUsers, addUser } from "./data-service";

// GET /api/users - List all users
export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({
      data: users,
      responseCode: "SUCCESS",
      responseMessage: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = CreateUserSchema.parse(body);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(), // Use timestamp for unique ID
      name: validatedData.name,
      email: validatedData.email,
      role: validatedData.role,
      status: validatedData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdUser = await addUser(newUser);

    return NextResponse.json(
      {
        data: createdUser,
        responseCode: "SUCCESS",
        responseMessage: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          data: null,
          responseCode: "VALIDATION_ERROR",
          responseMessage: "Invalid user data",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "Failed to create user",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { UpdateUserSchema } from "@/app/(protected)/user-management/forms/user-schema";
import { updateUser, deleteUser } from "../data-service";

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: userId } = await params;

    // Validate the request body
    const validatedData = UpdateUserSchema.parse({ ...body, id: userId });

    // Update user
    const updatedUser = await updateUser(userId, validatedData);

    if (!updatedUser) {
      return NextResponse.json(
        {
          data: null,
          responseCode: "NOT_FOUND",
          responseMessage: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: updatedUser,
      responseCode: "SUCCESS",
      responseMessage: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);

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
        responseMessage: "Failed to update user",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    // Delete user
    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return NextResponse.json(
        {
          data: null,
          responseCode: "NOT_FOUND",
          responseMessage: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: deletedUser,
      responseCode: "SUCCESS",
      responseMessage: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return NextResponse.json(
      {
        data: null,
        responseCode: "SERVER_ERROR",
        responseMessage: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}

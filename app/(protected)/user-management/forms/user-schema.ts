import { z } from "zod";

// User role enum
export const UserRole = z.enum(["admin", "user", "moderator"]);
export type UserRole = z.infer<typeof UserRole>;

// User status enum
export const UserStatus = z.enum(["active", "inactive"]);
export type UserStatus = z.infer<typeof UserStatus>;

// User model
export const User = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  role: UserRole,
  status: UserStatus,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type User = z.infer<typeof User>;

// Create user schema (without id and timestamps)
export const CreateUserSchema = User.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

// Update user schema (all fields optional except id)
export const UpdateUserSchema = User.partial().required({ id: true });

export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

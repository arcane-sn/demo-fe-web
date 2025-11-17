import { User } from "@/app/(protected)/user-management/forms/user-schema";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app/api/users/users.json");

// Read users from JSON file
export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Write users to JSON file
export async function saveUsers(users: User[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
    throw error;
  }
}

// Add a new user
export async function addUser(user: User): Promise<User> {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
  return user;
}

// Update a user by ID
export async function updateUser(
  id: string,
  updatedUser: Partial<User>
): Promise<User | null> {
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updatedUser,
    updatedAt: new Date().toISOString(),
  };

  await saveUsers(users);
  return users[userIndex];
}

// Delete a user by ID
export async function deleteUser(id: string): Promise<User | null> {
  const users = await getUsers();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  await saveUsers(users);
  return deletedUser;
}

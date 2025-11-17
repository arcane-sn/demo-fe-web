"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  token: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  // Keep these for compatibility with existing UI
  data: { user: User | null } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Call your API endpoint for login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include HttpOnly cookies
      });

      const data = await response.json();

      if (data.responseCode === "SUCCESS") {
        const userData: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          avatar: data.data.user.avatar,
          token: null, // Token stored in HttpOnly cookie, not localStorage
        };

        setUser(userData);
        localStorage.setItem("auth-user", JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout API to clear HttpOnly cookie
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include HttpOnly cookies
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      localStorage.removeItem("auth-user");
    }
  };

  // Compatibility properties for existing UI components
  const data = user ? { user } : null;
  const status = isLoading
    ? "loading"
    : user
      ? "authenticated"
      : "unauthenticated";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        data,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// For compatibility with NextAuth useSession hook
export function useSession() {
  const { data, status } = useAuth();
  return { data, status };
}

// Mock signIn function for compatibility
export async function signIn(
  provider: string,
  options?: Record<string, unknown>
) {
  // Suppress unused parameter warning
  void options;

  if (provider === "credentials") {
    // This will be handled by your login form
    return { error: null };
  }
  if (provider === "google") {
    // Mock Google sign in - replace with your implementation
    console.log("Google sign in clicked - implement your Google auth here");
    return { error: null };
  }
  return { error: "Provider not supported" };
}

// Mock signOut function for compatibility
export async function signOut() {
  try {
    // Call the logout API to clear HttpOnly cookies
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include HttpOnly cookies
    });
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    // Clear localStorage and reload regardless of API call success
    const authUser = localStorage.getItem("auth-user");
    if (authUser) {
      localStorage.removeItem("auth-user");
      window.location.reload(); // Force a reload to update the auth state
    }
  }
}

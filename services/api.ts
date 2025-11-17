import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
  timeout: 10000,
});

// Interceptor untuk inject token (kalau ada)
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
      : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Export legacy client for backward compatibility
export default api;

// Re-export new service layer
export * from "./index";

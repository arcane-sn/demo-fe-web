// stores/index.ts
import { useAppStore } from "./app-store";

// Main store exports
export { useAppStore } from "./app-store";

// Type exports
export type { User } from "./types";

// Simple selectors for better performance
export const selectors = {
  // App store selectors
  useTheme: () => useAppStore((state) => state.theme),
  useIsLoading: () => useAppStore((state) => state.isLoading),
  useSidebarOpen: () => useAppStore((state) => state.sidebarOpen),
  useGlobalModal: () => useAppStore((state) => state.globalModal),
};

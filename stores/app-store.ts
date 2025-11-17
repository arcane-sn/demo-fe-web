// stores/app-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Global modal
  globalModal: {
    open: boolean;
    title: string;
    subTitle: string;
    message: string;
    image: string;
  };
  setGlobalModalOpen: (open: boolean) => void;
  setGlobalModalTitle: (title: string) => void;
  setGlobalModalSubTitle: (subTitle: string) => void;
  setGlobalModalMessage: (message: string) => void;
  setGlobalModalImage: (image: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Theme
      theme: "light",
      setTheme: (theme) => set({ theme }),

      // Loading states
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Global modal
      globalModal: {
        open: false,
        title: "",
        subTitle: "",
        message: "",
        image: "",
      },
      setGlobalModalOpen: (open) =>
        set((state) => ({
          globalModal: { ...state.globalModal, open },
        })),
      setGlobalModalTitle: (title) =>
        set((state) => ({
          globalModal: { ...state.globalModal, title },
        })),
      setGlobalModalSubTitle: (subTitle) =>
        set((state) => ({
          globalModal: { ...state.globalModal, subTitle },
        })),
      setGlobalModalMessage: (message) =>
        set((state) => ({
          globalModal: { ...state.globalModal, message },
        })),
      setGlobalModalImage: (image) =>
        set((state) => ({
          globalModal: { ...state.globalModal, image },
        })),
    }),
    {
      name: "app-store",
    }
  )
);

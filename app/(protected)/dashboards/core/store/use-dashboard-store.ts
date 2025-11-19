import { create } from "zustand";

interface DashboardState {
  // Future: Add dashboard-wide state here if needed
  // For example: selectedDateRange, filters, etc.
}

interface DashboardActions {
  // Future: Add dashboard-wide actions here if needed
}

type DashboardStore = DashboardState & DashboardActions;

/**
 * Zustand store for dashboard state management
 * Currently minimal, but can be extended for dashboard-wide state
 */
export const useDashboardStore = create<DashboardStore>()((set) => ({
  // Future: Add state and actions here
}));


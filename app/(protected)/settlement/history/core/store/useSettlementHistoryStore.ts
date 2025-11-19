"use client";

import { create } from "zustand";

interface SettlementHistoryUIState {
  selectedProvider: string;
  isBalanceDetailOpen: boolean;
  setSelectedProvider: (provider: string) => void;
  openBalanceDetail: () => void;
  closeBalanceDetail: () => void;
}

export const useSettlementHistoryStore = create<SettlementHistoryUIState>((set) => ({
  selectedProvider: "alto-premium",
  isBalanceDetailOpen: false,
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  openBalanceDetail: () => set({ isBalanceDetailOpen: true }),
  closeBalanceDetail: () => set({ isBalanceDetailOpen: false }),
}));


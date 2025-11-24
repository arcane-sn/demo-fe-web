"use client";

import { create } from "zustand";
import { IsModalPayout, PayOutTransaction } from "../core/_models";
import { INITIAL_IS_MODAL_PAYOUT } from "../core/_consts";

interface PayoutStore {
  isModal: IsModalPayout;
  selectedTransactions: PayOutTransaction[];
  setIsModal: (value: IsModalPayout) => void;
  setModal: (key: keyof IsModalPayout, value: boolean) => void;
  resetModals: () => void;
  setSelectedTransactions: (transactions: PayOutTransaction[]) => void;
}

export const usePayoutStore = create<PayoutStore>((set) => ({
  isModal: INITIAL_IS_MODAL_PAYOUT,
  selectedTransactions: [],

  setIsModal: (value: IsModalPayout) => set({ isModal: value }),

  setModal: (key: keyof IsModalPayout, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),

  resetModals: () => set({ isModal: INITIAL_IS_MODAL_PAYOUT }),

  setSelectedTransactions: (transactions: PayOutTransaction[]) =>
    set({ selectedTransactions: transactions }),
}));

"use client";

import { create } from "zustand";
import { IsModalPayout } from "../core/_models";
import { INITIAL_IS_MODAL_PAYOUT } from "../core/_consts";

interface PayoutStore {
  isModal: IsModalPayout;
  setIsModal: (value: IsModalPayout) => void;
  setModal: (key: keyof IsModalPayout, value: boolean) => void;
  resetModals: () => void;
}

export const usePayoutStore = create<PayoutStore>((set) => ({
  isModal: INITIAL_IS_MODAL_PAYOUT,

  setIsModal: (value: IsModalPayout) => set({ isModal: value }),

  setModal: (key: keyof IsModalPayout, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),

  resetModals: () => set({ isModal: INITIAL_IS_MODAL_PAYOUT }),
}));

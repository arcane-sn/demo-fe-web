"use client";

import { create } from "zustand";
import { INITIAL_IS_MODAL_PAY_IN } from "../core/_consts";
import { IsModalPayIn, PayInTransaction } from "../core/_models";

interface PayinStore {
  isModal: IsModalPayIn;
  selectedTransactions: PayInTransaction[];
  selectedPaymentMethod: string;
  setIsModal: (value: IsModalPayIn) => void;
  setModal: (key: keyof IsModalPayIn, value: boolean) => void;
  resetModals: () => void;
  setSelectedTransactions: (transactions: PayInTransaction[]) => void;
  setSelectedPaymentMethod: (method: string) => void;
}

export const usePayinStore = create<PayinStore>((set) => ({
  isModal: INITIAL_IS_MODAL_PAY_IN,
  selectedTransactions: [],
  selectedPaymentMethod: "all", // Default to "all"

  setIsModal: (value: IsModalPayIn) => set({ isModal: value }),

  setModal: (key: keyof IsModalPayIn, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),

  resetModals: () => set({ isModal: INITIAL_IS_MODAL_PAY_IN }),

  setSelectedTransactions: (transactions: PayInTransaction[]) =>
    set({ selectedTransactions: transactions }),

  setSelectedPaymentMethod: (method: string) =>
    set({ selectedPaymentMethod: method }),
}));

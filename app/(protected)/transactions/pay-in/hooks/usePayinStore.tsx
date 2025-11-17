"use client";

import { create } from "zustand";
import { INITIAL_IS_MODAL_PAY_IN } from "../core/_consts";
import { IsModalPayIn } from "../../pay-out/core/_models";

interface PayinStore {
  isModal: IsModalPayIn;
  setIsModal: (value: IsModalPayIn) => void;
  setModal: (key: keyof IsModalPayIn, value: boolean) => void;
  resetModals: () => void;
}

export const usePayinStore = create<PayinStore>((set) => ({
  isModal: INITIAL_IS_MODAL_PAY_IN,

  setIsModal: (value: IsModalPayIn) => set({ isModal: value }),

  setModal: (key: keyof IsModalPayIn, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),

  resetModals: () => set({ isModal: INITIAL_IS_MODAL_PAY_IN }),
}));

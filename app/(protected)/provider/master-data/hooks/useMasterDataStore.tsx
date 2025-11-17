"use client";

import { create } from "zustand";
import { INITIAL_IS_MODAL_MASTER_DATA } from "../core/_consts";
import { IsModalMasterData, MasterDataStoreTypes } from "../core/_models";

export const useMasterDataStore = create<MasterDataStoreTypes>((set) => ({
  isModal: INITIAL_IS_MODAL_MASTER_DATA,

  setIsModal: (value: IsModalMasterData) => set({ isModal: value }),

  setModal: (key: keyof IsModalMasterData, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),

  resetModals: () => set({ isModal: INITIAL_IS_MODAL_MASTER_DATA }),
}));

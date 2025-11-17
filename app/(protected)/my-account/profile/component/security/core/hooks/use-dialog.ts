import { create } from "zustand";

interface DialogState {
  // Setup PIN Flow
  isSetupPinOpen: boolean;
  isSetPinSuccessOpen: boolean;

  // Reset PIN Flow
  isResetPinOpen: boolean;

  // Deactivate Account Flow
  isDeactivateConfirmationOpen: boolean;
  isDeactivateSuccessOpen: boolean;

  // Reset Password Flow
  isResetPasswordEmailOpen: boolean;

  // Delete Account Flow
  isDeleteAccountConfirmationOpen: boolean;
  isDeleteAccountSuccessOpen: boolean;

  // Actions
  openSetupPin: () => void;
  closeSetupPin: () => void;
  openSetPinSuccess: () => void;
  closeSetPinSuccess: () => void;
  openResetPin: () => void;
  closeResetPin: () => void;
  openDeactivateConfirmation: () => void;
  closeDeactivateConfirmation: () => void;
  openDeactivateSuccess: () => void;
  closeDeactivateSuccess: () => void;
  openResetPasswordEmail: () => void;
  closeResetPasswordEmail: () => void;
  openDeleteAccountConfirmation: () => void;
  closeDeleteAccountConfirmation: () => void;
  openDeleteAccountSuccess: () => void;
  closeDeleteAccountSuccess: () => void;
  closeAllDialogs: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  // Initial state
  isSetupPinOpen: false,
  isSetPinSuccessOpen: false,
  isResetPinOpen: false,
  isDeactivateConfirmationOpen: false,
  isDeactivateSuccessOpen: false,
  isResetPasswordEmailOpen: false,
  isDeleteAccountConfirmationOpen: false,
  isDeleteAccountSuccessOpen: false,

  // Actions
  openSetupPin: () => set({ isSetupPinOpen: true }),
  closeSetupPin: () => set({ isSetupPinOpen: false }),
  openSetPinSuccess: () => set({ isSetPinSuccessOpen: true }),
  closeSetPinSuccess: () => set({ isSetPinSuccessOpen: false }),
  openResetPin: () => set({ isResetPinOpen: true }),
  closeResetPin: () => set({ isResetPinOpen: false }),
  openDeactivateConfirmation: () => set({ isDeactivateConfirmationOpen: true }),
  closeDeactivateConfirmation: () =>
    set({ isDeactivateConfirmationOpen: false }),
  openDeactivateSuccess: () => set({ isDeactivateSuccessOpen: true }),
  closeDeactivateSuccess: () => set({ isDeactivateSuccessOpen: false }),
  openResetPasswordEmail: () => set({ isResetPasswordEmailOpen: true }),
  closeResetPasswordEmail: () => set({ isResetPasswordEmailOpen: false }),
  openDeleteAccountConfirmation: () =>
    set({ isDeleteAccountConfirmationOpen: true }),
  closeDeleteAccountConfirmation: () =>
    set({ isDeleteAccountConfirmationOpen: false }),
  openDeleteAccountSuccess: () => set({ isDeleteAccountSuccessOpen: true }),
  closeDeleteAccountSuccess: () => set({ isDeleteAccountSuccessOpen: false }),
  closeAllDialogs: () =>
    set({
      isSetupPinOpen: false,
      isSetPinSuccessOpen: false,
      isResetPinOpen: false,
      isDeactivateConfirmationOpen: false,
      isDeactivateSuccessOpen: false,
      isResetPasswordEmailOpen: false,
      isDeleteAccountConfirmationOpen: false,
      isDeleteAccountSuccessOpen: false,
    }),
}));

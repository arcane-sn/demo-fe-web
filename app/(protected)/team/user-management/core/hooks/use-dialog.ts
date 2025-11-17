import { create } from "zustand";

interface DialogState {
  // Account Details Dialog
  isAccountDetailsOpen: boolean;

  // Delete Account Flow
  isDeleteConfirmationOpen: boolean;
  isDeleteSuccessOpen: boolean;

  // Deactivate Account Flow
  isDeactivateConfirmationOpen: boolean;
  isDeactivateSuccessOpen: boolean;

  // Reset Password Flow
  isResetPasswordEmailOpen: boolean;

  // Actions
  openAccountDetails: () => void;
  closeAccountDetails: () => void;
  openDeleteConfirmation: () => void;
  closeDeleteConfirmation: () => void;
  openDeleteSuccess: () => void;
  closeDeleteSuccess: () => void;
  openDeactivateConfirmation: () => void;
  closeDeactivateConfirmation: () => void;
  openDeactivateSuccess: () => void;
  closeDeactivateSuccess: () => void;
  openResetPasswordEmail: () => void;
  closeResetPasswordEmail: () => void;
  closeAllDialogs: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  // Initial state
  isAccountDetailsOpen: false,
  isDeleteConfirmationOpen: false,
  isDeleteSuccessOpen: false,
  isDeactivateConfirmationOpen: false,
  isDeactivateSuccessOpen: false,
  isResetPasswordEmailOpen: false,

  // Actions
  openAccountDetails: () => set({ isAccountDetailsOpen: true }),
  closeAccountDetails: () => set({ isAccountDetailsOpen: false }),
  openDeleteConfirmation: () => set({ isDeleteConfirmationOpen: true }),
  closeDeleteConfirmation: () => set({ isDeleteConfirmationOpen: false }),
  openDeleteSuccess: () => set({ isDeleteSuccessOpen: true }),
  closeDeleteSuccess: () => set({ isDeleteSuccessOpen: false }),
  openDeactivateConfirmation: () => set({ isDeactivateConfirmationOpen: true }),
  closeDeactivateConfirmation: () =>
    set({ isDeactivateConfirmationOpen: false }),
  openDeactivateSuccess: () => set({ isDeactivateSuccessOpen: true }),
  closeDeactivateSuccess: () => set({ isDeactivateSuccessOpen: false }),
  openResetPasswordEmail: () => set({ isResetPasswordEmailOpen: true }),
  closeResetPasswordEmail: () => set({ isResetPasswordEmailOpen: false }),
  closeAllDialogs: () =>
    set({
      isAccountDetailsOpen: false,
      isDeleteConfirmationOpen: false,
      isDeleteSuccessOpen: false,
      isDeactivateConfirmationOpen: false,
      isDeactivateSuccessOpen: false,
      isResetPasswordEmailOpen: false,
    }),
}));

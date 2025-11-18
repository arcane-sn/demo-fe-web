"use client";

import { create } from "zustand";
import { PendingApprovalData } from "../../components/tables/pending-approval/core/models";
import { ApprovalLogData } from "../../components/tables/approval-log/core/models";
import { DisbursementDraft } from "../../components/tables/draft/core/models";

export interface IsModalDisbursement {
  approvalFlow: boolean;
  individualApproval: boolean;
  rejectFlow: boolean;
  individualReject: boolean;
  createDisbursement: boolean;
  uploadFile: boolean;
  uploadConfirmation: boolean;
  uploadSuccess: boolean;
  disbursementDetail: boolean;
  pendingApprovalDetail: boolean;
  editSingleDraft: boolean;
}

const INITIAL_IS_MODAL_DISBURSEMENT: IsModalDisbursement = {
  approvalFlow: false,
  individualApproval: false,
  rejectFlow: false,
  individualReject: false,
  createDisbursement: false,
  uploadFile: false,
  uploadConfirmation: false,
  uploadSuccess: false,
  disbursementDetail: false,
  pendingApprovalDetail: false,
  editSingleDraft: false,
};

interface UploadCsvData {
  totalTransferAmount: string;
  totalTransactions: number;
  totalBeneficiaryAccounts: number;
  fileName: string;
}

const mapDraftToPendingApproval = (draft: DisbursementDraft): PendingApprovalData => ({
  id: draft.id,
  creationId: draft.creationId,
  type: draft.type,
  totalTransferAmount: draft.totalTransferAmount,
  totalTransaction: draft.totalTransaction,
  totalAccount: draft.totalAccount,
  createdBy: draft.createdBy,
  lastActivityDate: draft.lastActivityDate,
  lastActivityTime: draft.lastActivityTime,
  scheduledDate: draft.scheduledDate,
  beneficiaryDetails: draft.beneficiaryDetails,
  adminFee: draft.adminFee,
  description: draft.description,
  submittedDate: draft.createdDate,
  submittedTime: draft.createdTime,
});

interface DisbursementStore {
  // Tab state
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Modal states
  isModal: IsModalDisbursement;
  setIsModal: (value: IsModalDisbursement) => void;
  setModal: (key: keyof IsModalDisbursement, value: boolean) => void;
  resetModals: () => void;

  // Selected transactions
  selectedPendingApprovals: PendingApprovalData[];
  setSelectedPendingApprovals: (transactions: PendingApprovalData[]) => void;

  // Selected items for modals
  selectedDisbursementForApproval: PendingApprovalData | null;
  selectedDisbursementForReject: PendingApprovalData | null;
  selectedDisbursementForDetail: ApprovalLogData | null;
  selectedPendingApprovalForDetail: PendingApprovalData | null;
  selectedDraftForEdit: DisbursementDraft | null;
  setSelectedDisbursementForApproval: (disbursement: PendingApprovalData | null) => void;
  setSelectedDisbursementForReject: (disbursement: PendingApprovalData | null) => void;
  setSelectedDisbursementForDetail: (disbursement: ApprovalLogData | null) => void;
  setSelectedPendingApprovalForDetail: (disbursement: PendingApprovalData | null) => void;
  setSelectedDraftForEdit: (disbursement: DisbursementDraft | null) => void;

  // Convenience actions
  openIndividualApproval: (disbursement: PendingApprovalData) => void;
  closeIndividualApproval: () => void;
  openPendingApprovalDetail: (disbursement: PendingApprovalData) => void;
  openPendingApprovalDetailFromDraft: (draft: DisbursementDraft) => void;
  closePendingApprovalDetail: () => void;
  openDraftEdit: (draft: DisbursementDraft) => void;
  closeDraftEdit: () => void;
  openIndividualReject: (disbursement: PendingApprovalData) => void;
  closeIndividualReject: () => void;
  openDisbursementDetail: (entry: ApprovalLogData) => void;
  closeDisbursementDetail: () => void;
  openUploadFile: () => void;
  closeUploadFile: () => void;
  openUploadConfirmation: () => void;
  closeUploadConfirmation: () => void;
  openUploadSuccess: () => void;
  closeUploadSuccess: () => void;
  openApprovalFlow: () => void;
  closeApprovalFlow: () => void;
  openRejectFlow: () => void;
  closeRejectFlow: () => void;
  openCreateDisbursement: () => void;
  closeCreateDisbursement: () => void;

  // Upload related
  createDisbursementType: 'single' | 'bulk';
  setCreateDisbursementType: (type: 'single' | 'bulk') => void;
  isBypassUpload: boolean;
  setIsBypassUpload: (value: boolean) => void;
  uploadedCsvData: UploadCsvData | undefined;
  setUploadedCsvData: (data: UploadCsvData | undefined) => void;
}

export const useDisbursementStore = create<DisbursementStore>((set) => ({
  // Tab state
  activeTab: "draft",
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  // Modal states
  isModal: INITIAL_IS_MODAL_DISBURSEMENT,
  setIsModal: (value: IsModalDisbursement) => set({ isModal: value }),
  setModal: (key: keyof IsModalDisbursement, value: boolean) =>
    set((state) => ({
      isModal: { ...state.isModal, [key]: value },
    })),
  resetModals: () => set({ isModal: INITIAL_IS_MODAL_DISBURSEMENT }),

  // Selected transactions
  selectedPendingApprovals: [],
  setSelectedPendingApprovals: (transactions: PendingApprovalData[]) =>
    set({ selectedPendingApprovals: transactions }),

  // Selected items for modals
  selectedDisbursementForApproval: null,
  selectedDisbursementForReject: null,
  selectedDisbursementForDetail: null,
  selectedPendingApprovalForDetail: null,
  selectedDraftForEdit: null,
  setSelectedDisbursementForApproval: (disbursement: PendingApprovalData | null) =>
    set({ selectedDisbursementForApproval: disbursement }),
  setSelectedDisbursementForReject: (disbursement: PendingApprovalData | null) =>
    set({ selectedDisbursementForReject: disbursement }),
  setSelectedDisbursementForDetail: (disbursement: ApprovalLogData | null) =>
    set({ selectedDisbursementForDetail: disbursement }),
  setSelectedPendingApprovalForDetail: (disbursement: PendingApprovalData | null) =>
    set({ selectedPendingApprovalForDetail: disbursement }),
  setSelectedDraftForEdit: (disbursement: DisbursementDraft | null) =>
    set({ selectedDraftForEdit: disbursement }),

  // Convenience actions
  openIndividualApproval: (disbursement: PendingApprovalData) =>
    set((state) => ({
      selectedDisbursementForApproval: disbursement,
      isModal: { ...state.isModal, individualApproval: true },
    })),
  closeIndividualApproval: () =>
    set((state) => ({
      selectedDisbursementForApproval: null,
      isModal: { ...state.isModal, individualApproval: false },
    })),
  openPendingApprovalDetail: (disbursement: PendingApprovalData) =>
    set((state) => ({
      selectedPendingApprovalForDetail: disbursement,
      isModal: { ...state.isModal, pendingApprovalDetail: true },
    })),
  openPendingApprovalDetailFromDraft: (draft: DisbursementDraft) => {
    const detail = mapDraftToPendingApproval(draft);
    set((state) => ({
      selectedPendingApprovalForDetail: detail,
      isModal: { ...state.isModal, pendingApprovalDetail: true },
    }));
  },
  closePendingApprovalDetail: () =>
    set((state) => ({
      selectedPendingApprovalForDetail: null,
      isModal: { ...state.isModal, pendingApprovalDetail: false },
    })),
  openDraftEdit: (draft: DisbursementDraft) =>
    set((state) => ({
      selectedDraftForEdit: draft,
      isModal: { ...state.isModal, editSingleDraft: true },
    })),
  closeDraftEdit: () =>
    set((state) => ({
      selectedDraftForEdit: null,
      isModal: { ...state.isModal, editSingleDraft: false },
    })),
  openIndividualReject: (disbursement: PendingApprovalData) =>
    set((state) => ({
      selectedDisbursementForReject: disbursement,
      isModal: { ...state.isModal, individualReject: true },
    })),
  closeIndividualReject: () =>
    set((state) => ({
      selectedDisbursementForReject: null,
      isModal: { ...state.isModal, individualReject: false },
    })),
  openDisbursementDetail: (entry: ApprovalLogData) =>
    set((state) => ({
      selectedDisbursementForDetail: entry,
      isModal: { ...state.isModal, disbursementDetail: true },
    })),
  closeDisbursementDetail: () =>
    set((state) => ({
      selectedDisbursementForDetail: null,
      isModal: { ...state.isModal, disbursementDetail: false },
    })),
  openUploadFile: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadFile: true },
    })),
  closeUploadFile: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadFile: false },
    })),
  openUploadConfirmation: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadConfirmation: true },
    })),
  closeUploadConfirmation: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadConfirmation: false },
    })),
  openUploadSuccess: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadSuccess: true },
    })),
  closeUploadSuccess: () =>
    set((state) => ({
      isModal: { ...state.isModal, uploadSuccess: false },
    })),
  openApprovalFlow: () =>
    set((state) => ({
      isModal: { ...state.isModal, approvalFlow: true },
    })),
  closeApprovalFlow: () =>
    set((state) => ({
      isModal: { ...state.isModal, approvalFlow: false },
    })),
  openRejectFlow: () =>
    set((state) => ({
      isModal: { ...state.isModal, rejectFlow: true },
    })),
  closeRejectFlow: () =>
    set((state) => ({
      isModal: { ...state.isModal, rejectFlow: false },
    })),
  openCreateDisbursement: () =>
    set((state) => ({
      isModal: { ...state.isModal, createDisbursement: true },
    })),
  closeCreateDisbursement: () =>
    set((state) => ({
      isModal: { ...state.isModal, createDisbursement: false },
    })),

  // Upload related
  createDisbursementType: 'single',
  setCreateDisbursementType: (type: 'single' | 'bulk') => set({ createDisbursementType: type }),
  isBypassUpload: false,
  setIsBypassUpload: (value: boolean) => set({ isBypassUpload: value }),
  uploadedCsvData: undefined,
  setUploadedCsvData: (data: UploadCsvData | undefined) => set({ uploadedCsvData: data }),
}));


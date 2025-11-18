"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BalanceOverview } from "./balance-overview";
import { DisbursementHeader } from "./disbursement-header";
import { DisbursementTable, PendingApprovalTable, ApprovalLogTable } from "../tables";
import { ApprovalFlowModal, IndividualApprovalModal, RejectFlowModal, BulkApprovalPreviewModal } from "../modals";
import { CreateDisbursementModal } from "../modals/create";
import DisbursementDetailModal from "../modals/detail/detail-approval-log/disbursement-detail-modal";
import { PendingApprovalDetailModal } from "../modals/detail/detail-pending-approval/pending-approval-detail-modal";
import { EditTransactionModal } from "../modals/edit";
import { UploadFileModal, UploadConfirmationModal, UploadSuccessModal } from "../modals/create/upload";
import { 
  useDisbursementList,
  usePendingApprovalList,
  useApprovalLogList,
  useDisbursementDetail
} from "../../core/hooks";
import { useDisbursementStore } from "../../core/hooks/useDisbursementStore";
import { DisbursementDraft } from "../tables/draft/core/models";
import { PendingApprovalData } from "../tables/pending-approval/core/models";
import { ApprovalLogData } from "../tables/approval-log/core/models";
import type { TransactionItem } from "../../types/batch-detail";

export function DisbursementContent() {
  const router = useRouter();
  
  // Use store for all state management
  const {
    activeTab,
    setActiveTab,
    isModal,
    selectedPendingApprovals,
    setSelectedPendingApprovals,
    selectedDisbursementForApproval,
    selectedDisbursementForReject,
    selectedDisbursementForDetail,
    selectedPendingApprovalForDetail,
    selectedDraftForEdit,
    createDisbursementType,
    setCreateDisbursementType,
    isBypassUpload,
    setIsBypassUpload,
    uploadedCsvData,
    setUploadedCsvData,
    openIndividualApproval,
    closeIndividualApproval,
    openPendingApprovalDetail,
    openPendingApprovalDetailFromDraft,
    closePendingApprovalDetail,
    openDraftEdit,
    closeDraftEdit,
    openIndividualReject,
    closeIndividualReject,
    openDisbursementDetail,
    closeDisbursementDetail,
    openUploadFile,
    closeUploadFile,
    openUploadConfirmation,
    closeUploadConfirmation,
    openUploadSuccess,
    closeUploadSuccess,
    openApprovalFlow,
    closeApprovalFlow,
    openRejectFlow,
    closeRejectFlow,
    openCreateDisbursement,
    closeCreateDisbursement,
  } = useDisbursementStore();

  const {
    data: draftData,
    loading: draftLoading,
    error: draftError,
    handleRowClick: handleDraftRowClick,
    handleView: handleDraftView,
    handleDelete: handleDraftDelete,
    handleSend: handleDraftSend,
    handleCreate: handleDraftCreate,
    selectedDisbursements: selectedDrafts,
    handleSelectionChange: handleDraftSelectionChange,
  } = useDisbursementList();

  const {
    data: pendingApprovalData,
    loading: pendingApprovalLoading,
    error: pendingApprovalError,
    handleRowClick: handlePendingApprovalRowClick,
    handleView: _handlePendingApprovalView,
    handleApprove: handlePendingApprovalApprove,
    handleReject: handlePendingApprovalReject,
    handleBulkApprove: handlePendingApprovalBulkApprove,
    handleBulkReject: handlePendingApprovalBulkReject,
  } = usePendingApprovalList();

  const {
    data: approvalLogData,
    loading: approvalLogLoading,
    error: approvalLogError,
    handleExport: handleApprovalLogExport,
    selectedEntries: selectedApprovalLogs,
    handleSelectionChange: handleApprovalLogSelectionChange,
  } = useApprovalLogList();

  const { getDisbursementData, loading: detailLoading, error: detailError } = useDisbursementDetail();

  const currentSelectedItems = activeTab === "draft" ? selectedDrafts : 
                              activeTab === "pending-approval" ? selectedPendingApprovals : 
                              selectedApprovalLogs;
  const currentSelectedCount = currentSelectedItems.length;

  const handleClearSelection = useCallback(() => {
    if (activeTab === "draft") {
      handleDraftSelectionChange([]);
    } else if (activeTab === "pending-approval") {
      setSelectedPendingApprovals([]);
    } else {
      handleApprovalLogSelectionChange([]);
    }
  }, [activeTab, handleDraftSelectionChange, setSelectedPendingApprovals, handleApprovalLogSelectionChange]);

  const [isBulkApprovalPreviewOpen, setIsBulkApprovalPreviewOpen] = useState(false);

  const handleBulkApprove = useCallback(() => {
    if (activeTab === "pending-approval" && selectedPendingApprovals.length > 0) {
      setIsBulkApprovalPreviewOpen(true);
    }
  }, [activeTab, selectedPendingApprovals.length]);

  const handleBulkApprovalPreviewContinue = useCallback(() => {
    setIsBulkApprovalPreviewOpen(false);
    openApprovalFlow();
  }, [openApprovalFlow]);

  const handleBulkReject = useCallback(() => {
    if (activeTab === "pending-approval") {
      openRejectFlow();
    }
  }, [activeTab, openRejectFlow]);


  const handleApprovalComplete = useCallback(() => {
    handlePendingApprovalBulkApprove(selectedPendingApprovals);
    handleClearSelection();
  }, [handlePendingApprovalBulkApprove, selectedPendingApprovals, handleClearSelection]);

  const handleForgotPin = useCallback(() => {
  }, []);

  const handleIndividualApprove = useCallback((disbursement: PendingApprovalData) => {
    openIndividualApproval(disbursement);
  }, [openIndividualApproval]);

  const handleIndividualApprovalComplete = useCallback((disbursement: PendingApprovalData) => {
    handlePendingApprovalApprove(disbursement);
    closeIndividualApproval();
  }, [closeIndividualApproval, handlePendingApprovalApprove]);

  const handleIndividualReject = useCallback((disbursement: PendingApprovalData) => {
  openIndividualReject(disbursement);
}, [openIndividualReject]);

  const handleIndividualRejectComplete = useCallback((disbursement: PendingApprovalData) => {
    handlePendingApprovalReject(disbursement);
  closeIndividualReject();
}, [closeIndividualReject, handlePendingApprovalReject]);

  const handleBulkRejectComplete = useCallback(() => {
    handlePendingApprovalBulkReject(selectedPendingApprovals);
    handleClearSelection();
  }, [handlePendingApprovalBulkReject, selectedPendingApprovals, handleClearSelection]);

  const handleCreateSingleTransfer = useCallback(() => {
    setCreateDisbursementType('single');
    openCreateDisbursement();
  }, [openCreateDisbursement, setCreateDisbursementType]);

  const handleCreateBulkTransfer = useCallback(() => {
  openUploadFile();
}, [openUploadFile]);

  const handlePendingApprovalView = useCallback((disbursement: PendingApprovalData) => {
    openIndividualApproval(disbursement);
  }, [openIndividualApproval]);

  const convertDraftToTransactionItem = useCallback((draft: DisbursementDraft): TransactionItem => ({
    id: draft.id,
    status: undefined,
    transferAmount: draft.totalTransferAmount,
    partnerReferenceNumber: draft.creationId,
    accountNumber: draft.beneficiaryDetails?.accountNumber || "",
    bankName: draft.beneficiaryDetails?.bankName || "",
    bankCode: "",
    accountName: draft.beneficiaryDetails?.accountName || "",
    remark: draft.description,
    sendToEmail: draft.createdBy.email,
    sendToName: draft.createdBy.name,
  }), []);

  const handleDraftEdit = useCallback((disbursement: DisbursementDraft) => {
    if (disbursement.type !== 'single') {
      return;
    }

    openDraftEdit(disbursement);
  }, [openDraftEdit]);

  const handleDraftEditModalChange = useCallback((open: boolean) => {
    if (!open) {
      closeDraftEdit();
    }
  }, [closeDraftEdit]);

  const handleSingleDraftSave = useCallback((transaction: TransactionItem) => {
    console.log("Updated single draft transaction:", transaction);
  }, []);

  const handleViewDisbursementDetail = useCallback((entry: ApprovalLogData) => {
  openDisbursementDetail(entry);
}, [openDisbursementDetail]);

  const handlePendingApprovalDetail = useCallback((disbursement: PendingApprovalData) => {
    if (disbursement.type === "batch" && disbursement.id) {
      router.push(`/send-funds/disbursement/detail/${disbursement.id}`);
      return;
    }

    openPendingApprovalDetail(disbursement);
  }, [openPendingApprovalDetail, router]);

  const handleApprovalLogDetailNavigation = useCallback((entry: ApprovalLogData) => {
    const creationMethod = entry.creationType || entry.creationMethod;

    if (creationMethod === 'batch' && entry.id) {
      router.push(`/send-funds/disbursement/detail/${entry.id}`);
      return;
    }

    handleViewDisbursementDetail(entry);
  }, [handleViewDisbursementDetail, router]);

  const getSelectedDisbursementDetail = () => {
    if (!selectedDisbursementForDetail) return undefined;
    
    const statusMap: Record<string, string> = {
      'partially-complete': 'processing',
      'completed': 'completed',
      'rejected': 'rejected',
      'approved': 'approved',
      'scheduled': 'scheduled',
      'processing': 'processing'
    };
    
    const mappedStatus = statusMap[selectedDisbursementForDetail.status] || 'approved';
    const baseData = getDisbursementData(mappedStatus);
    const creationMethod = selectedDisbursementForDetail.creationType || selectedDisbursementForDetail.creationMethod || 'single';
    
    return {
      ...baseData,
      creationMethod: creationMethod as 'single' | 'batch',
      referenceNumber: selectedDisbursementForDetail.creationId || baseData.referenceNumber,
      transferAmount: selectedDisbursementForDetail.totalTransferAmount || baseData.transferAmount,
      adminFee: selectedDisbursementForDetail.adminFee || baseData.adminFee,
      totalTransferAmount: selectedDisbursementForDetail.totalTransferAmount || baseData.totalTransferAmount,
      beneficiaryDetails: selectedDisbursementForDetail.beneficiaryDetails ? {
        accountNumber: selectedDisbursementForDetail.beneficiaryDetails.accountNumber || baseData.beneficiaryDetails.accountNumber,
        bankName: selectedDisbursementForDetail.beneficiaryDetails.bankName || baseData.beneficiaryDetails.bankName,
        bankCode: baseData.beneficiaryDetails.bankCode,
        accountName: selectedDisbursementForDetail.beneficiaryDetails.accountName || baseData.beneficiaryDetails.accountName,
        accountStatus: baseData.beneficiaryDetails.accountStatus,
      } : baseData.beneficiaryDetails,
      remark: selectedDisbursementForDetail.description || baseData.remark,
      rejectionReason: selectedDisbursementForDetail.rejectionReason || selectedDisbursementForDetail.reason || baseData.rejectionReason,
    };
  };

  const handleFileUpload = useCallback((file: File) => {
    import('../../core/data/mock-csv').then(({ processMockCsvFile }) => {
      const csvData = processMockCsvFile(file);
      setUploadedCsvData(csvData);
    closeUploadFile();
    openUploadConfirmation();
    });
}, [closeUploadFile, openUploadConfirmation, setUploadedCsvData]);

  const handleUploadConfirmation = useCallback((data: {
    creationId: string;
    scheduledDisbursement: boolean;
    bypassAccountInquiry: boolean;
    scheduledDate?: string;
  }) => {
    setIsBypassUpload(data.bypassAccountInquiry);
  closeUploadConfirmation();
  openUploadSuccess();
}, [closeUploadConfirmation, openUploadSuccess, setIsBypassUpload]);

  const handleUploadConfirmationCancel = useCallback(() => {
    setUploadedCsvData(undefined);
  closeUploadConfirmation();
}, [closeUploadConfirmation, setUploadedCsvData]);

  const handleUploadSuccessOkay = useCallback(() => {
    setUploadedCsvData(undefined);
  closeUploadSuccess();
    setIsBypassUpload(false);
}, [closeUploadSuccess, setIsBypassUpload, setUploadedCsvData]);

  const handleDraftDetail = useCallback((disbursement: DisbursementDraft) => {
    if (disbursement.type === 'batch' && disbursement.id) {
      router.push(`/send-funds/disbursement/detail/${disbursement.id}`);
      return;
    }

    openPendingApprovalDetailFromDraft(disbursement);
  }, [openPendingApprovalDetailFromDraft, router]);

  const handlePendingSelectionChange = useCallback((selected: PendingApprovalData[]) => {
    const isSameLength = selected.length === selectedPendingApprovals.length;
    const isSameItems =
      isSameLength &&
      selected.every((item, index) => item.id === selectedPendingApprovals[index]?.id);

    if (isSameItems) {
      return;
    }

    setSelectedPendingApprovals(selected);
  }, [selectedPendingApprovals, setSelectedPendingApprovals]);

  const calculateBulkTotalAmount = useCallback(() => {
    if (selectedPendingApprovals.length === 0) return "IDR 0";
    if (selectedPendingApprovals.length === 1) {
      return selectedPendingApprovals[0]?.totalTransferAmount || "IDR 0";
    }
    
    const total = selectedPendingApprovals.reduce((sum, item) => {
      const amount = item.totalTransferAmount?.replace(/[^\d]/g, '') || '0';
      return sum + parseInt(amount);
    }, 0);
    
    return `IDR ${total.toLocaleString('id-ID')}`;
  }, [selectedPendingApprovals]);

  const aggregateSelectedPendingApprovals = useMemo(() => {
    if (selectedPendingApprovals.length === 0) {
      return {
        totalTransactions: 0,
        totalAccounts: 0,
        totalAmountNumeric: 0,
      };
    }

    return selectedPendingApprovals.reduce(
      (acc, item) => ({
        totalTransactions: acc.totalTransactions + (item.totalTransaction ?? 0),
        totalAccounts: acc.totalAccounts + (item.totalAccount ?? 0),
        totalAmountNumeric:
          acc.totalAmountNumeric +
          parseInt(item.totalTransferAmount?.replace(/[^\d]/g, "") || "0", 10),
      }),
      { totalTransactions: 0, totalAccounts: 0, totalAmountNumeric: 0 },
    );
  }, [selectedPendingApprovals]);
  const parseCurrencyToNumber = (amount: string) =>
    parseInt(amount.replace(/[^\d]/g, "") || "0", 10);

  const aggregateTotalTransferAmount = aggregateSelectedPendingApprovals.totalAmountNumeric;

  const hasSufficientBalance = useMemo(() => {
    const balanceValue = parseCurrencyToNumber("IDR 200.000.000"); // placeholder
    return balanceValue >= aggregateTotalTransferAmount;
  }, [aggregateTotalTransferAmount]);

  const convertToTransferDataItem = useCallback((data: PendingApprovalData) => {
    return {
      totalTransferAmount: data.totalTransferAmount,
      creationId: data.creationId,
      transferType: data.type,
      totalTransaction: data.totalTransaction,
      totalBeneficiaryAccounts: data.totalAccount,
      batchTransferAmount: data.type === 'batch' ? data.totalTransferAmount : undefined,
      adminFee: data.adminFee,
      beneficiaryDetails: data.beneficiaryDetails ? {
        bankName: data.beneficiaryDetails.bankName,
        accountNumber: data.beneficiaryDetails.accountNumber,
        accountName: data.beneficiaryDetails.accountName,
        scheduledTransfer: data.scheduledDate || 'OFF'
      } : undefined,
      requesterDetails: {
        email: data.createdBy.email,
        requestedDate: `${data.submittedDate}, ${data.submittedTime}`
      }
    };
  }, []);

  const singleDraftTransaction = useMemo(() => {
    if (!selectedDraftForEdit) return undefined;
    return convertDraftToTransactionItem(selectedDraftForEdit);
  }, [convertDraftToTransactionItem, selectedDraftForEdit]);

  const bulkApprovalTransferData = useMemo(
    () => selectedPendingApprovals.map(convertToTransferDataItem),
    [convertToTransferDataItem, selectedPendingApprovals],
  );

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="grid gap-5 lg:gap-7.5">
        {/* Balance Overview Section */}
        <BalanceOverview />

        {/* Disbursement Header with Tabs and Bulk Actions */}
        <DisbursementHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateSingleTransfer={handleCreateSingleTransfer}
          onCreateBulkTransfer={handleCreateBulkTransfer}
          selectedCount={currentSelectedCount}
          onRejectSelected={handleBulkReject}
          onApproveSelected={handleBulkApprove}
          onClearSelection={handleClearSelection}
        />

        {/* Conditional Table Rendering */}
        {activeTab === "draft" && (
          <div className="w-full">
            <DisbursementTable
              data={draftData}
              onView={handleDraftView}
              onEdit={handleDraftEdit}
              onDelete={handleDraftDelete}
              onSend={handleDraftSend}
              onDetail={handleDraftDetail}
              onRowClick={handleDraftRowClick}
              onSelectionChange={handleDraftSelectionChange}
              loading={draftLoading}
              error={draftError || undefined}
            />
          </div>
        )}

        {activeTab === "pending-approval" && (
          <div className="w-full">
            <PendingApprovalTable
              data={pendingApprovalData}
              onView={handlePendingApprovalView}
              onApprove={handleIndividualApprove}
              onReject={handleIndividualReject}
              onDetail={handlePendingApprovalDetail}
              onRowClick={handlePendingApprovalRowClick}
              onSelectionChange={handlePendingSelectionChange}
              loading={pendingApprovalLoading}
              error={pendingApprovalError || undefined}
            />
          </div>
        )}

        {activeTab === "approval-log" && (
          <div className="w-full">
            <ApprovalLogTable
              data={approvalLogData}
              onViewDetails={handleApprovalLogDetailNavigation}
              onExport={handleApprovalLogExport}
              onRowClick={handleApprovalLogDetailNavigation}
              onSelectionChange={handleApprovalLogSelectionChange}
              loading={approvalLogLoading}
              error={approvalLogError || undefined}
            />
          </div>
        )}
      </div>
      
      {/* Approval Flow Modal */}
      <ApprovalFlowModal
        open={isModal.approvalFlow}
        onOpenChange={(open) => {
          if (!open) {
            closeApprovalFlow();
          }
        }}
        transferData={{
          totalTransferAmount: calculateBulkTotalAmount(),
          totalTransaction: aggregateSelectedPendingApprovals.totalTransactions || selectedPendingApprovals.length,
          totalAccount: aggregateSelectedPendingApprovals.totalAccounts || selectedPendingApprovals.length,
          selectedRequest: selectedPendingApprovals.length,
          transferAmount: calculateBulkTotalAmount(),
          adminFee: selectedPendingApprovals.length === 1 ? "IDR 0" : "IDR 50.000",
          activeBalance: "IDR 200.000.000",
          isBalanceSufficient: hasSufficientBalance,
        }}
        onApprovalComplete={handleApprovalComplete}
        onForgotPin={handleForgotPin}
      />
      
      {/* Individual Approval Modal */}
      <IndividualApprovalModal
        open={isModal.individualApproval}
        onOpenChange={(open) => {
          if (!open) {
            closeIndividualApproval();
          }
        }}
        disbursement={selectedDisbursementForApproval}
        onApprovalComplete={handleIndividualApprovalComplete}
        onForgotPin={handleForgotPin}
      />
      
      {/* Bulk Approval Preview Modal */}
      <BulkApprovalPreviewModal
        open={isBulkApprovalPreviewOpen}
        onOpenChange={setIsBulkApprovalPreviewOpen}
        onCancel={() => setIsBulkApprovalPreviewOpen(false)}
        onContinue={handleBulkApprovalPreviewContinue}
        transferData={bulkApprovalTransferData}
      />
      
      {/* Bulk Reject Flow Modal */}
      <RejectFlowModal
        open={isModal.rejectFlow}
        onOpenChange={(open) => {
          if (!open) {
            closeRejectFlow();
          }
        }}
        transferData={
          selectedPendingApprovals.length === 1
            ? convertToTransferDataItem(selectedPendingApprovals[0])
            : selectedPendingApprovals.map(convertToTransferDataItem)
        }
        onRejectComplete={handleBulkRejectComplete}
      />
      
      {/* Individual Reject Modal */}
      {selectedDisbursementForReject && (
        <RejectFlowModal
          open={isModal.individualReject}
          onOpenChange={(open) => {
            if (!open) {
              closeIndividualReject();
            }
          }}
          transferData={convertToTransferDataItem(selectedDisbursementForReject)}
          onRejectComplete={() => {
            if (selectedDisbursementForReject) {
              handleIndividualRejectComplete(selectedDisbursementForReject);
            }
          }}
        />
      )}
      
      {/* Create Disbursement Modal */}
      <CreateDisbursementModal
        open={isModal.createDisbursement}
        onOpenChange={(open) => {
          if (!open) {
            closeCreateDisbursement();
          }
        }}
        type={createDisbursementType}
      />
      
      {/* Disbursement Detail Modal */}
      <DisbursementDetailModal
        open={isModal.disbursementDetail}
        onOpenChange={(open) => {
          if (!open) {
            closeDisbursementDetail();
          }
        }}
        disbursementId={selectedDisbursementForDetail?.id}
        status={selectedDisbursementForDetail?.status === 'partially-complete' ? 'completed' : selectedDisbursementForDetail?.status}
        disbursementDetail={getSelectedDisbursementDetail()}
        loading={detailLoading}
        error={detailError || undefined}
      />

      {/* Pending Approval Detail Modal */}
      <PendingApprovalDetailModal
        open={isModal.pendingApprovalDetail}
        onOpenChange={(open) => {
          if (!open) {
            closePendingApprovalDetail();
          }
        }}
        disbursement={selectedPendingApprovalForDetail}
      />

      {/* Edit Single Draft Modal */}
      <EditTransactionModal
        open={isModal.editSingleDraft}
        onOpenChange={handleDraftEditModalChange}
        transaction={singleDraftTransaction}
        onSave={handleSingleDraftSave}
      />

      {/* Upload File Modal */}
      <UploadFileModal
        open={isModal.uploadFile}
        onOpenChange={(open) => {
          if (!open) {
            closeUploadFile();
          }
        }}
        onFileUpload={handleFileUpload}
      />

      {/* Upload Confirmation Modal */}
      <UploadConfirmationModal
        open={isModal.uploadConfirmation}
        onOpenChange={(open) => {
          if (!open) {
            closeUploadConfirmation();
          }
        }}
        onConfirmUpload={handleUploadConfirmation}
        onCancel={handleUploadConfirmationCancel}
        csvData={uploadedCsvData}
      />

      {/* Upload Success Modal */}
      <UploadSuccessModal
        open={isModal.uploadSuccess}
        onOpenChange={(open) => {
          if (!open) {
            closeUploadSuccess();
          }
        }}
        onOkay={handleUploadSuccessOkay}
        isBypass={isBypassUpload}
      />
    </div>
  );
}

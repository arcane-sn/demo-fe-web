"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, CircleX, XIcon } from "lucide-react";
import { BalanceRequestTable } from "./table";
import { mockBalanceRequestData } from "../core/data/mock-balance-requests";
import { useBalanceRequestList } from "../core/hooks/use-balance-request-list";
import { BalanceRequestData } from "../core/_model";
import { useCallback, useState } from "react";
import ModalExport from "@/app/(protected)/components/modal/export/modal-export";
import { ModalBalanceFilter } from "../../components";
import ModalBalanceApprove from "./modal/modal.balance.approve";
import ModalBalanceNotif from "./modal/modal.balance.notif";
import ModalBalanceReject from "./modal/modal.balance.reject";
import ModalBalanceRelease from "./modal/modal.balance.release";
import ModalBalanceTopup from "./modal/modal.balance.top-up";
import ModalBalanceAdjustment from "./modal/modal.balance.adjustment";
import ModalBalanceHold from "./modal/modal.balance.hold";
import { ModalOtp } from "../../components";

const BalanceRequestContent = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showBalanceConfirmationModal, setShowBalanceConfirmationModal] =
    useState(false);
  const [showBalanceNotifModal, setShowBalanceNotifModal] = useState(false);
  const [showBalanceRejectModal, setShowBalanceRejectModal] = useState(false);
  const [balanceNotifStatus, setBalanceNotifStatus] = useState("approved");
  const [pendingRequest, setPendingRequest] =
    useState<BalanceRequestData | null>(null);
  const [notifActivityType, setNotifActivityType] = useState<
    string | undefined
  >(undefined);
  const [notifIsMultiple, setNotifIsMultiple] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [detailModalRequest, setDetailModalRequest] =
    useState<BalanceRequestData | null>(null);
  const {
    selectedRequests,
    loading,
    error,
    handleRowClick,
    handleSelectionChange,
    clearError,
    isModal,
    setIsModal,
    closeModal,
  } = useBalanceRequestList();

  const handleClearSelection = useCallback(() => {
    // Clear selection by calling handleSelectionChange with empty array
    handleSelectionChange([]);
  }, [handleSelectionChange]);

  // Stable selection change handler
  const stableHandleSelectionChange = useCallback(
    (requests: any[]) => {
      handleSelectionChange(requests);
    },
    [handleSelectionChange]
  );

  // Debug log for selection changes
  console.log("Selected requests count:", selectedRequests.length);

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Balance Request</h1>
            <p className="text-sm text-muted-foreground">
              View and review submitted balance requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedRequests.length > 0 && (
              <div className="px-2.5 py-2 bg-neutral-50 rounded-md outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-start items-center gap-2.5">
                <div className="flex justify-start items-center gap-1">
                  <div className="text-slate-500 text-xs font-normal font-['Inter'] leading-3">
                    Selected Request:
                  </div>
                  <div className="text-slate-800 text-xs font-normal font-['Inter'] leading-3">
                    {selectedRequests.length}
                  </div>
                </div>
                <XIcon
                  className="w-4 h-4 cursor-pointer hover:text-red-500"
                  onClick={handleClearSelection}
                />
              </div>
            )}
            <Button
              variant="destructive"
              onClick={() => setShowBalanceRejectModal(true)}
              disabled={selectedRequests.length === 0}
            >
              <CircleX />
              Reject
            </Button>
            <Button
              variant="primary"
              className="bg-success"
              onClick={() => setShowBalanceConfirmationModal(true)}
              disabled={selectedRequests.length === 0}
            >
              <CheckCircle />
              Approve
            </Button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-red-800">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="space-y-6">
        <BalanceRequestTable
          data={mockBalanceRequestData}
          loading={loading}
          error={error || undefined}
          onOpenExport={() => setShowExportModal(true)}
          onOpenFilter={() => setShowFilterModal(true)}
          seeDetail={(e) => {
            setDetailModalRequest(e);
            if (e.activityType.type === "adjustment") {
              setIsModal((prev) => ({ ...prev, balanceAdjustmentModal: true }));
            } else if (e.activityType.type === "hold") {
              setIsModal((prev) => ({ ...prev, balanceHoldModal: true }));
            } else if (e.activityType.type === "topup") {
              setIsModal((prev) => ({ ...prev, balanceTopupModal: true }));
            } else if (e.activityType.type === "release") {
              setIsModal((prev) => ({ ...prev, balanceReleaseModal: true }));
            }
          }}
          approveRequest={(row) => {
            setPendingRequest(row);
            setShowBalanceConfirmationModal(true);
          }}
          rejectRequest={(row) => {
            setPendingRequest(row);
            setShowBalanceRejectModal(true);
          }}
        />

        <ModalExport
          open={showExportModal}
          onClose={() => setShowExportModal(false)}
        />

        <ModalBalanceFilter
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
        <ModalBalanceApprove
          open={showBalanceConfirmationModal}
          onClose={() => {
            setShowBalanceConfirmationModal(false);
            setPendingRequest(null);
          }}
          handleApprove={() => {
            // Show OTP modal after user clicks approve
            setShowBalanceConfirmationModal(false);
            setPendingAction("approve");
            setShowOtpModal(true);
          }}
          isMultiple={pendingRequest ? false : selectedRequests.length > 1}
          activityType={
            pendingRequest
              ? pendingRequest.activityType?.label
              : selectedRequests.length === 1
                ? selectedRequests[0]?.activityType?.label
                : undefined
          }
        />
        <ModalOtp
          open={showOtpModal}
          onClose={() => {
            setShowOtpModal(false);
            setPendingAction(null);
          }}
          onVerify={(otp) => {
            // After OTP verified, proceed with approve/reject action
            setShowOtpModal(false);

            const isMultiple = pendingRequest
              ? false
              : selectedRequests.length > 1;
            const activityType = pendingRequest
              ? pendingRequest.activityType?.label
              : selectedRequests.length === 1
                ? selectedRequests[0]?.activityType?.label
                : undefined;

            if (pendingAction === "approve") {
              setBalanceNotifStatus("approved");
              setNotifIsMultiple(isMultiple);
              setNotifActivityType(activityType);
              setShowBalanceNotifModal(true);
              setPendingRequest(null);
            } else if (pendingAction === "reject") {
              setBalanceNotifStatus("rejected");
              setNotifIsMultiple(isMultiple);
              setNotifActivityType(activityType);
              setShowBalanceNotifModal(true);
              setPendingRequest(null);
            }

            setPendingAction(null);
          }}
          email="admin@flypay.com"
        />
        <ModalBalanceNotif
          open={showBalanceNotifModal}
          onClose={() => {
            setShowBalanceNotifModal(false);
            setNotifActivityType(undefined);
            setNotifIsMultiple(false);
          }}
          status={balanceNotifStatus}
          isMultiple={notifIsMultiple}
          activityType={notifActivityType}
        />
        <ModalBalanceReject
          open={showBalanceRejectModal}
          onClose={() => {
            setShowBalanceRejectModal(false);
            setPendingRequest(null);
          }}
          handleReject={() => {
            // Show OTP modal after user clicks reject
            setShowBalanceRejectModal(false);
            setPendingAction("reject");
            setShowOtpModal(true);
          }}
          isMultiple={pendingRequest ? false : selectedRequests.length > 1}
          activityType={
            pendingRequest
              ? pendingRequest.activityType?.label
              : selectedRequests.length === 1
                ? selectedRequests[0]?.activityType?.label
                : undefined
          }
        />

        <ModalBalanceRelease
          open={isModal.balanceReleaseModal}
          onClose={() => {
            setIsModal((prev) => ({ ...prev, balanceReleaseModal: false }));
            setDetailModalRequest(null);
          }}
          onApprove={() => {
            setIsModal((prev) => ({ ...prev, balanceReleaseModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceConfirmationModal(true);
          }}
          onReject={() => {
            setIsModal((prev) => ({ ...prev, balanceReleaseModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceRejectModal(true);
          }}
        />

        <ModalBalanceTopup
          open={isModal.balanceTopupModal}
          onClose={() => {
            setIsModal((prev) => ({ ...prev, balanceTopupModal: false }));
            setDetailModalRequest(null);
          }}
          onApprove={() => {
            setIsModal((prev) => ({ ...prev, balanceTopupModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceConfirmationModal(true);
          }}
          onReject={() => {
            setIsModal((prev) => ({ ...prev, balanceTopupModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceRejectModal(true);
          }}
        />

        <ModalBalanceAdjustment
          open={isModal.balanceAdjustmentModal}
          onClose={() => {
            setIsModal((prev) => ({ ...prev, balanceAdjustmentModal: false }));
            setDetailModalRequest(null);
          }}
          onApprove={() => {
            setIsModal((prev) => ({ ...prev, balanceAdjustmentModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceConfirmationModal(true);
          }}
          onReject={() => {
            setIsModal((prev) => ({ ...prev, balanceAdjustmentModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceRejectModal(true);
          }}
        />

        <ModalBalanceHold
          open={isModal.balanceHoldModal}
          onClose={() => {
            setIsModal((prev) => ({ ...prev, balanceHoldModal: false }));
            setDetailModalRequest(null);
          }}
          onApprove={() => {
            setIsModal((prev) => ({ ...prev, balanceHoldModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceConfirmationModal(true);
          }}
          onReject={() => {
            setIsModal((prev) => ({ ...prev, balanceHoldModal: false }));
            setPendingRequest(detailModalRequest);
            setShowBalanceRejectModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default BalanceRequestContent;

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { KeenIcon } from "@/components/keenicons";
import type { BatchDetail } from "../../../types/batch-detail";
import { FIELD_LABELS } from "../core/constants";

interface BatchDetailsHeaderProps {
  batchDetail?: BatchDetail;
  onSubmitForApproval?: () => void;
  onApprovePending?: () => void;
  onRejectPending?: () => void;
}

export function BatchDetailsHeader({
  batchDetail,
  onSubmitForApproval,
  onApprovePending,
  onRejectPending,
}: BatchDetailsHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const showSubmitButton = batchDetail?.status === 'valid';
  const showPendingActions = batchDetail?.status === 'pending-approval';

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-8 w-8"
        >
          <KeenIcon icon="arrow-left" style="outline" className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Batch Details</h1>
      </div>
      {showSubmitButton && (
        <Button
          onClick={onSubmitForApproval}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {FIELD_LABELS.SUBMIT_FOR_APPROVAL}
        </Button>
      )}
      {showPendingActions && (
        <div className="flex items-center gap-3">
          <Button
            onClick={onApprovePending}
            className="bg-success hover:bg-success/90 text-white w-30 flex items-center gap-2"
          >
            <KeenIcon icon="check-circle" style="outline" className="" />
            Approve
          </Button>
          <Button
            variant="destructive"
            className="text-white w-30 flex items-center gap-2"
            onClick={onRejectPending}
          >
            <KeenIcon icon="cross-circle" style="outline" className="" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}


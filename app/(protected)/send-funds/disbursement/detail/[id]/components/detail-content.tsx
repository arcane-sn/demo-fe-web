"use client";

import { use, useCallback, useMemo } from "react";
import { Container } from "@/components/common/container";
import { BatchDetailsHeader } from "./batch-details-header";
import { BatchDetailsCard } from "./batch-details-card";
import { TransactionListCard } from "./transaction-list-card";
import type { BatchDetail, TransactionItem } from "../../../types/batch-detail";
import { toast } from "sonner";
import { HexagonBadge } from "@/app/components/partials/common/hexagon-badge";
import { KeenIcon } from "@/components/keenicons";
import { mockBatchDetailData as draftBatchDetailData } from "../../../components/tables/draft/core/data/mock-data";
import { mockBatchDetailData as pendingApprovalBatchDetailData } from "../../../components/tables/pending-approval/core/data/mock-data";
import { mockBatchDetailData as approvalLogBatchDetailData } from "../../../components/tables/approval-log/core/data/mock-data";

interface DetailContentProps {
  params: Promise<{ id: string }>;
}

export function DetailContent({ params }: DetailContentProps) {
  const { id } = use(params);

  const batchData = useMemo(() => {
    if (draftBatchDetailData[id]) {
      return draftBatchDetailData[id];
    }
    if (pendingApprovalBatchDetailData[id]) {
      return pendingApprovalBatchDetailData[id];
    }
    if (approvalLogBatchDetailData[id]) {
      return approvalLogBatchDetailData[id];
    }
    return undefined;
  }, [id]);

  const batchDetail: BatchDetail | undefined = batchData?.batchDetail;
  const transactions: TransactionItem[] = batchData?.transactions || [];

  const handleSubmitForApproval = useCallback(() => {
    toast.success("Batch submitted for approval");
  }, []);

  const handleApprovePending = useCallback(() => {
    toast.success("Batch approved");
  }, []);

  const handleRejectPending = useCallback(() => {
    toast.success("Batch rejected");
  }, []);

  const handleDeleteTransactions = useCallback((selectedTransactions: TransactionItem[]) => {
    toast.success(`Deleted ${selectedTransactions.length} transaction(s)`);
  }, []);

  if (!batchDetail) {
    return (
      <Container>
        <div className="py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">Batch not found</p>
              <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const showPendingApprovalBanner = batchDetail.status === "pending-approval";

  return (
    <Container>
      <div className="py-6">
        <BatchDetailsHeader
          batchDetail={batchDetail}
          onSubmitForApproval={handleSubmitForApproval}
          onApprovePending={handleApprovePending}
          onRejectPending={handleRejectPending}
        />

        {showPendingApprovalBanner && (
          <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <HexagonBadge
                  stroke="stroke-yellow-600"
                  fill="fill-yellow-100"
                  badge={
                    <KeenIcon
                      icon="information"
                      style="outline"
                      className="text-2xl text-yellow-600"
                    />
                  }
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Pending Approval Request
                </h3>
                <p className="text-sm text-gray-600">
                  This request is awaiting review by a team member with approval permission
                </p>
              </div>
            </div>
          </div>
        )}

        <BatchDetailsCard batchDetail={batchDetail} />
        <TransactionListCard
          transactions={transactions}
          batchDetail={batchDetail}
          onDelete={handleDeleteTransactions}
        />
      </div>
    </Container>
  );
}


"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { HexagonBadge } from "@/app/components/partials/common/hexagon-badge";
import { PendingApprovalData } from "../../../tables/pending-approval/core/models";
import { KeenIcon } from "@/components/keenicons";
import { Copy } from "lucide-react";

interface PendingApprovalDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disbursement?: PendingApprovalData | null;
}

export function PendingApprovalDetailModal({
  open,
  onOpenChange,
  disbursement,
}: PendingApprovalDetailModalProps) {
  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  if (!disbursement) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Request Detail</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Select a pending approval request to view its details.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  const {
    totalTransferAmount,
    creationId,
    type,
    beneficiaryDetails,
    scheduledDate,
    createdBy,
    submittedDate,
    submittedTime,
  } = disbursement;

  const transferTypeLabel = type === "batch" ? "Batch Transfer" : "Single Transfer";
  const scheduledTransfer = scheduledDate || "-";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Request Detail
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 space-y-6 pb-6 items-center ">
          {/* Banner */}
          <div className="rounded-2xl border border-dashed border-2 border-yellow-600 bg-yellow-50 px-4 py-3 flex items-start gap-3">
            <HexagonBadge
              stroke="stroke-yellow-600"
              fill="fill-yellow-100"
              badge={
                <KeenIcon
                  icon="information"
                  style="outline"
                  className="text-yellow-600 text-2xl "
                />
              }
            />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm font-semibold text-grey-900">Pending Approval Request</p>
              <p className="text-sm text-grey-800">
                This request is awaiting review by a team member with approval permission
              </p>
            </div>
          </div>
          <Card className="p-6">
          <Card className="bg-gray-100 border-2 border-gray-300">
            <CardContent className="space-y-4 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
                    Transfer Amount
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-3xl font-bold text-foreground">
                    <span>{totalTransferAmount}</span>
                    <button
                      onClick={() => handleCopy(totalTransferAmount)}
                      className="rounded-full p-1 text-muted-foreground transition hover:bg-muted"
                      aria-label="Copy transfer amount"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div className="flex flex-col  gap-2">
                      <span className="font-medium text-muted-foreground">Creation ID</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{creationId}</span>
                        <button
                            onClick={() => handleCopy(creationId)}
                            className="rounded-full p-1 text-muted-foreground transition hover:bg-muted"
                            aria-label="Copy creation id"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="primary" appearance="outline" className="rounded-full">
                  {transferTypeLabel}
                </Badge>
              </div>
            </CardContent>
          </Card>

         
              <Table className="w-full [&_tr]:border-0 [&_td]:border-0 [&_tbody>tr:hover]:bg-transparent">
                <TableBody >
                  <DetailRow label="Benef. Bank Name" value={beneficiaryDetails?.bankName} />
                  <DetailRow label="Benef. Account Number" value={beneficiaryDetails?.accountNumber} />
                  <DetailRow label="Benef. Account Name" value={beneficiaryDetails?.accountName} />
                  <DetailRow label="Scheduled Transfer" value={scheduledTransfer} />
                </TableBody>
              </Table>
              <Table className="w-full [&_tr]:border-0 [&_td]:border-0 [&_tbody>tr:hover]:bg-transparent">
                <TableBody>
                  <DetailRow
                    label={
                      <div className="flex items-center gap-2">
                        <KeenIcon icon="user" style="outline" className="text-muted-foreground" />
                        <span>Requested by</span>
                      </div>
                    }
                    value={createdBy.email}
                  />
                  <DetailRow
                    label={
                      <div className="flex items-center gap-2">
                        <KeenIcon icon="calendar" style="outline" className="text-muted-foreground" />
                        <span>Requested Date</span>
                      </div>
                    }
                    value={
                      <span>
                        {submittedDate}, {submittedTime}
                      </span>
                    }
                  />
                </TableBody>
              </Table>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        
      </DialogFooter>
    </Dialog>
  );
}

interface DetailRowProps {
  label: string | React.ReactNode;
  value?: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <TableRow className="border-0 hover:bg-transparent">
      <TableCell className="w-1/3 text-sm text-muted-foreground">{label}</TableCell>
      <TableCell className="text-sm font-medium text-foreground">{value || "-"}</TableCell>
    </TableRow>
  );
}


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { KeenIcon } from "@/components/keenicons";
import type { BatchDetail } from "../../../types/batch-detail";
import { STATUS_BADGE_STYLES, FIELD_LABELS } from "../core/constants";
import { toast } from "sonner";

interface BatchDetailsCardProps {
  batchDetail: BatchDetail;
}

export function BatchDetailsCard({ batchDetail }: BatchDetailsCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getStatusBadgeStyle = (status: string) => {
    return STATUS_BADGE_STYLES[status as keyof typeof STATUS_BADGE_STYLES] || STATUS_BADGE_STYLES.uploaded;
  };

  const badgeStyle = getStatusBadgeStyle(batchDetail.status);
  const statusLabel = batchDetail.status === 'inquiry-process' 
    ? 'Inquiry Process'
    : batchDetail.status === 'pending-approval'
    ? 'Pending Approval'
    : batchDetail.status.charAt(0).toUpperCase() + batchDetail.status.slice(1).replace('-', ' ');

  const showValidInvalidBoxes = batchDetail.status === 'valid' || batchDetail.status === 'issue';

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Creation ID Section */}
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">{FIELD_LABELS.CREATION_ID}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {batchDetail.creationId}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(batchDetail.creationId)}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <KeenIcon icon="copy" style="outline" className="h-3 w-3" />
                </Button>
                <Badge
                    variant="primary"
                    appearance="outline"
                    className={`${badgeStyle.container} rounded-full`}
                    >
                    <div className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                    {statusLabel}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Boxes */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {/* Transfer Amount */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-xl font-medium text-gray-900 mb-1">
              {batchDetail.totalTransferAmount}
            </div>
            <div className="text-sm text-gray-500">{FIELD_LABELS.TRANSFER_AMOUNT}</div>
          </div>
          
          {/* Total Transaction */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-xl font-medium text-gray-900 mb-1">
              {batchDetail.totalTransaction}
            </div>
            <div className="text-sm text-gray-500">{FIELD_LABELS.TOTAL_TRANSACTION}</div>
          </div>

          {/* Valid/Invalid Boxes - Only show for valid and issue status */}
          {showValidInvalidBoxes && (
            <>
              {/* Valid Amount */}
              <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <KeenIcon icon="check-circle" style="outline" className="h-4 w-4 text-green-600" />
                  <div className="text-xl font-medium text-gray-900">
                    {batchDetail.validAmount || 'IDR 0'}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{FIELD_LABELS.VALID_AMOUNT}</div>
              </div>

              {/* Valid Transaction */}
              <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <KeenIcon icon="check-circle" style="outline" className="h-4 w-4 text-green-600" />
                  <div className="text-xl font-medium text-gray-900">
                    {batchDetail.validTransaction || 0}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{FIELD_LABELS.VALID_TRANSACTION}</div>
              </div>

              {/* Invalid Amount */}
              <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <KeenIcon icon="cross-circle" style="outline" className="h-4 w-4 text-red-600" />
                  <div className="text-xl font-medium text-gray-900">
                    {batchDetail.invalidAmount || 'IDR 0'}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{FIELD_LABELS.INVALID_AMOUNT}</div>
              </div>

              {/* Invalid Transaction */}
              <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <KeenIcon icon="cross-circle" style="outline" className="h-4 w-4 text-red-600" />
                  <div className="text-xl font-medium text-gray-900">
                    {batchDetail.invalidTransaction || 0}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{FIELD_LABELS.INVALID_TRANSACTION}</div>
              </div>
            </>
          )}
        </div>

        <Table className="border-0 max-w-xl">
          <TableBody>
            {batchDetail.scheduledDate && (
              <TableRow className="border-0 hover:!bg-transparent">
                <TableCell className="w-8 p-0 pr-3 align-top">
                  <div className="mt-0.5">
                    <KeenIcon icon="calendar" style="outline" className="h-5 w-5 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500 font-normal p-0 pr-4 align-top">
                  {FIELD_LABELS.SCHEDULED_DATE}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 p-0 align-top">
                  {batchDetail.scheduledDate}, {batchDetail.scheduledTime}
                </TableCell>
              </TableRow>
            )}
            
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-8 p-0 pr-3 align-top">
                <div className="mt-0.5">
                  <KeenIcon icon="user" style="outline" className="h-5 w-5 text-gray-400" />
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500 font-normal p-0 pr-4 align-top">
                {FIELD_LABELS.CREATED_BY}
              </TableCell>
              <TableCell className="text-sm font-medium text-gray-900 p-0 align-top">
                {batchDetail.createdBy.email}
              </TableCell>
            </TableRow>

            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-8 p-0 pr-3 align-top">
                <div className="mt-0.5">
                  <KeenIcon icon="calendar" style="outline" className="h-5 w-5 text-gray-400" />
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500 font-normal p-0 pr-4 align-top">
                {FIELD_LABELS.CREATED_DATE}
              </TableCell>
              <TableCell className="text-sm font-medium text-gray-900 p-0 align-top">
                {batchDetail.createdDate}, {batchDetail.createdTime}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


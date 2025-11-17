"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PayOutDetailTransaction } from "../../core/_models";

interface StatusCallbackCardProps {
  transaction: PayOutDetailTransaction;
  onViewResponse?: () => void;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "success";
    case "failed":
      return "destructive";
    case "pending":
      return "warning";
    default:
      return "secondary";
  }
};

export function StatusCallbackCard({
  transaction,
  onViewResponse,
}: StatusCallbackCardProps) {
  return (
    <Card className="w-96">
      <CardHeader className="px-7 py-5 border-b border-gray-100 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Status & Callback
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewResponse}
          className="px-2.5 py-2"
        >
          <div className="w-3.5 h-3.5 mr-1">
            <svg viewBox="0 0 14 14" fill="none" className="w-full h-full">
              <path
                d="M2.5 2.5H11.5V11.5H2.5V2.5Z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          View Response
        </Button>
      </CardHeader>
      <CardContent className="px-7 pb-7 pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Status
              </div>
            </div>
            <Badge
              variant={getStatusBadgeVariant(transaction.responseStatus)}
              appearance="light"
              size="md"
              className="px-2.5 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
              {transaction.responseStatus}
            </Badge>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Reason
              </div>
            </div>
            <div className="text-sm font-normal text-slate-800 leading-none">
              {transaction.responseReason}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Response
              </div>
            </div>
            <div className="text-sm font-normal text-slate-800 leading-none">
              {transaction.responseCode}
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Message
              </div>
            </div>
            <div className="flex-1 text-sm font-normal text-slate-800 leading-snug">
              {transaction.responseMessage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

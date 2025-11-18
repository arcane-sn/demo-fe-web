"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";

export interface StatusCallbackData {
  status: string;
  responseCode?: string;
  responseMessage?: string;
  responseReason?: string;
  hostResponseCode?: string;
  hostResponseDesc?: string;
  chargebackRefundNotes?: string;
}

interface StatusCallbackCardProps {
  data: StatusCallbackData;
  onResendCallback?: () => void;
  onViewPaymentReceipt?: () => void;
  onViewResponse?: () => void;
}

export function StatusCallbackCard({
  data,
  onResendCallback,
  onViewPaymentReceipt,
  onViewResponse,
}: StatusCallbackCardProps) {
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300 flex justify-between items-center">
        <div className="text-h-18-18-600 text-dark">Status & Callback</div>
        {onResendCallback && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResendCallback}
            className="px-3 py-2 bg-light rounded-md border border-gray-300 text-gray-600"
          >
            <KeenIcon icon="notification-status" className="w-4 h-4" />
            <span className="text-b-14-14-500 ml-2">Resend Callback</span>
          </Button>
        )}
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Status</div>
          <Badge
            variant="success"
            className="px-3 py-2 bg-success-light rounded-full border border-success"
          >
            <span className="text-b-13-14-500 text-success">
              {data.status}
            </span>
          </Badge>
        </div>

        {onViewPaymentReceipt && (
          <div className="flex items-center gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">
              Payment Receipt
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewPaymentReceipt}
              className="px-2 py-2 bg-light rounded-md border border-gray-300 text-gray-600"
            >
              <KeenIcon icon="eye" className="w-3 h-3" />
              <span>View</span>
            </Button>
          </div>
        )}

        {data.responseCode && (
          <div className="flex items-center gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">Response</div>
            <div className="flex items-center gap-3">
              <Badge
                variant="success"
                className="px-2 py-1 bg-success-light border border-success rounded"
              >
                <span className="text-b-12-12-500 text-success">
                  {data.responseCode}
                </span>
              </Badge>
              {onViewResponse && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewResponse}
                  className="px-2 py-2 bg-light rounded-md border border-gray-300 text-gray-600"
                >
                  <KeenIcon icon="eye" className="w-3 h-3" />
                  <span>Detail</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {data.responseMessage && (
          <div className="flex gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">Message</div>
            <div className="flex-1 text-b-14-22-500 text-dark">
              {data.responseMessage}
            </div>
          </div>
        )}

        {data.responseCode && (
          <div className="flex gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">
              Response Code/Desc
            </div>
            <div className="flex-1 text-b-14-22-500 text-dark">
              {data.responseCode}
              {data.responseReason && `/${data.responseReason}`}
            </div>
          </div>
        )}

        {data.hostResponseCode && (
          <div className="flex gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">
              Host Response Code/Desc
            </div>
            <div className="flex-1 text-b-14-22-500 text-dark">
              {data.hostResponseCode}
              {data.hostResponseDesc && `/${data.hostResponseDesc}`}
            </div>
          </div>
        )}

        {data.chargebackRefundNotes && (
          <div className="flex gap-3">
            <div className="w-32 text-b-13-20-400 text-gray-500">
              Chargeback/Refund Notes
            </div>
            <div className="flex-1 text-b-14-22-500 text-dark">
              {data.chargebackRefundNotes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


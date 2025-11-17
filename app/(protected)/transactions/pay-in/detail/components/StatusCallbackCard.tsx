import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";
import { TransactionDetail } from "../core/_models";

interface StatusCallbackCardProps {
  transaction: TransactionDetail;
  onResendCallback: () => void;
}

export function StatusCallbackCard({
  transaction,
  onResendCallback,
}: StatusCallbackCardProps) {
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300 flex justify-between items-center">
        <div className="text-h-18-18-600 text-dark">Status & Callback</div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResendCallback}
          className="px-3 py-2 bg-light rounded-md border border-gray-300 text-gray-600"
        >
          <KeenIcon icon="notification-status" className="w-4 h-4" />
          <span className="text-b-14-14-500 ml-2">Resend Callback</span>
        </Button>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Status</div>
          <Badge
            variant="success"
            className="px-3 py-2 bg-success-light rounded-full border border-success"
          >
            <span className="text-b-13-14-500 text-success">
              {transaction.status}
            </span>
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Payment Receipt
          </div>
          <Button
            variant="outline"
            size="sm"
            className="px-2 py-2 bg-light rounded-md border border-gray-300 text-gray-600"
          >
            <KeenIcon icon="eye" className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Response</div>
          <div className="flex items-center gap-3">
            <Badge
              variant="success"
              className="px-2 py-1 bg-success-light border border-success rounded"
            >
              <span className="text-b-12-12-500 text-success">200</span>
            </Badge>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Message</div>
          <div className="flex-1 text-b-14-22-500 text-dark">
            Success Transfer to beneficiary account
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Response Code/Desc
          </div>
          <div className="flex-1 text-b-14-22-500 text-dark">
            00/Approved: The transaction was successful.
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Host Response Code/Desc
          </div>
          <div className="flex-1 text-b-14-22-500 text-dark">00/Approved</div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Chargeback/Refund Notes
          </div>
          <div className="flex-1 text-b-14-22-500 text-dark">00/Approved</div>
        </div>
      </div>
    </div>
  );
}

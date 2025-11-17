import { TransactionDetail } from "../core/_models";

interface TimestampsCardProps {
  transaction: TransactionDetail;
}

export function TimestampsCard({ transaction }: TimestampsCardProps) {
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">Timestamps</div>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Transaction Date
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-b-14-22-500 text-dark">
              {transaction.transactionDate}
            </div>
            <div className="text-b-13-14-400 text-gray-500">
              {transaction.transactionTime}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Paid Date</div>
          <div className="flex flex-col gap-1">
            <div className="text-b-14-22-500 text-dark">
              {transaction.paidDate}
            </div>
            <div className="text-b-13-14-400 text-gray-500">
              {transaction.paidTime}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">
            Expiration Date
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-b-14-22-500 text-dark">
              {transaction.expirationDate}
            </div>
            <div className="text-b-13-14-400 text-gray-500">
              {transaction.expirationTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

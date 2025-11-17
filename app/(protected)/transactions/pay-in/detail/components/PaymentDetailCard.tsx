import { TransactionDetail } from "../core/_models";

interface PaymentDetailCardProps {
  transaction: TransactionDetail;
}

export function PaymentDetailCard({ transaction }: PaymentDetailCardProps) {
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">Payment Detail</div>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Amount</div>
          <div className="text-b-14-22-500 text-dark">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transaction.amount)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">Service Fee</div>
          <div className="text-b-14-22-500 text-dark">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transaction.serviceFee)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-13-20-400 text-gray-500">MDR</div>
          <div className="text-b-14-22-500 text-dark">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transaction.mdr)}
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
        <div className="flex items-center gap-3">
          <div className="w-32 text-b-14-22-600 text-dark">Total Amount</div>
          <div className="text-b-16-16-600 text-dark">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(transaction.totalAmount)}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayOutDetailTransaction } from "../../core/_models";

interface TransferDetailCardProps {
  transaction: PayOutDetailTransaction;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function TransferDetailCard({ transaction }: TransferDetailCardProps) {
  return (
    <Card>
      <CardHeader className="px-7 py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Transfer Detail
        </CardTitle>
      </CardHeader>
      <CardContent className="px-7 pb-7 pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-44 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Transfer Amount
              </div>
            </div>
            <div className="text-sm font-normal text-slate-800 leading-none">
              {formatCurrency(transaction.transferAmount)}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-44 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Admin Fee
              </div>
            </div>
            <div className="text-sm font-normal text-slate-800 leading-none">
              {formatCurrency(transaction.adminFee)}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex items-center gap-2.5">
            <div className="w-44 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-900 leading-none">
                Total Transfer Amount
              </div>
            </div>
            <div className="text-sm font-normal text-slate-800 leading-none">
              {formatCurrency(transaction.totalTransferAmount)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

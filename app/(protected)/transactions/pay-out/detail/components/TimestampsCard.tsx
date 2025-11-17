"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayOutDetailTransaction } from "../../core/_models";

interface TimestampsCardProps {
  transaction: PayOutDetailTransaction;
}

export function TimestampsCard({ transaction }: TimestampsCardProps) {
  return (
    <Card>
      <CardHeader className="px-7 py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Timestamps
        </CardTitle>
      </CardHeader>
      <CardContent className="px-7 pb-7 pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Transaction Date
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-normal text-slate-900 leading-none">
                {transaction.transactionDate}
              </div>
              <div className="text-xs font-normal text-slate-600 leading-3">
                {transaction.transactionTime}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Updated Date
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-normal text-slate-900 leading-none">
                {transaction.updatedDate}
              </div>
              <div className="text-xs font-normal text-slate-600 leading-3">
                {transaction.updatedTime}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-28 flex items-center gap-2.5">
              <div className="text-sm font-normal text-slate-500 leading-none">
                Served Date
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-normal text-slate-900 leading-none">
                {transaction.servedDate}
              </div>
              <div className="text-xs font-normal text-slate-600 leading-3">
                {transaction.servedTime}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

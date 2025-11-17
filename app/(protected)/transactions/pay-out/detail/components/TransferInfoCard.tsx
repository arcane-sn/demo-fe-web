"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayOutDetailTransaction } from "../../core/_models";
import { getTransferInfoData } from "../core/_helpers";

interface TransferInfoCardProps {
  transaction: PayOutDetailTransaction;
}

export function TransferInfoCard({ transaction }: TransferInfoCardProps) {
  const transferInfoData = getTransferInfoData(transaction);

  return (
    <Card>
      <CardHeader className="py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Transfer Info
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-7 pt-5">
        <div className="flex flex-col gap-5">
          {transferInfoData.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <div className="w-28 flex items-center gap-2.5">
                <div className="text-sm font-normal text-slate-500 leading-none">
                  {item.label}
                </div>
              </div>
              <div className="text-sm font-normal text-slate-800 leading-none">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

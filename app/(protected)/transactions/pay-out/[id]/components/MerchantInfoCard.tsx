"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { PayOutDetailTransaction } from "../../core/_models";
import { getMerchantInfoData } from "../core/_helpers";

interface MerchantInfoCardProps {
  transaction: PayOutDetailTransaction;
}

export function MerchantInfoCard({ transaction }: MerchantInfoCardProps) {
  const merchantInfoData = getMerchantInfoData(transaction);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader className="py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Merchant Info
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-7 pt-5">
        <div className="flex flex-col gap-5">
          {merchantInfoData.map((item, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <div className="w-28 flex items-center gap-2.5">
                <div className="text-sm font-normal text-slate-500 leading-none">
                  {item.label}
                </div>
              </div>
              <div className="flex-1 flex items-start gap-1.5">
                <div className="flex-1 text-sm font-normal text-slate-800 leading-none">
                  {item.value}
                </div>
                {item.copyable && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(item.value)}
                    className="size-4 p-0 hover:bg-transparent"
                  >
                    <Copy className="size-4 text-slate-400" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

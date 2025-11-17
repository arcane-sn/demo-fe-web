"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  PayOutDetailTransaction,
  PayOutDetailInfoItem,
} from "../../core/_models";

interface TransactionDetailsCardProps {
  title: string;
  items: PayOutDetailInfoItem[];
}

export function TransactionDetailsCard({
  title,
  items,
}: TransactionDetailsCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader className="py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-7 pt-5">
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2.5 min-h-4">
                <div className="w-44 flex items-center gap-2.5">
                  <div className="text-sm font-normal text-slate-500 leading-none">
                    {item.label}
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-sm font-normal text-slate-800 leading-none">
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
              {index < items.length - 1 && (
                <div className="h-px bg-gray-100 mt-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

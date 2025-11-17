"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { PayOutDetailInfoItem } from "../../core/_models";

interface InfoCardProps {
  title: string;
  items: PayOutDetailInfoItem[];
  className?: string;
}

const getBadgeVariant = (variant: string) => {
  switch (variant) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "destructive":
      return "destructive";
    case "info":
      return "info";
    case "primary":
      return "primary";
    default:
      return "secondary";
  }
};

export function InfoCard({ title, items, className }: InfoCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className={className}>
      <CardHeader className="px-7 py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-7 pb-7 pt-0">
        <div className="flex flex-col gap-4 pt-5">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2.5 min-h-4">
                <div className="w-44 flex items-center gap-2.5">
                  <div className="text-sm font-normal text-slate-500 leading-none">
                    {item.label}
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  {item.badge ? (
                    <Badge
                      variant={getBadgeVariant(item.badge.variant)}
                      appearance="light"
                      size="sm"
                      className="px-1.5 py-1"
                    >
                      <div className="w-1 h-1 rounded-full bg-current mr-1" />
                      {item.badge.label}
                    </Badge>
                  ) : (
                    <div className="text-sm font-normal text-slate-800 leading-none">
                      {item.value}
                    </div>
                  )}
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

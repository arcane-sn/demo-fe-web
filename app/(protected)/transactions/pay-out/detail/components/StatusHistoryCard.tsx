"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PayOutStatusHistoryItem } from "../../core/_models";

interface StatusHistoryCardProps {
  statusHistory: PayOutStatusHistoryItem[];
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

const getBadgeAppearance = (variant: string) => {
  switch (variant) {
    case "primary":
      return "default";
    default:
      return "light";
  }
};

export function StatusHistoryCard({ statusHistory }: StatusHistoryCardProps) {
  return (
    <Card>
      <CardHeader className="px-7 py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Status History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2.5 pb-7 pt-0">
        <div className="flex flex-col">
          {statusHistory.map((item, index) => (
            <div key={item.id} className="flex items-start gap-2.5">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 bg-stone-50 rounded-full border border-zinc-200 flex items-center justify-center">
                  <div className="w-4 h-4">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-full h-full"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="14"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-slate-400"
                      />
                    </svg>
                  </div>
                </div>
                {index < statusHistory.length - 1 && (
                  <div className="w-px flex-1 bg-zinc-200 min-h-20" />
                )}
              </div>

              {/* Content */}
              <div className="w-72 pb-5 flex flex-col gap-2.5">
                <div className="h-9 flex flex-col justify-center gap-1.5">
                  <div className="text-sm font-normal text-slate-900 leading-none">
                    {item.status}
                  </div>
                  <div className="text-xs font-normal text-slate-500 leading-3">
                    {item.timestamp}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-100 flex flex-col gap-2.5">
                  <Badge
                    variant={getBadgeVariant(item.badge.variant)}
                    appearance={getBadgeAppearance(item.badge.variant)}
                    size="md"
                    className="px-2.5 py-2 self-start"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                    {item.badge.label}
                  </Badge>

                  <div className="h-9 flex flex-col justify-center gap-1.5">
                    <div className="text-xs font-normal text-slate-900 leading-none">
                      {item.description}
                    </div>
                    {item.details && (
                      <div className="text-xs font-normal text-slate-500 leading-3">
                        {item.details}
                      </div>
                    )}
                  </div>

                  {item.hasDetail && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2.5 py-2 self-start"
                    >
                      <div className="w-3.5 h-3.5 mr-1">
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          className="w-full h-full"
                        >
                          <path
                            d="M2.5 2.5H11.5V11.5H2.5V2.5Z"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                        </svg>
                      </div>
                      {item.status === "Disbursed"
                        ? "Disbursed Detail"
                        : "Disbursement Detail"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { KeenIcon } from "@/components/keenicons";
import type { StatusHistoryItem, PayInStatusHistoryItem, PayOutStatusHistoryItem } from "./types";

interface StatusHistoryCardProps {
  statusHistory: StatusHistoryItem[];
}

function isPayInItem(item: StatusHistoryItem): item is PayInStatusHistoryItem {
  return "badgeType" in item && typeof item.badge === "string";
}

function isPayOutItem(item: StatusHistoryItem): item is PayOutStatusHistoryItem {
  return "id" in item && typeof item.badge === "object";
}

const getBadgeStyles = (badgeType: PayInStatusHistoryItem["badgeType"]) => {
  switch (badgeType) {
    case "primary":
      return {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-500",
        dot: "bg-blue-500",
      };
    case "success":
      return {
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-500",
        dot: "bg-green-500",
      };
    case "warning":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        text: "text-yellow-500",
        dot: "bg-yellow-500",
      };
    case "info":
      return {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-500",
        dot: "bg-blue-500",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-500",
        text: "text-gray-500",
        dot: "bg-gray-500",
      };
  }
};

const getBadgeTypeFromVariant = (variant: string): PayInStatusHistoryItem["badgeType"] => {
  switch (variant) {
    case "primary":
      return "primary";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "info":
      return "info";
    case "destructive":
      return "destructive";
    default:
      return "secondary";
  }
};

export function StatusHistoryCard({ statusHistory }: StatusHistoryCardProps) {
  const convertedHistory = statusHistory.map((item, index) => {
    if (isPayOutItem(item)) {
      return {
        status: item.status,
        date: item.timestamp,
        badge: item.badge.label,
        badgeType: getBadgeTypeFromVariant(item.badge.variant),
        description: item.description,
        note: item.details || "",
        hasDetail: item.hasDetail,
        detailText: item.hasDetail ? "View Detail" : undefined,
      } as PayInStatusHistoryItem;
    }
    return item as PayInStatusHistoryItem;
  });

  const payInItems = convertedHistory;
  return (
    <div className="bg-light rounded-xl border border-gray-300 shadow-sm">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-300">
        <div className="text-h-18-18-600 text-dark">Status History</div>
      </div>

      {/* Timeline Content */}
      <div className="px-8 pb-8 pt-5">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-0">
            {payInItems.map((item, index) => {
              const badgeStyles = getBadgeStyles(item.badgeType);
              const isLast = index === payInItems.length - 1;

              return (
                <div key={index} className="relative flex gap-4 pb-6">
                  {/* Timeline Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-300">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    {!isLast && (
                      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-px h-20 bg-gray-300"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pt-0">
                    {/* Header: Status Name + Date */}
                    <div className="mb-2">
                      <div className="flex flex-col items-start gap-1">
                        <span>{item.status}</span>
                        <span className="text-b-13-14-400 text-gray-500">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Detail Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      {/* Status Badge */}
                      <div className="mb-3">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${badgeStyles.bg} ${badgeStyles.border} border`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${badgeStyles.dot}`}
                          ></div>
                          <span
                            className={`text-xs font-medium ${badgeStyles.text}`}
                          >
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-1">
                        <span className="text-b-14-22-500 text-dark">
                          {item.description}
                        </span>
                      </div>

                      {/* Note */}
                      <div className="mb-3">
                        <span className="text-b-13-14-400 text-gray-500">
                          {item.note}
                        </span>
                      </div>

                      {/* Detail Button */}
                      {item.hasDetail && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-fit px-3 py-1.5 bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          <KeenIcon
                            icon="magnifier"
                            className="w-3.5 h-3.5 mr-1.5"
                          />
                          <span className="text-b-13-14-500">
                            {item.detailText}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


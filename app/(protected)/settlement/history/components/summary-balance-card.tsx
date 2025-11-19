"use client";

import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";

interface SummaryBalanceCardProps {
  icon: ReactNode;
  value: string;
  title: string;
  showInfoIcon?: boolean;
}

export function SummaryBalanceCard({
  icon,
  value,
  title,
  showInfoIcon = true,
}: SummaryBalanceCardProps) {
  return (
    <div className="flex items-center justify-start gap-5 min-w-80 border-r border-gray-200">
      {icon}
      <div className="flex flex-col items-start justify-start">
        <div className="text-slate-900 text-2xl font-semibold leading-relaxed">
          {value}
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="text-slate-600 text-sm font-normal leading-none">
            {title}
          </div>
          {showInfoIcon && <InfoIcon className="text-gray-500 w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}

export default SummaryBalanceCard;


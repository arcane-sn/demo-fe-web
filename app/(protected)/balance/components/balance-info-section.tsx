"use client";

import React from "react";

export interface BalanceInfoSectionProps {
  activeBalance: string | number;
  pendingBalance: string | number;
  holdBalance: string | number;
  className?: string;
}

const formatCurrency = (value: string | number): string => {
  if (typeof value === "number") {
    return `IDR ${value.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/,/g, ".")}`;
  }
  // If already formatted string, return as is
  return value;
};

const BalanceInfoSection = ({
  activeBalance,
  pendingBalance,
  holdBalance,
  className = "",
}: BalanceInfoSectionProps) => {
  return (
    <div className={`mt-5 ${className}`}>
      <div className="w-96 inline-flex justify-start items-center gap-2.5">
        <div className="w-48 flex justify-start items-center gap-2.5">
          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
            Active Balance
          </div>
        </div>
        <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
          {formatCurrency(activeBalance)}
        </div>
      </div>
      <div className="w-96 inline-flex justify-start items-center gap-2.5">
        <div className="w-48 flex justify-start items-center gap-2.5">
          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
            Pending Balance
          </div>
        </div>
        <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
          {formatCurrency(pendingBalance)}
        </div>
      </div>
      <div className="w-96 inline-flex justify-start items-center gap-2.5">
        <div className="w-48 flex justify-start items-center gap-2.5">
          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
            Hold Balance
          </div>
        </div>
        <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
          {formatCurrency(holdBalance)}
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoSection;



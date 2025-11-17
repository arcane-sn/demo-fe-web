"use client";

import React from "react";

export interface MerchantInfoCardProps {
  merchantName: string;
  companyName: string;
  clientId: string;
  parentId: string;
  avatar?: string | React.ReactNode;
  className?: string;
}

const MerchantInfoCard = ({
  merchantName,
  companyName,
  clientId,
  parentId,
  avatar,
  className = "",
}: MerchantInfoCardProps) => {
  // Generate default avatar: first 2 letters of merchant name
  const getDefaultAvatar = () => {
    const initials = merchantName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className="size-6 relative text-2sm flex items-center justify-center">
        {initials}
      </div>
    );
  };

  // Determine what to render as avatar
  const renderAvatar = () => {
    if (avatar) {
      if (typeof avatar === "string") {
        return (
          <div className="size-6 relative text-2sm flex items-center justify-center">
            {avatar}
          </div>
        );
      }
      return avatar;
    }
    return getDefaultAvatar();
  };

  return (
    <div
      className={`w-full self-stretch p-3 bg-blue-50 rounded-lg outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-start gap-2.5 ${className}`}
    >
      <div className="size-9 bg-white rounded-[72px] shadow-[0px_1.0800000429153442px_1.440000057220459px_0px_rgba(0,0,0,0.03)] outline-[0.72px] outline-offset-[-0.72px] outline-green-500/20 flex justify-center items-center gap-1">
        {renderAvatar()}
      </div>
      <div className="inline-flex flex-col justify-center items-start gap-3">
        <div className="flex flex-col justify-start items-start gap-1.5">
          <div className="justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
            {merchantName}
          </div>
          <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-3">
            {companyName}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-1.5">
          <div className="inline-flex justify-start items-center gap-1.5">
            <div className="justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-3">
              Client ID
            </div>
            <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-3">
              {clientId}
            </div>
          </div>
          <div className="inline-flex justify-start items-center gap-1.5">
            <div className="justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-3">
              Parent ID
            </div>
            <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-3">
              {parentId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantInfoCard;


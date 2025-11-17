"use client";

import React from "react";
import { RoleListProps } from "../../core/types/role-list";

interface RoleLogSectionProps {
  roleData: RoleListProps;
}

const RoleLogSection: React.FC<RoleLogSectionProps> = ({ roleData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTimeOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <div className="bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.03)] rounded-xl border border-[#F1F1F4] flex flex-col gap-5">
      {/* Header */}
      <div className="h-14 px-[30px] py-5 border-b border-[#F1F1F4] flex items-center">
        <div className="text-[#071437] text-base font-semibold leading-4">
          Log
        </div>
      </div>

      {/* Content */}
      <div className="pb-[30px] flex flex-col gap-4">
        {/* Assigned Users */}
        <div className="h-4 px-[30px] flex items-center gap-[10px]">
          <div className="w-[180px] flex items-center gap-[10px]">
            <div className="text-[#78829D] text-sm font-normal leading-[14px]">
              Assigned Users
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="text-[#252F4A] text-sm font-normal leading-[14px]">
              {roleData.asignUser} Users
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F1F1F4]" />

        {/* Last Update */}
        <div className="px-[30px] flex flex-col gap-[10px]">
          <div className="flex items-start gap-[10px]">
            <div className="w-[180px] flex items-center gap-[10px]">
              <div className="text-[#78829D] text-sm font-normal leading-[14px]">
                Last Update
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="text-[#071437] text-sm font-normal leading-[14px]">
                {formatDate(roleData.updatedAt)}
              </div>
              <div className="text-[#4B5675] text-[11px] font-normal leading-3">
                {formatTimeOnly(roleData.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Updated by */}
        <div className="h-4 px-[30px] flex items-center gap-[10px]">
          <div className="w-[180px] flex items-center gap-[10px]">
            <div className="text-[#78829D] text-sm font-normal leading-[14px]">
              Updated by
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="text-[#252F4A] text-sm font-normal leading-[14px]">
              {roleData.updatedBy}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F1F1F4]" />

        {/* Created Date */}
        <div className="px-[30px] flex flex-col gap-[10px]">
          <div className="flex items-start gap-[10px]">
            <div className="w-[180px] flex items-center gap-[10px]">
              <div className="text-[#78829D] text-sm font-normal leading-[14px]">
                Created Date
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="text-[#071437] text-sm font-normal leading-[14px]">
                {formatDate(roleData.createdAt)}
              </div>
              <div className="text-[#4B5675] text-[11px] font-normal leading-3">
                {formatTimeOnly(roleData.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Created by */}
        <div className="h-4 px-[30px] flex items-center gap-[10px]">
          <div className="w-[180px] flex items-center gap-[10px]">
            <div className="text-[#78829D] text-sm font-normal leading-[14px]">
              Created by
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="text-[#252F4A] text-sm font-normal leading-[14px]">
              {roleData.createdBy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleLogSection;

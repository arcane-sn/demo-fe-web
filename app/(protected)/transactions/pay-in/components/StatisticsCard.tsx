"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatisticsCardItem {
  number: string;
  label: string;
}

interface StatisticsCardProps {
  items: StatisticsCardItem[];
  seeDetailText?: string;
  onSeeDetail?: () => void;
}

export function StatisticsCard({
  items,
  seeDetailText = "See Detail",
  onSeeDetail,
}: StatisticsCardProps) {
  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-0">
        {/* Statistics Section */}
        <div className="px-8 py-6">
          <div className="flex lg:px-2 py-1.5 gap-2">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                  <span className="text-dark text-2xl lg:text-2xl leading-none font-semibold">
                    {item.number}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {item.label}
                  </span>
                </div>
                {index < items.length - 1 && (
                  <span className="border-e border-e-gray-200 my-1"></span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200"></div>

        {/* See Detail Link */}
        <div className="px-8 py-4 flex flex-col items-center gap-1">
          <button
            onClick={onSeeDetail}
            className="text-primary text-sm hover:text-blue-700 transition-colors cursor-pointer"
          >
            {seeDetailText}
          </button>
          <div className="w-15 h-px border-b border-dashed border-blue-600"></div>
        </div>
      </CardContent>
    </Card>
  );
}


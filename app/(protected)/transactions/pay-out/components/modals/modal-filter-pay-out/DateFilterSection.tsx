"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { PAY_OUT_DATE_FILTER_OPTIONS } from "../../../core/_consts";

interface DateFilterSectionProps {
  onClear: () => void;
}

export function DateFilterSection({ onClear }: DateFilterSectionProps) {
  const [dateType, setDateType] = useState("transaction");
  const [dateRange, setDateRange] = useState("01/12/2025 - 31/12/2025");

  return (
    <div className="self-stretch py-2.5 flex flex-col justify-center items-start gap-5">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-none">
          Date Filter
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="px-0.5 py-1 text-rose-500 text-xs font-medium hover:text-rose-600 hover:bg-rose-50"
        >
          Clear
        </Button>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <Select value={dateType} onValueChange={setDateType}>
          <SelectTrigger className="self-stretch px-3 py-2.5 bg-neutral-50 rounded-md  text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAY_OUT_DATE_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-full px-3 py-0 bg-neutral-50 rounded-md inline-flex justify-between items-center">
          <Input
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none focus-visible:outline-none bg-transparent p-0 text-xs text-slate-800 outline-none shadow-none"
            placeholder="Select date range"
          />
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

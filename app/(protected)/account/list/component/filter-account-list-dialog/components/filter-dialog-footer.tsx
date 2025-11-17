"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface FilterDialogFooterProps {
  onReset: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const FilterDialogFooter: React.FC<FilterDialogFooterProps> = ({
  onReset,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="px-5 flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        className="px-4 py-3.25 bg-[#FFEEF3] border-[rgba(248,40,90,0.20)] text-[#F8285A] text-[13px] font-medium leading-[14px] hover:bg-[#FFEEF3]/80"
        onClick={onReset}
      >
        Reset to Default
      </Button>
      <div className="flex items-center gap-2.5">
        <Button
          type="button"
          variant="outline"
          className="px-4 py-3.25 bg-white border-[#DBDFE9] text-[#4B5675] text-[13px] font-medium leading-[14px]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-7.5 py-3.25 bg-[#1B84FF] text-white text-[13px] font-medium leading-[14px] hover:bg-[#1B84FF]/90"
          onClick={onSubmit}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterDialogFooter;

"use client";

import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterDialogHeaderProps {
  onClose: () => void;
}

const FilterDialogHeader: React.FC<FilterDialogHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F1F4]">
      <DialogTitle className="text-[#071437] text-[14px] font-semibold leading-[14px]">
        Filter
      </DialogTitle>
      <Button
        variant="ghost"
        size="sm"
        className="p-1.5 h-auto hover:bg-gray-100 rounded-md"
        onClick={onClose}
      >
        <X className="w-[18px] h-[18px] text-[#99A1B7]" />
      </Button>
    </div>
  );
};

export default FilterDialogHeader;

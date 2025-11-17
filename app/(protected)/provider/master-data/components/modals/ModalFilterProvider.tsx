"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { FilterSectionGeneric } from "@/app/(protected)/transactions/components/FilterSectionGeneric";
import { DateFilterSection } from "@/app/(protected)/transactions/components/DateFilterSection";
import { CheckboxOption } from "@/app/(protected)/transactions/components/CheckboxList";
import { Separator } from "@/components/ui/separator";

interface ModalFilterProviderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalFilterProvider = ({
  open,
  onOpenChange,
}: ModalFilterProviderProps) => {
  const [selectedProviderTypes, setSelectedProviderTypes] = useState<string[]>(
    []
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateFilter] = useState("Registered Date");
  const [dateRange, setDateRange] = useState("01/12/2025 - 31/12/2025");

  // Provider Type options with checked state
  const providerTypeOptions: CheckboxOption[] = [
    { id: "QR", label: "QR", checked: selectedProviderTypes.includes("QR") },
    { id: "VA", label: "VA", checked: selectedProviderTypes.includes("VA") },
    {
      id: "e-Wallet",
      label: "e-Wallet",
      checked: selectedProviderTypes.includes("e-Wallet"),
    },
    {
      id: "Card",
      label: "Card",
      checked: selectedProviderTypes.includes("Card"),
    },
    {
      id: "Disbursement",
      label: "Disbursement",
      checked: selectedProviderTypes.includes("Disbursement"),
    },
  ];

  // Status options with checked state
  const statusOptions: CheckboxOption[] = [
    {
      id: "Active",
      label: "Active",
      checked: selectedStatuses.includes("Active"),
    },
    {
      id: "Inactive",
      label: "Inactive",
      checked: selectedStatuses.includes("Inactive"),
    },
  ];

  const handleProviderTypeChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedProviderTypes([...selectedProviderTypes, optionId]);
    } else {
      setSelectedProviderTypes(
        selectedProviderTypes.filter((t) => t !== optionId)
      );
    }
  };

  const handleStatusChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, optionId]);
    } else {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== optionId));
    }
  };

  const handleSelectAllProviderTypes = () => {
    setSelectedProviderTypes(providerTypeOptions.map((option) => option.id));
  };

  const handleClearProviderTypes = () => {
    setSelectedProviderTypes([]);
  };

  const handleSelectAllStatuses = () => {
    setSelectedStatuses(statusOptions.map((option) => option.id));
  };

  const handleClearStatuses = () => {
    setSelectedStatuses([]);
  };

  const handleClearDateFilter = () => {
    setDateRange("");
  };

  const handleResetToDefault = () => {
    setSelectedProviderTypes([]);
    setSelectedStatuses([]);
    setDateRange("01/12/2025 - 31/12/2025");
  };

  const handleApplyFilter = () => {
    console.log("Applied filters:", {
      providerTypes: selectedProviderTypes,
      statuses: selectedStatuses,
      dateFilter,
      dateRange,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="">Filter</DialogTitle>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="p-0 py-5 flex flex-col gap-5 border-t border-b border-gray-200">
          {/* Date Filter Section */}
          <DateFilterSection onClear={handleClearDateFilter} />

          {/* Separator */}
          <Separator />

          {/* Provider Type Section */}
          <FilterSectionGeneric
            title="Provider Type"
            options={providerTypeOptions}
            onOptionChange={handleProviderTypeChange}
            onSelectAll={handleSelectAllProviderTypes}
            onClear={handleClearProviderTypes}
          />

          {/* Separator */}
          <Separator />

          {/* Provider Status Section */}
          <FilterSectionGeneric
            title="Provider Status"
            options={statusOptions}
            onOptionChange={handleStatusChange}
            onSelectAll={handleSelectAllStatuses}
            onClear={handleClearStatuses}
          />
        </DialogBody>

        {/* Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Apply Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFilterProvider;

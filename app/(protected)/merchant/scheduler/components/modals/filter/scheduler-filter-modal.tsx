"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SchedulerFilterModalProps } from "./types";
import { useFilterState, useFilterActions } from "./hooks";
import { DateFilterSection, SchedulerSection } from "./components";

const SchedulerFilterModal: React.FC<SchedulerFilterModalProps> = ({
  open,
  onOpenChange,
  onApply,
  onReset,
}) => {
  const { values, setValues, updateValue, resetValues } = useFilterState();
  const {
    handleSelectAllActiveScheduler,
    handleClearActiveScheduler,
    handleSelectAllInactiveScheduler,
    handleClearInactiveScheduler,
  } = useFilterActions(setValues);

  const handleReset = () => {
    resetValues();
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[480px] max-h-[90vh] p-0 bg-white rounded-lg">
        <div className="flex flex-col max-h-[90vh]">
          <DialogHeader className="px-6 py-4 border-b border-gray-200">
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 space-y-5">
              <DateFilterSection
                values={values}
                updateValue={updateValue}
              />

              <SchedulerSection
                title="Active Scheduler"
                values={values.activeScheduler}
                updateValue={(key, value) => updateValue(`activeScheduler.${key}`, value)}
                handleSelectAll={handleSelectAllActiveScheduler}
                handleClear={handleClearActiveScheduler}
              />

              <SchedulerSection
                title="Inactive Scheduler"
                values={values.inactiveScheduler}
                updateValue={(key, value) => updateValue(`inactiveScheduler.${key}`, value)}
                handleSelectAll={handleSelectAllInactiveScheduler}
                handleClear={handleClearInactiveScheduler}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-200 bg-white">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset to Default
            </Button>
            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                className="px-5 py-2 h-9 text-sm border-gray-300"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="px-5 py-2 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleApply}
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerFilterModal;


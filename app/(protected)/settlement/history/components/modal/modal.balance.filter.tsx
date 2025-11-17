import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import DatePickerRange from "@/components/ui/datepickerrange";
import { Button } from "@/components/ui/button";
import BalanceCheckboxFilter from "../balance.checkbox.filter";

const ModalBalanceFilter = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const handleClear = () => {
    setDateRange(undefined);
    setSelectedTransactionTypes([]);
  };

  const handleApply = () => {
    console.log("Applied filters:", {
      dateRange,
      transactionTypes: selectedTransactionTypes,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-full self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-none">
              Date Filter
            </div>
            <button
              onClick={handleClear}
              className="px-0.5 py-1 rounded-md flex justify-start items-center gap-2.5 hover:bg-gray-100 transition-colors"
            >
              <div className="justify-start text-rose-500 text-xs font-medium font-['Inter'] leading-3">
                Clear
              </div>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <Select>
              <SelectTrigger>
                <div>Transaction Date</div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transaction-date">
                  Transaction Date
                </SelectItem>
                <SelectItem value="last-activity">
                  Last Activity Date
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Select Date Range
              </label>
              <DatePickerRange
                value={dateRange}
                onChange={setDateRange}
                placeholder="Pick a date range"
                numberOfMonths={2}
                align="end"
              />
            </div>

            {/* Transaction Type Filter */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <BalanceCheckboxFilter
                selectedTypes={selectedTransactionTypes}
                onChange={setSelectedTransactionTypes}
                label="Transaction Type"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <BalanceCheckboxFilter
                selectedTypes={selectedStatus}
                onChange={setSelectedStatus}
                label="Status"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-3 pt-3 border-t mt-6 border-gray-200">
          <Button
            variant="foreground"
            className="bg-rose-50 opacity-50  outline-1 outline-offset-[-1px] outline-rose-500/20 text-rose-500"
          >
            Reset to Default
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceFilter;

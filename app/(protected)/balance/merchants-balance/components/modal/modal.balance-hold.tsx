import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import {
  FloatingLabelNumeric,
  FloatingLabelTextarea,
} from "@/components/ui/floating-label-input";
import { useEffect, useState } from "react";
import { MerchantInfoCard, BalanceInfoSection } from "../../../components";

const ModalBalanceHold = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [holdAmount, setHoldAmount] = useState<string>("0");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<{
    holdAmount?: string;
    notes?: string;
  }>({});

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setHoldAmount("0");
      setNotes("");
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let hasError = false;

    if (!holdAmount || holdAmount === "0" || parseInt(holdAmount) <= 0) {
      newErrors.holdAmount = "Hold amount is required";
      hasError = true;
    }

    if (!notes || notes.trim() === "") {
      newErrors.notes = "Notes is required";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    // Handle submit logic here
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[725px]">
        <DialogHeader className="border-b border-gray-200 pb-3">
          <DialogTitle>Hold Balance</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-[675px]">
            <MerchantInfoCard
              merchantName="MetroMart"
              companyName="PT Metro Jaya Teknologika"
              clientId="UP12920398747"
              parentId="UP12920398747"
            />
            <BalanceInfoSection
              activeBalance="IDR 10.000.000"
              pendingBalance="IDR 0"
              holdBalance="IDR 0"
            />

            <div className="mt-5 py-5 w-full border-t border-gray-200">
              <FloatingLabelNumeric
                label="Hold Amount"
                prefix="IDR "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={0}
                fixedDecimalScale={false}
                value={holdAmount}
                onChange={(value) => {
                  setHoldAmount(value);
                  if (errors.holdAmount) {
                    setErrors({ ...errors, holdAmount: undefined });
                  }
                }}
                placeholder="IDR 0"
                error={!!errors.holdAmount}
                errorMessage={errors.holdAmount}
              />
            </div>

            <div className="mt-5 pt-5 w-full border-t border-gray-200">
              <FloatingLabelTextarea
                label="Notes"
                rows={4}
                value={notes}
                onChange={(value) => {
                  setNotes(value);
                  if (errors.notes) {
                    setErrors({ ...errors, notes: undefined });
                  }
                }}
                placeholder="Enter notes"
                error={!!errors.notes}
                errorMessage={errors.notes}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-3 pt-3 border-t mt-6 border-gray-200">
          <Button variant="destructive" onClick={handleSubmit}>
            Hold Balance
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceHold;

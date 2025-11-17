import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FloatingLabelNumeric,
  FloatingLabelTextarea,
} from "@/components/ui/floating-label-input";
import { MerchantInfoCard, BalanceInfoSection } from "../../../components";
import { useEffect, useState } from "react";

const ModalBalanceTopup = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}) => {
  const [topUpAmount, setTopUpAmount] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [errors, setErrors] = useState<{
    topUpAmount?: string;
    remark?: string;
  }>({});

  // Mock active balance - should come from props or API
  const activeBalance = 10000000; // IDR 10.000.000

  useEffect(() => {
    if (open) {
      setTopUpAmount("");
      setRemark("");
      setErrors({});
    }
  }, [open]);

  // Calculate balance after top-up
  const getTopUpAmountValue = () => {
    if (!topUpAmount) return 0;
    const numericValue = topUpAmount.replace(/[^\d]/g, "");
    return parseFloat(numericValue) || 0;
  };

  const balanceAfterTopUp = activeBalance + getTopUpAmountValue();

  // Format currency
  const formatCurrency = (amount: number) => {
    return `IDR ${amount.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/,/g, ".")}`;
  };

  const validateForm = () => {
    const newErrors: { topUpAmount?: string; remark?: string } = {};

    if (!topUpAmount || getTopUpAmountValue() <= 0) {
      newErrors.topUpAmount = "Top-Up Amount is required and must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[725px]">
        <DialogHeader className="border-b border-gray-200 pb-3">
          <DialogTitle>Top-Up Balance Request</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-[675px]">
            <MerchantInfoCard
              merchantName="MetroMart"
              companyName="PT Metro Jaya Teknologika"
              clientId="UP12920398747"
              parentId="UP12920398747"
            />

            <div className="mt-5 py-5 w-full border-t border-gray-200">
              <FloatingLabelNumeric
                label="Top-Up Amount"
                prefix="IDR "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={0}
                fixedDecimalScale={false}
                value={topUpAmount}
                onChange={(value) => {
                  setTopUpAmount(value);
                  if (errors.topUpAmount) {
                    setErrors((prev) => ({ ...prev, topUpAmount: undefined }));
                  }
                }}
                error={!!errors.topUpAmount}
                errorMessage={errors.topUpAmount}
                placeholder="IDR 0"
              />
            </div>

            <div className="mt-5 pt-5 w-full border-t border-gray-200">
              <FloatingLabelTextarea
                label="Remark (Optional)"
                value={remark}
                onChange={(value) => {
                  setRemark(value);
                  if (errors.remark) {
                    setErrors((prev) => ({ ...prev, remark: undefined }));
                  }
                }}
                error={!!errors.remark}
                errorMessage={errors.remark}
                rows={4}
                placeholder="Enter remark for top-up balance"
              />
            </div>

            {/* Balance Summary Section */}
            <div className="mt-5 pt-5 w-full border-t border-gray-200">
              <div className="flex justify-end">
                <div className="flex flex-col items-end gap-2 min-w-[350px]">
                  <div className="flex justify-between items-center w-full gap-8">
                    <span className="text-sm text-slate-600 font-normal">
                      Active Balance
                    </span>
                    <span className="text-sm text-slate-800 font-normal">
                      {formatCurrency(activeBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full gap-8">
                    <span className="text-sm text-slate-600 font-normal">
                      Top-Up Amount
                    </span>
                    <span className="text-sm text-green-600 font-normal">
                      + {formatCurrency(getTopUpAmountValue())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full gap-8 pt-2 border-t border-gray-200">
                    <span className="text-sm text-slate-900 font-semibold">
                      Balance After Top-Up
                    </span>
                    <span className="text-sm text-slate-900 font-semibold">
                      {formatCurrency(balanceAfterTopUp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-3 pt-3 border-t mt-6 border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceTopup;

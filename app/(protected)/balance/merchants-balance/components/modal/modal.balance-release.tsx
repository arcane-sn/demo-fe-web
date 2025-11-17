import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingLabelNumeric } from "@/components/ui/floating-label-input";
import { useEffect, useState } from "react";
import { MerchantInfoCard, BalanceInfoSection } from "../../../components";

const ModalBalanceRelease = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}) => {
  const [releaseAmount, setReleaseAmount] = useState<string>("0");
  const [errors, setErrors] = useState<{
    releaseAmount?: string;
  }>({});

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setReleaseAmount("0");
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let hasError = false;

    if (!releaseAmount || releaseAmount === "0" || parseInt(releaseAmount) <= 0) {
      newErrors.releaseAmount = "Release amount is required";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    } else {
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[725px]">
        <DialogHeader className="border-b border-gray-200 pb-3">
          <DialogTitle>Release Balance</DialogTitle>
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
                label="Release Amount"
                prefix="IDR "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={0}
                fixedDecimalScale={false}
                value={releaseAmount}
                onChange={(value) => {
                  setReleaseAmount(value);
                  if (errors.releaseAmount) {
                    setErrors({ ...errors, releaseAmount: undefined });
                  }
                }}
                placeholder="IDR 0"
                error={!!errors.releaseAmount}
                errorMessage={errors.releaseAmount}
              />
            </div>

            <div className="mt-5 pt-5 w-full border-t border-gray-200 flex items-start justify-start gap-2.5">
              <div className="w-52">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                  Total Hold Balance
                </div>
                <div className="mt-2.5 justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                  Held Notes
                </div>
              </div>
              <div className="w-full">
                <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                  IDR 50.000.000
                </div>
                <div className="mt-2.5 self-stretch justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-snug">
                  Lorem ipsum dolor sit amet consectetur. Cursus gravida sed
                  dignissim cursus turpis ut. Lectus facilisis volutpat
                  venenatis odio fusce adipiscing justo pharetra. Commodo vitae
                  commodo sit amet commodo pellentesque molestie egestas
                  volutpat. Id non convallis pharetra in orci elit pharetra
                  pretium.
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
            Release Balance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceRelease;

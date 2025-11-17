import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDialogStore } from "../../core/hooks/use-dialog";
import { ArrowLeft } from "lucide-react";
import DialogSetPinSuccess from "../dialog-set-pinn-success";

interface DialogSetupPinProps {
  trigger: ReactNode;
  onConfirmSetup: (pin: string) => void;
  isFromReset?: boolean;
}

const DialogSetupPin: React.FC<DialogSetupPinProps> = ({
  trigger,
  onConfirmSetup,
  isFromReset = false,
}) => {
  const { isSetupPinOpen, closeSetupPin, openSetPinSuccess } = useDialogStore();
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleCreatePin = () => {
    if (pin.length === 6) {
      setStep("confirm");
    }
  };

  const handleConfirmPin = () => {
    if (pin === confirmPin && confirmPin.length === 6) {
      onConfirmSetup(pin);
      closeSetupPin();
      openSetPinSuccess();
      // Reset state
      setStep("create");
      setPin("");
      setConfirmPin("");
    }
  };

  const handleBack = () => {
    setStep("create");
    setConfirmPin("");
  };

  const handleClose = () => {
    closeSetupPin();
    setStep("create");
    setPin("");
    setConfirmPin("");
  };

  return (
    <Dialog open={isSetupPinOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent close={false} className="max-w-md p-0">
        {/* <DialogHeader className="px-4 py-1 mb-1 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between">
              <div className="p-8">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    {step === "create" ? "Create New Pin" : "Confirm PIN"}
                  </p>
                </div>
              </div>
              <div className="self-center items-center justify-center">
                <Button
                  mode={"icon"}
                  onClick={handleClose}
                  className="bg-transparent hover:bg-bg-transparent"
                >
                  <div className="text-[var(--color-gray-600)]">X</div>
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader> */}
        {step === "confirm" && (
          <div className="flex justify-start w-full px-8 pt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="p-1.5 bg-white rounded-lg border border-zinc-200"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        )}

        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="p-10 flex flex-col items-center gap-9">
              {/* Icon */}
              <div className="flex justify-center">
                <img
                  src="/assets/icon/hexa_pin.svg"
                  alt="PIN Icon"
                  className="w-25 h-25"
                />
              </div>

              {/* Title and Description */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="text-slate-900 text-lg font-medium text-center">
                  {step === "create" ? "Create New Pin" : "Confirm PIN"}
                </div>
                <div className="text-slate-600 text-xs font-normal text-center">
                  {step === "create"
                    ? "Set up your new 6-digit PIN to keep your account secure"
                    : "Please type your 6-digit PIN again to make sure it matches"}
                </div>
              </div>

              {/* Back Button for Confirm Step */}

              {/* PIN Input */}
              <div className="py-2">
                <InputOTP
                  maxLength={6}
                  value={step === "create" ? pin : confirmPin}
                  onChange={(value) => {
                    // Only allow numeric input
                    const numericValue = value.replace(/[^0-9]/g, "");
                    if (step === "create") {
                      setPin(numericValue);
                    } else {
                      setConfirmPin(numericValue);
                    }
                  }}
                >
                  <InputOTPGroup className="gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-10 h-10 px-3 py-3 bg-white rounded-md border border-zinc-200"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Action Button */}
              <div className="w-full">
                <Button
                  onClick={
                    step === "create" ? handleCreatePin : handleConfirmPin
                  }
                  disabled={
                    step === "create"
                      ? pin.length !== 6
                      : confirmPin.length !== 6 || pin !== confirmPin
                  }
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md"
                >
                  {step === "create" ? "Continue" : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Success Dialog */}
      <DialogSetPinSuccess trigger={<div />} isFromReset={isFromReset} />
    </Dialog>
  );
};

export default DialogSetupPin;

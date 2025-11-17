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

interface DialogResetPinProps {
  trigger: ReactNode;
  onConfirmReset: (currentPin: string) => void;
}

const DialogResetPin: React.FC<DialogResetPinProps> = ({
  trigger,
  onConfirmReset,
}) => {
  const { isResetPinOpen, closeResetPin, openSetupPin } = useDialogStore();
  const [currentPin, setCurrentPin] = useState("");

  const handleSubmit = () => {
    if (currentPin.length === 6) {
      onConfirmReset(currentPin);
      closeResetPin();
      openSetupPin();
      setCurrentPin("");
    }
  };

  const handleForgotPin = () => {
    // Handle forgot PIN logic here
    console.log("Forgot PIN clicked");
  };

  const handleClose = () => {
    closeResetPin();
    setCurrentPin("");
  };

  return (
    <Dialog open={isResetPinOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent close={false} className="max-w-md p-0">
        <DialogHeader className="px-5 py-2.5 border-b border-gray-100 flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between items-center">
              <div className="text-slate-800 text-sm font-semibold">
                Reset PIN Confirmation
              </div>
              <div className="self-center items-center justify-center">
                <Button
                  mode={"icon"}
                  onClick={handleClose}
                  className="bg-transparent hover:bg-bg-transparent p-1.5 rounded-md"
                >
                  <div className="w-4 h-4 rounded text-slate-400">X</div>
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="px-10 pt-5 pb-10 flex flex-col items-center gap-7">
              {/* Icon */}
              <div className="flex justify-center">
                <img
                  src="/assets/icon/hexa_pin.svg"
                  alt="PIN Icon"
                  className="w-24 h-24"
                />
              </div>

              {/* Title and Description */}
              <div className="flex flex-col items-center gap-5">
                <div className="text-slate-900 text-lg font-medium text-center">
                  User Verification
                </div>
                <div className="text-slate-600 text-xs font-normal text-center">
                  To verify your identity, please enter your current 6-digit PIN
                  before continuing
                </div>
              </div>

              {/* PIN Input */}
              <div className="py-2">
                <InputOTP
                  maxLength={6}
                  value={currentPin}
                  onChange={(value) => {
                    // Only allow numeric input
                    const numericValue = value.replace(/[^0-9]/g, "");
                    setCurrentPin(numericValue);
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

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-5">
                <Button
                  onClick={handleSubmit}
                  disabled={currentPin.length !== 6}
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md"
                >
                  Submit
                </Button>
                {/* <div className="text-center">
                  <span className="text-slate-600 text-xs font-normal">
                    Forgot your PIN?{" "}
                  </span>
                  <button
                    onClick={handleForgotPin}
                    className="text-blue-500 text-xs font-normal hover:underline"
                  >
                    Reset PIN
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogResetPin;

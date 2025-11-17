import React, { ReactNode } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "../../core/hooks/use-dialog";

interface DialogSetPinSuccessProps {
  trigger: ReactNode;
  isFromReset?: boolean;
}

const DialogSetPinSuccess: React.FC<DialogSetPinSuccessProps> = ({
  trigger,
  isFromReset = false,
}) => {
  const { isSetPinSuccessOpen, closeSetPinSuccess } = useDialogStore();

  const handleClose = () => {
    closeSetPinSuccess();
  };

  return (
    <Dialog open={isSetPinSuccessOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent close={false} className="max-w-md p-0">
        <DialogHeader className="px-5 py-2.5 border-b border-gray-100 flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between items-center">
              <div className="text-slate-800 text-sm font-semibold">
                {isFromReset ? "PIN Changed" : "PIN Enabled"}
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
            <div className="py-5 flex flex-col items-center gap-5">
              {/* Icon */}
              <div className="flex justify-center">
                <img
                  src="/assets/icon/hexa_pin.svg"
                  alt="PIN Icon"
                  className="w-24 h-24"
                />
              </div>

              {/* Title and Description */}
              <div className="px-5 flex flex-col items-center gap-1">
                <div className="text-slate-900 text-base font-medium text-center">
                  {isFromReset
                    ? "Your 6-Digit PIN Has Been Changed Successfully"
                    : "6-Digit PIN Set Up Successfully"}
                </div>
                <div className="w-96 text-slate-600 text-xs font-normal text-center leading-tight">
                  {isFromReset
                    ? "Great job! Regularly updating your PIN helps keep your account more secure."
                    : "Your account is now protected with 6-Digit PIN, adding an extra layer of security for sensitive actions"}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px px-5 border border-gray-100" />

              {/* Action Button */}
              <div className="w-full px-5">
                <Button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md"
                >
                  Okay!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSetPinSuccess;

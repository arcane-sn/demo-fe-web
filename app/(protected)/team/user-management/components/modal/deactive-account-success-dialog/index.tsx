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
import { Illustration } from "@/components/common/illustration";
import { useDialogStore } from "../../../core/hooks/use-dialog";

interface DeactivateAccountSuccessDialogProps {
  trigger: ReactNode;
  onSuccessClose?: () => void;
}

const DeactivateAccountSuccessDialog: React.FC<
  DeactivateAccountSuccessDialogProps
> = ({ trigger, onSuccessClose }) => {
  const {
    isDeactivateSuccessOpen,
    closeDeactivateSuccess,
    closeAllDialogs,
    closeAccountDetails,
  } = useDialogStore();

  const handleClose = () => {
    closeAllDialogs();
    closeAccountDetails(); // Close the account-details dialog via Zustand store
    onSuccessClose?.(); // Also call the callback for backward compatibility
  };

  return (
    <Dialog open={isDeactivateSuccessOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full justify-between">
              <div className="">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Account Deactivated
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
        </DialogHeader>
        <DialogBody>
          <div className="">
            {/* Illustration */}
            <div className="flex justify-center pt-4 pb-4">
              <Illustration.accountDeleteConfirmation />
            </div>

            {/* Title */}
            <div className="pt-4">
              <p className="text-center text-b-18-18-500 text-[var(--lightmodegreygrey-900)]">
                Account Deactivated
              </p>
            </div>

            {/* Description */}
            <div className="py-4">
              <p className="text-center text-b-13-20-400 text-[var(--lightmodegreygrey-700)]">
                This account has been deactivated and can no longer access the
                dashboard. To reactivate it, please update the status in the
                account profile.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-10">
              <Button
                onClick={handleClose}
                // className="w-full max-w-[140px] mx-auto bg-[var(--lightmodeprimaryprimary)] hover:bg-[var(--lightmodeprimaryprimary-active)] text-white text-b-13-14-500 rounded-md"
              >
                Okay
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateAccountSuccessDialog;

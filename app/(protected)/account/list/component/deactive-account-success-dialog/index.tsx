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
import { useDialogStore } from "../../core/hooks/use-dialog";

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
      <DialogContent close>
        <DialogBody>
          <div className="">
            {/* Illustration */}
            <div className="flex justify-center pt-4 pb-4">
              <Illustration.accountDeleteSuccess />
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
              <Button onClick={handleClose} className="w-36 h-10">
                Okay!
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateAccountSuccessDialog;

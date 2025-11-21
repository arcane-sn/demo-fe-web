"use client";

import React, { ReactNode } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { ModalSubmit } from "@/components/shared/modals/modal-submit";
import { useDialogStore } from "../../core/hooks/use-dialog";

interface DeactivateAccountConfirmationDialogProps {
  trigger: ReactNode;
  onConfirmDeactivate: () => void;
  onSuccessClose?: () => void; // Callback to close the parent account-details dialog
  accountData?: {
    userName?: string;
    email?: string;
  };
}

const DeactivateAccountConfirmationDialog: React.FC<
  DeactivateAccountConfirmationDialogProps
> = ({ trigger, onConfirmDeactivate, onSuccessClose, accountData }) => {
  const {
    isDeactivateConfirmationOpen,
    closeDeactivateConfirmation,
    openDeactivateSuccess,
    isDeactivateSuccessOpen,
    closeDeactivateSuccess,
    closeAllDialogs,
    closeAccountDetails,
  } = useDialogStore();

  const handleClose = () => {
    closeDeactivateConfirmation();
  };

  const handleConfirmDeactivate = () => {
    onConfirmDeactivate();
    closeDeactivateConfirmation();
    openDeactivateSuccess();
  };

  const handleSuccessClose = () => {
    closeAllDialogs();
    closeAccountDetails();
    closeDeactivateSuccess();
    onSuccessClose?.();
  };

  return (
    <>
      <Dialog open={isDeactivateConfirmationOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-lg p-0 space-y-4">
          {/* Header */}
          <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Deactive Account Confirmation
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <DialogBody className="flex flex-col items-center gap-5 px-6">
            {/* Illustration */}
            <div className="flex justify-center">
              <Image
                src="/media/illustrations/29.svg"
                alt="Deactivate Account"
                width={100}
                height={100}
                className="w-auto h-auto max-w-[100px]"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Are You Sure You Want to Deactivate This Account?
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Once deactivated, this account will no longer be able to log
                in. To reactivate it, please update the status in the account
                profile later.
              </p>
            </div>
          </DialogBody>

          {/* Footer */}
          <DialogFooter className="flex-row px-6 py-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              No, Go Back
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDeactivate}
            >
              Deactivate Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <ModalSubmit
        open={isDeactivateSuccessOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleSuccessClose();
          } else {
            openDeactivateSuccess();
          }
        }}
        title="Account Deactivated"
        imageSrc="/media/illustrations/10.svg"
        imageAlt="Account Deactivated"
        message="Account Deactivated"
        description="This account has been deactivated and can no longer access the dashboard. To reactivate it, please update the status in the account profile."
        buttonText="Okay"
        buttonClassName="bg-destructive hover:bg-destructive/90 text-white"
        onButtonClick={handleSuccessClose}
      />
    </>
  );
};

export default DeactivateAccountConfirmationDialog;

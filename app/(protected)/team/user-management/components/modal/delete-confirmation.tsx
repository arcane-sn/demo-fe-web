"use client";

import React, { ReactNode, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { ModalSubmit } from "@/components/shared/modals/modal-submit";
import { useDialogStore } from "../../core/hooks/use-dialog";

interface DeleteAccountConfirmationDialogProps {
  trigger: ReactNode;
  onConfirmDelete: (password: string) => void;
  onSuccessClose?: () => void; // Callback to close the parent account-details dialog
  accountData?: {
    userName?: string;
    email?: string;
  };
}

const DeleteAccountConfirmationDialog: React.FC<
  DeleteAccountConfirmationDialogProps
> = ({ trigger, onConfirmDelete, onSuccessClose, accountData }) => {
  const [password, setPassword] = useState("");
  const {
    isDeleteConfirmationOpen,
    closeDeleteConfirmation,
    openDeleteSuccess,
    isDeleteSuccessOpen,
    closeDeleteSuccess,
    closeAllDialogs,
    closeAccountDetails,
  } = useDialogStore();

  const handleClose = () => {
    setPassword("");
    closeDeleteConfirmation();
  };

  const handleConfirmDelete = () => {
    onConfirmDelete(password);
    setPassword("");
    closeDeleteConfirmation();
    openDeleteSuccess();
  };

  const handleSuccessClose = () => {
    closeAllDialogs();
    closeAccountDetails();
    closeDeleteSuccess();
    onSuccessClose?.();
  };

  return (
    <>
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-lg p-0 space-y-4">
          {/* Header */}
          <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Delete Account Confirmation
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <DialogBody className="flex flex-col items-center gap-5 px-6">
            {/* Illustration */}
            <div className="flex justify-center">
              <Image
                src="/media/illustrations/29.svg"
                alt="Delete Account"
                width={100}
                height={100}
                className="w-auto h-auto max-w-[100px]"
              />
            </div>

            <div className="text-center w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                Are You Sure You Want to Delete This Account?
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Once deleted, this account will be permanently deleted and
                cannot be retrieved.
              </p>
            </div>

            {/* Password Confirmation Form */}
            <div className="w-full space-y-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-900">
                  User Confirmation
                </Label>
                <p className="text-xs text-gray-600">
                  Input your password to confirm deletion
                </p>
              </div>
              <Input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                aria-required="true"
                autoComplete="current-password"
                className="w-full"
              />
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
              disabled={!password.trim()}
              onClick={handleConfirmDelete}
            >
              Confirm and Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <ModalSubmit
        open={isDeleteSuccessOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleSuccessClose();
          } else {
            openDeleteSuccess();
          }
        }}
        title="Account Deleted"
        imageSrc="/media/illustrations/10.svg"
        imageAlt="Account Deleted"
        message="Account Deleted"
        description="This account has been permanently deleted and cannot be recovered."
        buttonText="Okay"
        buttonClassName="bg-destructive hover:bg-destructive/90 text-white"
        onButtonClick={handleSuccessClose}
      />
    </>
  );
};

export default DeleteAccountConfirmationDialog;

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
import { Input } from "@/components/ui/input";
import { Illustration } from "@/components/common/illustration";
import DeleteAccountSuccessDialog from "../delete-account-success-dialog";
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
  } = useDialogStore();

  const handleConfirmDelete = () => {
    onConfirmDelete(password);
    setPassword("");
    closeDeleteConfirmation();
    openDeleteSuccess();
  };

  const handleCancel = () => {
    setPassword("");
    closeDeleteConfirmation();
  };

  return (
    <Dialog open={isDeleteConfirmationOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        close
        className="max-w-lg p-0 h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
      >
        <DialogHeader className=" mb-1 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between">
              <div className="p-8">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Delete Account Confirmation
                  </p>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-8 px-8">
              <div className="max-w-4xl">
                {/* illustration */}
                <div className="flex justify-center pb-8">
                  <Illustration.accountDeleteConfirmation />
                </div>

                {/* Title and Description */}
                <div className="flex flex-col items-center justify-center gap-4 mb-8">
                  <h2 className="text-b-16-16-500 text-[var(--lightmodegreygrey-900)] text-center">
                    Are You Sure You Want to Delete This Account?
                  </h2>
                  <p className="text-b-13-20-400 text-[var(--lightmodegreygrey-700)] text-center">
                    Once deleted, this account will be permanently deleted and
                    cannot be retrieved.
                  </p>
                </div>

                {/* Divider */}
                <hr className="w-full h-px border-none border-t border-[var(--lightmodegreygrey-200)] mb-8" />

                {/* Password Confirmation Form */}
                <form className="flex flex-col items-start justify-center gap-5 mb-8">
                  <div className="flex w-full items-center gap-2.5">
                    <div className="inline-flex flex-col items-start justify-center gap-2">
                      <legend className="text-b-14-14-500 text-[var(--lightmodegreygrey-900)]">
                        User Confirmation
                      </legend>
                      <p className="text-b-13-14-400 text-[var(--lightmodegreygrey-700)]">
                        Input your password to confirm deletion
                      </p>
                    </div>
                  </div>

                  <label
                    htmlFor="password-input"
                    // className="flex h-10 items-center gap-2.5 p-0 w-full bg-[var(--lightmodelightlight-active)] rounded-md border border-[var(--lightmodegreygrey-300)] cursor-text focus-within:border-[var(--lightmodeprimaryprimary)] focus-within:shadow-[0_0_0_3px_var(--lightmodeprimaryprimary-clarity-20)]"
                    className="flex h-10 w-full "
                  >
                    <Input
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      aria-required="true"
                      autoComplete="current-password"
                      // className="w-full m-0 p-3 text-b-13-14-400 text-[var(--lightmodegreygrey-600)] border-none bg-transparent outline-none placeholder:text-[var(--lightmodegreygrey-600)] focus:text-[var(--lightmodegreygrey-900)]"
                    />
                  </label>
                </form>

                {/* Divider */}
                <hr className="w-full h-px border-none border-t border-[var(--lightmodegreygrey-200)] mb-8" />

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2.5">
                  <Button
                    variant="destructive"
                    disabled={!password.trim()}
                    onClick={handleConfirmDelete}
                    className="px-7.5 py-3.25 bg-[var(--color-danger)] hover:bg-[var(--color-danger-clarity-20)] text-[var(--color-white)] text-b-13-14-500 rounded-md disabled:opacity-50"
                  >
                    <p className="text-b-13-14-500 text-[var(--color-white)]">
                      Confirm and Delete
                    </p>
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    No, Go Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Success Dialog */}
      <DeleteAccountSuccessDialog
        trigger={<div />}
        onSuccessClose={onSuccessClose}
      />
    </Dialog>
  );
};

export default DeleteAccountConfirmationDialog;

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
import { useRouter } from "next/navigation";

interface DeleteAccountConfirmationDialogProps {
  trigger: ReactNode;
  onConfirmDelete: () => void;
  onSuccessClose?: () => void;
}

const DeleteAccountConfirmationDialog: React.FC<
  DeleteAccountConfirmationDialogProps
> = ({ trigger, onConfirmDelete, onSuccessClose }) => {
  const {
    isDeleteAccountConfirmationOpen,
    closeDeleteAccountConfirmation,
    openDeleteAccountSuccess,
  } = useDialogStore();
  const router = useRouter();

  const handleConfirmDelete = () => {
    onConfirmDelete();
    closeDeleteAccountConfirmation();
    // Navigate to delete account success page
    router.push("/delete-account-success");
  };

  const handleCancel = () => {
    closeDeleteAccountConfirmation();
  };

  return (
    <>
      <Dialog open={isDeleteAccountConfirmationOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          close={false}
          className="max-w-lg p-0 h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
        >
          <DialogHeader className="px-4 py-1 mb-1 border-b flex-shrink-0">
            <DialogTitle>
              <div className="flex w-full justify-between">
                <div className="p-8">
                  <div className="">
                    <p className="text-b-20-20-500 flex items-center gap-2">
                      Delete Account Confirmation
                    </p>
                  </div>
                </div>
                <div className="self-center items-center justify-center">
                  <Button
                    mode={"icon"}
                    onClick={closeDeleteAccountConfirmation}
                    className="bg-transparent hover:bg-bg-transparent"
                  >
                    <div className="text-[var(--color-gray-600)]">X</div>
                  </Button>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 min-h-0">
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-8 px-8">
                <div className="max-w-4xl">
                  {/* Illustration */}
                  <div className="flex justify-center pb-8">
                    <Illustration.accountDeleteConfirmation />
                  </div>

                  {/* Title and Description */}
                  <div className="flex flex-col items-center justify-center gap-4 mb-8">
                    <h2 className="text-b-16-16-500 text-[var(--lightmodegreygrey-900)] text-center">
                      Are You Sure You Want to Delete This Account?
                    </h2>
                    <p className="text-b-13-20-400 text-[var(--lightmodegreygrey-700)] text-center">
                      Once deleted, this account will be permanently removed and
                      cannot be recovered. All associated data will be lost.
                    </p>
                  </div>

                  {/* Divider */}
                  <hr className="w-full h-px border-none border-t border-[var(--lightmodegreygrey-200)] mb-8" />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2.5">
                    <Button
                      variant="destructive"
                      onClick={handleConfirmDelete}
                      className="px-7.5 py-3.25 bg-[var(--color-danger)] hover:bg-[var(--color-danger-clarity-20)] text-[var(--color-white)] text-b-13-14-500 rounded-md"
                    >
                      <p className="text-b-13-14-500 text-[var(--color-white)]">
                        Delete Account
                      </p>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="px-4 py-3.25 bg-white border border-[var(--lightmodegreygrey-300)] text-[var(--lightmodegreygrey-700)] text-b-13-14-500 rounded-md hover:bg-[var(--lightmodegreygrey-100)] hover:border-[var(--lightmodegreygrey-400)]"
                    >
                      No, Go Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteAccountConfirmationDialog;

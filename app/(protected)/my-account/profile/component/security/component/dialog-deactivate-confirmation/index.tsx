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

interface DeactivateAccountConfirmationDialogProps {
  trigger: ReactNode;
  onConfirmDeactivate: () => void;
  onSuccessClose?: () => void;
}

const DeactivateAccountConfirmationDialog: React.FC<
  DeactivateAccountConfirmationDialogProps
> = ({ trigger, onConfirmDeactivate, onSuccessClose }) => {
  const {
    isDeactivateConfirmationOpen,
    closeDeactivateConfirmation,
    openDeactivateSuccess,
  } = useDialogStore();

  const handleConfirmDeactivate = () => {
    onConfirmDeactivate();
    closeDeactivateConfirmation();
    openDeactivateSuccess();
  };

  const handleCancel = () => {
    closeDeactivateConfirmation();
  };

  return (
    <>
      <Dialog open={isDeactivateConfirmationOpen}>
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
                      Deactive Account Confirmation
                    </p>
                  </div>
                </div>
                <div className="self-center items-center justify-center">
                  <Button
                    mode={"icon"}
                    onClick={closeDeactivateConfirmation}
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
                      Are You Sure You Want to Deactivate This Account?
                    </h2>
                    <p className="text-b-13-20-400 text-[var(--lightmodegreygrey-700)] text-center">
                      Once deactivated, this account will no longer be able to
                      log in. To reactivate it, please update the status in the
                      account profile later.
                    </p>
                  </div>

                  {/* Divider */}
                  <hr className="w-full h-px border-none border-t border-[var(--lightmodegreygrey-200)] mb-8" />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2.5">
                    <Button
                      variant="destructive"
                      onClick={handleConfirmDeactivate}
                      className="px-7.5 py-3.25 bg-[var(--color-danger)] hover:bg-[var(--color-danger-clarity-20)] text-[var(--color-white)] text-b-13-14-500 rounded-md"
                    >
                      <p className="text-b-13-14-500 text-[var(--color-white)]">
                        Deactivate Account
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

export default DeactivateAccountConfirmationDialog;

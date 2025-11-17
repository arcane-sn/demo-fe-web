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

interface DeactivateAccountSuccessDialogProps {
  trigger: ReactNode;
  onSuccessClose?: () => void;
}

const DeactivateAccountSuccessDialog: React.FC<
  DeactivateAccountSuccessDialogProps
> = ({ trigger, onSuccessClose }) => {
  const { isDeactivateSuccessOpen, closeDeactivateSuccess } = useDialogStore();
  const router = useRouter();

  const handleClose = () => {
    router.push("/signin");
    closeDeactivateSuccess();
    onSuccessClose?.();
  };

  return (
    <Dialog open={isDeactivateSuccessOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full justify-between">
              <div className="">
                <div className=""></div>
              </div>
              <div className="self-center items-center justify-center">
                <Button
                  mode={"icon"}
                  //   onClick={handleClose}
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
            <div className="py-8 px-8">
              <p className="text-center text-b-13-20-400 text-[var(--lightmodegreygrey-700)]">
                This account has been deactivated and can no longer access the
                dashboard. To reactivate it, please update the status in the
                account profile.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-6">
              <Button onClick={handleClose}>Go to Login Page</Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateAccountSuccessDialog;

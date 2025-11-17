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
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/common/icons";
import { Illustration } from "@/components/common/illustration";
import { useDialogStore } from "../../../core/hooks/use-dialog";

interface ResetPasswordEmailDialogProps {
  trigger: ReactNode;
  onSuccessClose?: () => void;
  userEmail?: string;
}

const ResetPasswordEmailDialog: React.FC<ResetPasswordEmailDialogProps> = ({
  trigger,
  onSuccessClose,
  userEmail,
}) => {
  const [email, setEmail] = useState(userEmail || "");

  const { isResetPasswordEmailOpen, closeResetPasswordEmail } =
    useDialogStore();

  const handleContinue = () => {
    // Open new tab with reset-password-request page
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const resetUrl = `${baseUrl}/reset-password-request?email=${encodeURIComponent(email)}`;
    window.open(resetUrl, "_blank");

    closeResetPasswordEmail();
    onSuccessClose?.();
  };

  const handleClose = () => {
    setEmail(userEmail || "");
    closeResetPasswordEmail();
    onSuccessClose?.();
  };

  return (
    <Dialog open={isResetPasswordEmailOpen}>
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
                    Reset Password
                  </p>
                  <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                    Enter your email to receive a password reset link
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

        <div className="flex flex-1 min-h-0">
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-8 px-8">
              <div className="max-w-4xl">
                <div className="flex flex-col items-center gap-8">
                  {/* Illustration */}
                  <div className="flex justify-center pt-10">
                    <Illustration.accountCreateSuccess />
                  </div>

                  <div className="text-center">
                    <p className="text-b-20-20-500">Reset Password</p>
                    <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                      Enter your email to receive a password reset link
                    </p>
                  </div>

                  {/* Email Input Section */}
                  <div className="w-full max-w-md flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-b-13-14-400 text-[var(--color-gray-800)]"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@email.com"
                      className="bg-[var(--color-gray-50)] border-[var(--color-gray-300)] text-[var(--color-gray-700)]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-full">
                    <Button className="w-full" onClick={handleContinue}>
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordEmailDialog;

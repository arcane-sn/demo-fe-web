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
import Image from "next/image";
import { useDialogStore } from "../../core/hooks/use-dialog";

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
  };

  return (
    <Dialog open={isResetPasswordEmailOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg p-0 space-y-4">
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col items-center gap-5 px-6">
          {/* Illustration */}
          <div className="flex justify-center">
            <Image
              src="/media/illustrations/29.svg"
              alt="Reset Password"
              width={100}
              height={100}
              className="w-auto h-auto max-w-[100px]"
            />
          </div>

          <div className="text-center w-full">
            <h3 className="text-lg font-semibold text-gray-900">
              Reset Password
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Email Input Section */}
          <div className="w-full space-y-2">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-900">
                Email
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
              required
              aria-required="true"
              autoComplete="email"
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
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!email.trim()}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordEmailDialog;

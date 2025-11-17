import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialogStore } from "../../core/hooks/use-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Illustration } from "@/components/common/illustration";

const DialogEmailResetPassword: React.FC = () => {
  const { isResetPasswordEmailOpen, closeResetPasswordEmail } =
    useDialogStore();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    // Navigate to reset password page with email parameter
    router.push(`/reset-password-request?email=sample@mail.com`);
    closeResetPasswordEmail();
  };

  if (!isResetPasswordEmailOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-sm border border-[#F1F1F4] rounded-xl p-10 flex flex-col items-center gap-9 w-full max-w-sm">
        {/* Icon and Content */}
        <div className="flex flex-col items-center gap-5">
          {/* Email Icon */}
          <Illustration.accountCreateSuccess />

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="text-[#071437] text-b-18-18-500 text-center">
              Reset Password
            </div>
            <div className="text-[#4B5675] text-b-13-18-400 text-center">
              Enter your email to reset password
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="w-full flex flex-col gap-2">
          <div className="text-[#071437] text-b-13-14-400">Email</div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com"
          />
        </div>

        {/* Continue Button */}
        <div className="w-full">
          <Button className="w-full" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialogEmailResetPassword;

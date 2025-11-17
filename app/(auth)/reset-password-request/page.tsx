"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/common/illustration";

const ResetPasswordRequestPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isResending, setIsResending] = useState(false);

  // Redirect if no email provided
  if (!email) {
    return (
      <div className="w-full flex flex-col items-center gap-9">
        <div className="text-center">
          <p className="text-[#4B5675] text-[13px]">
            Invalid or missing email address.
          </p>
          <Link
            href="/signin"
            className="text-[#1B84FF] hover:underline text-[13px]"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSkipForNow = () => {
    // Navigate to reset-password-token with a demo token
    window.location.href = "/reset-password-token?token=demo-token-12345";
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Resend email for:", email);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-9">
      {/* Illustration */}
      <div>
        <Illustration.resetPasswordRequest />
      </div>

      {/* Title and Description */}
      <div className="w-full flex flex-col items-center gap-5">
        <h1 className="text-center text-[#071437] text-lg font-medium leading-[18px]">
          Check your email
        </h1>
        <div className="w-full text-center">
          <p className="text-[#4B5675] text-[13px] font-normal leading-[22px]">
            Please click the link sent to your email
            <br />
            <span className="text-[#071437] font-medium">{email}</span>
            <br />
            to reset your account. Thank you
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col items-center gap-5">
        <Button
          onClick={handleSkipForNow}
          className="w-full px-4 py-[13px] bg-[#1B84FF] hover:bg-[#1B84FF]/90 text-white text-[13px] font-medium leading-[14px] rounded-md"
        >
          Skip for now
        </Button>

        <div className="w-full text-center">
          <span className="text-[#4B5675] text-[12px] font-normal leading-[12px]">
            Didn't receive an email?{" "}
          </span>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-[#1B84FF] text-[12px] font-normal leading-[12px] hover:underline disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer"
          >
            {isResending ? "Sending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequestPage;

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/common/icons";
import Link from "next/link";
import { Illustration } from "@/components/common/illustration";

const ResetPasswordTokenPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Check if passwords match
  useEffect(() => {
    setPasswordMatch(newPassword === confirmPassword && newPassword.length > 0);
  }, [newPassword, confirmPassword]);

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  const handleResetPassword = async () => {
    if (!passwordMatch) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      // await resetPasswordWithToken(token, newPassword);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to reset password:", err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    router.push("/signin");
  };

  if (!token) {
    return (
      <div className="w-full flex flex-col items-center gap-9">
        <div className="text-center">
          <p className="text-[#4B5675] text-[13px]">
            Invalid or missing reset token.
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

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center gap-7.5">
        {/* Success Illustration Placeholder */}
        <div>
          <Illustration.resetPasswordTokenSuccess />
        </div>

        {/* Success Message */}
        <div className="w-full flex flex-col items-center gap-5">
          <h1 className="text-center text-[#071437] text-lg font-medium leading-[18px]">
            Your password is changed
          </h1>
          <p className="text-center text-[#4B5675] text-[13px] font-normal leading-[20px]">
            Your password has been successfully updated.
            <br />
            Your account's security is our priority.
          </p>
        </div>

        {/* Sign In Button */}
        <div className="w-full flex flex-col items-center gap-5">
          <Button
            onClick={handleGoToSignIn}
            // className="w-full px-4 py-[13px] bg-[#1B84FF] hover:bg-[#1B84FF]/90 text-white text-[13px] font-medium leading-[14px] rounded-md"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-7.5">
      {/* Illustration */}
      <div>
        <Illustration.resetPasswordToken />
      </div>
      {/* Title and Description */}
      <div className="w-full flex flex-col items-center gap-2.5">
        <h1 className="text-center text-[#071437] text-lg font-medium leading-[18px]">
          Reset Password
        </h1>
        <p className="text-center text-[#4B5675] text-[13px] font-normal leading-[14px]">
          Enter your new password
        </p>
      </div>

      {/* Password Form */}
      <div className="w-full flex flex-col gap-6">
        {/* New Password */}
        <div className="w-full flex flex-col gap-2">
          <Label
            htmlFor="newPassword"
            className="text-[#071437] text-[13px] font-normal leading-[14px]"
          >
            New Password
          </Label>
          <InputPassword
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter Password"
            showCriteria
            disabled={isLoading}
          />
        </div>

        {/* Confirm Password */}
        <div className="w-full flex flex-col gap-2">
          <Label
            htmlFor="confirmPassword"
            className="text-[#071437] text-[13px] font-normal leading-[14px]"
          >
            Confirm New Password
          </Label>
          <InputPassword
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter a new Password"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-[#F8285A] text-[13px]">
            <Icons.cross_circle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleResetPassword}
          disabled={!passwordMatch || isLoading}
          className="w-full px-4 py-[13px] bg-[#1B84FF] hover:bg-[#1B84FF]/90 text-white text-[13px] font-medium leading-[14px] rounded-md disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordTokenPage;

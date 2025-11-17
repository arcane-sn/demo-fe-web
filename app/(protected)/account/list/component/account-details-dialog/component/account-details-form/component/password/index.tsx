import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AccountData } from "../../../../../account-list-table/core/types";
import { Badge } from "@/components/ui/badge";
import { useDialogStore } from "../../../../../../core/hooks/use-dialog";
import Link from "next/link";
import ResetPasswordEmailDialog from "../../../../../../component/reset-password-email-dialog";

interface PasswordProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: AccountData;
  close: () => void;
}

const Password: React.FC<PasswordProps> = ({
  groupValue,
  setValue,
  accountData,
}) => {
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(false);
  const { openResetPasswordEmail } = useDialogStore();

  const passwordConfirmedRender = () => {
    const btnConfirmPasswordEnabled = groupValue.currentPassword;
    return (
      <div>
        {/* User Confirmation */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            User Confirmation
          </Label>
          <InputPassword
            value={groupValue.currentPassword}
            onChange={(e) => setValue("currentPassword", e.target.value)}
            placeholder="Input your password"
            className="flex-1 bg-gray-50 border-gray-300"
          />
        </div>

        {/* Confirmation Message and Button */}
        <div className="flex items-center gap-4 px-8 py-5">
          <div className="w-56"></div>
          <div className="flex items-center gap-8 flex-1">
            <p className="text-xs text-gray-600 flex-1">
              Enter your password for confirmation to change or reset password
            </p>
            <Button
              variant="outline"
              size="sm"
              className={
                btnConfirmPasswordEnabled
                  ? "bg-blue-600 border-blue-200 text-blue-50 "
                  : "bg-blue-50 opacity-50 text-blue-600"
              }
              disabled={false}
              onClick={() => {
                setPasswordConfirmed(!passwordConfirmed);
              }}
            >
              Confirm Password
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const changePasswordFieldRender = () => {
    return (
      <div>
        {/* user profile */}
        <div className="px-8 py-3">
          <div className="flex items-start gap-4">
            <Label className="w-56 text-sm font-medium text-gray-800 pt-2">
              User
            </Label>
            <div className="flex-1">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <img
                    className="w-9 h-9 rounded-full border border-border"
                    src={"/media/avatars/300-2.png"}
                    alt="User avatar"
                  />
                  <div className="flex flex-col">
                    <p className="text-b-13-14-400 text-[var(--color-gray-700)]">
                      {groupValue.userName}
                    </p>
                    <p className="pt-2 text-b-12-12-400 text-[var(--color-gray-500)]">
                      {groupValue.email}
                    </p>
                  </div>
                </div>
                <Badge variant="primary" appearance="light" size="sm">
                  Pro
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* new password */}
        <div className="px-8 py-3">
          <div className="flex items-start gap-4">
            <Label className="w-56 text-sm font-medium text-gray-800 pt-2">
              New Password
            </Label>
            <div className="flex-1">
              <InputPassword
                value={groupValue.newPassword}
                onChange={(e) => setValue("newPassword", e.target.value)}
                placeholder="New password"
                className="bg-gray-50 border-gray-300"
                showCriteria
              />
            </div>
          </div>
        </div>
        {/* confirm password */}
        <div className="px-8 py-3">
          <div className="flex items-start gap-4">
            <Label className="w-56 text-sm font-medium text-gray-800 pt-2">
              Confirm Password
            </Label>
            <div className="flex-1">
              <InputPassword
                value={groupValue.confirmPassword}
                onChange={(e) => setValue("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
                className="bg-gray-50 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card id="password" className="border border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Password
          </CardTitle>
        </div>
        <p className="text-b-13-14-400 text-[var(--color-gray-700)] mt-2">
          Password last changed 2 months ago
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {!passwordConfirmed
          ? passwordConfirmedRender()
          : changePasswordFieldRender()}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-8 py-8">
          <Button
            variant="outline"
            className={
              passwordConfirmed
                ? "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                : "bg-blue-50 border-blue-200 text-blue-600 opacity-50"
            }
            disabled={!passwordConfirmed}
            onClick={() => {
              console.log("Reset Password clicked");
              openResetPasswordEmail();
            }}
          >
            Reset Password
          </Button>
          <Button
            className={
              passwordConfirmed &&
              groupValue.newPassword &&
              groupValue.confirmPassword
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700 opacity-50"
            }
            disabled={
              !passwordConfirmed ||
              !groupValue.newPassword ||
              !groupValue.confirmPassword
            }
            onClick={() => {
              console.log("Change Password clicked");
              // Add change password logic here
            }}
          >
            Change Password
          </Button>
        </div>
      </CardContent>

      {/* Reset Password Email Dialog */}
      <ResetPasswordEmailDialog
        trigger={<div />}
        onSuccessClose={() => {
          console.log("Reset password email dialog closed");
        }}
        userEmail={accountData?.email}
      />
    </Card>
  );
};

export default Password;

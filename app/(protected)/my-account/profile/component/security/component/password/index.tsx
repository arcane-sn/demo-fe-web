import React from "react";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import { useFormik } from "formik";
import { useDialogStore } from "../../core/hooks/use-dialog";
import DialogEmailResetPassword from "../dialog-email-reset-password";

const Password: React.FC = () => {
  const { openResetPasswordEmail } = useDialogStore();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log("Password form submitted:", values);
    },
  });

  return (
    <div className="bg-white shadow-sm border border-[#F1F1F4] rounded-xl">
      {/* Header */}
      <div className="h-14 px-8 py-5 border-b border-[#F1F1F4] flex justify-between items-center">
        <div className="text-[#071437] text-b-16-16-600">Password</div>
        <div className="text-[#4B5675] text-b-13-14-400">
          Password last changed 2 months ago
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col pt-6">
        {/* Current Password */}
        <div className="px-8 py-2.5 flex items-center gap-2.5">
          <div className="w-55 flex items-center gap-2.5">
            <div className="text-[#252F4A] text-b-13-14-400">
              Current Password
            </div>
          </div>
          <div className="flex-1">
            <InputPassword
              id="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              placeholder="Current password"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="px-8 py-2.5 flex gap-2.5">
          <div className="w-55 flex gap-2.5">
            <div className="text-[#252F4A] text-b-13-14-400">New Password</div>
          </div>
          <div className="flex-1">
            <InputPassword
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              placeholder="New password"
              showCriteria={true}
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="px-8 py-2.5 flex items-center gap-2.5">
          <div className="w-55 flex items-center gap-2.5">
            <div className="text-[#252F4A] text-b-13-14-400">
              Confirm New Password
            </div>
          </div>
          <div className="flex-1">
            <InputPassword
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 pb-8 flex flex-col gap-2.5 pt-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => openResetPasswordEmail()}>
            Reset Password
          </Button>
          <Button onClick={() => formik.handleSubmit()} className="">
            Change Password
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <DialogEmailResetPassword />
    </div>
  );
};

export default Password;

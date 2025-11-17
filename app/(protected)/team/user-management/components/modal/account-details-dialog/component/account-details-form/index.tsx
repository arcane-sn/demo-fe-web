"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import GeneralProfile from "./component/general-profile";
import AccountRole from "./component/account-role";
import Password from "./component/password";
import PinSection from "./component/pin-section";
import AccountLog from "./component/account-log";
import DeleteAccount from "./component/delete-account";
import { Button } from "@/components/ui/button";
import { UserData } from "../../../../user-list-table/core/types";

interface AccountDetailsFormProps {
  accountData: UserData;
  close: () => void;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  accountData,
  close,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // General Profile
      status: accountData?.accountStatus || "active",
      userID: accountData?.userID || "",
      clientID: accountData?.clientID || "",
      userName: accountData?.userName || "",
      fullName: accountData?.name || "",
      dialCode: accountData?.dialCode || "",
      phoneNumber: accountData?.phoneNumber || "",
      email: accountData?.email || "",
      photo: accountData?.photo || "",

      // Account Role
      accessLevel: accountData?.accessLevel || "",
      role: accountData?.role || "",

      // Password
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      // Account Log
      lastLogin: accountData?.loginDate || "",
      failedLoginAttempts: accountData?.failedLoginAttempt || 0,
      lastUpdate: accountData?.updateDate || "",
      updatedBy: accountData?.email || "",
      createdDate: accountData?.createdDate || "",
      createdBy: accountData?.email || "",

      // Delete Account
      confirmDelete: false,
    },
    onSubmit: (values) => {
      console.log("Account details form submitted:", values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* General Profile */}
      <GeneralProfile
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
        close={close}
      />

      {/* Account Role */}
      <AccountRole
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
        close={close}
      />

      {/* Password */}
      <Password
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
        close={close}
      />

      {/* 6-Digit PIN */}
      <PinSection
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
        close={close}
      />

      {/* Account Log */}
      <AccountLog
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
        close={close}
      />

      {/* Delete Account */}
      <div className="pb-16">
        <DeleteAccount
          groupValue={formik.values}
          setValue={async (label: any, value: any) => {
            await formik.setValues({
              ...formik.values,
              [label]: value,
            });
          }}
          accountData={accountData}
          close={close}
        />
      </div>
    </div>
  );
};

export default AccountDetailsForm;

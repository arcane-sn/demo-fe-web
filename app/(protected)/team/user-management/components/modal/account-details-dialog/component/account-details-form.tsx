"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import GeneralProfile from "./general-profile-card";
import AccountRole from "./account-role-card";
import Password from "./password-card";
import PinSection from "./pin-section-card";
import AccountLog from "./account-log-card";
import DeleteAccount from "./delete-account-card";
import { UserData } from "../../../user-list-table/core/types";

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
    <>
      <GeneralProfile
        sectionId="general-profile"
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
      />

      <AccountRole
        sectionId="account-role"
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
      />

      <Password
        sectionId="password"
        groupValue={formik.values}
        setValue={async (label: any, value: any) => {
          await formik.setValues({
            ...formik.values,
            [label]: value,
          });
        }}
        accountData={accountData}
      />

      <PinSection sectionId="pin" />

      <AccountLog sectionId="account-log" groupValue={formik.values} />

      <DeleteAccount
        sectionId="delete-account"
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
    </>
  );
};

export default AccountDetailsForm;

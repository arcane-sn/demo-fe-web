"use-client";
import React, { useState } from "react";

import { useFormik } from "formik";
import GeneralProfile from "./component/general-profile";
import AccountRole from "./component/account-role";
import TemporaryPassword from "./component/temporary-password";
import { Button } from "@/components/ui/button";
import DialogAccountConfirmation from "../../../create-account-confirmation";
import { CreateAccountFormValues, CreateAccountFormErrors } from "./core/model";

interface CreateAccountFormProps {
  closeDialog: () => void;
}
const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  closeDialog,
}) => {
  const [dialogConfirmation, setDialogConfirmation] = useState(false);

  // Move regex patterns outside function to avoid recompilation
  const USERNAME_REGEX = /^[a-zA-Z0-9.,]+$/;
  const PHONE_REGEX = /^[0-9]+$/;
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validate = (
    values: CreateAccountFormValues
  ): CreateAccountFormErrors => {
    const errors: CreateAccountFormErrors = {};

    // Username validation: only alphanumeric, dot, and comma
    const userName = values.generalProfile.userName;
    if (userName && !USERNAME_REGEX.test(userName)) {
      errors.generalProfile = {
        ...errors.generalProfile,
        userName:
          "Username can only contain alphanumeric characters, dot (.), and comma (,)",
      };
    }

    // Phone number validation: only numbers, min 9, max 15
    const phoneNumber = values.generalProfile.phoneNumber;
    if (phoneNumber) {
      if (!PHONE_REGEX.test(phoneNumber)) {
        errors.generalProfile = {
          ...errors.generalProfile,
          phoneNumber: "Phone number can only contain numbers",
        };
      } else if (phoneNumber.length < 9 || phoneNumber.length > 15) {
        errors.generalProfile = {
          ...errors.generalProfile,
          phoneNumber: "Phone number must be between 9 and 15 digits",
        };
      }
    }

    // Email validation
    const email = values.generalProfile.email;
    if (email && !EMAIL_REGEX.test(email)) {
      errors.generalProfile = {
        ...errors.generalProfile,
        email: "Invalid email address",
      };
    }

    // Password confirmation validation
    if (values.temporaryPassword.passwordField) {
      const password = values.temporaryPassword.password;
      const passwordConfirm = values.temporaryPassword.passwordConfirm;
      if (password && passwordConfirm && password !== passwordConfirm) {
        errors.temporaryPassword = {
          ...errors.temporaryPassword,
          passwordConfirm: "Passwords do not match",
        };
      }
    }

    return errors;
  };

  const formik = useFormik<CreateAccountFormValues>({
    initialValues: {
      generalProfile: {
        userName: "",
        fullName: "",
        dialCode: "+62",
        phoneNumber: "",
        email: "",
      },
      accountRole: {
        accessLevel: "internal",
        role: "",
        asignToMerchant: "",
      },
      temporaryPassword: {
        passwordField: false,
        password: "",
        passwordConfirm: "",
      },
    },
    validate,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (val) => {
      console.log("create account form : ", val);
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <DialogAccountConfirmation
          visible={dialogConfirmation}
          close={() => {
            setDialogConfirmation(false);
          }}
          confirm={() => {
            setDialogConfirmation(false);
            closeDialog();
          }}
        />
      </div>

      <div>
        <GeneralProfile formik={formik} />
      </div>
      <div>
        <AccountRole formik={formik} />
      </div>
      <div>
        <TemporaryPassword formik={formik} />
      </div>
      <div className="flex justify-end w-full pb-20">
        <Button
          onClick={() => {
            formik.validateForm().then(() => {
              if (Object.keys(formik.errors).length === 0) {
                setDialogConfirmation(true);
              }
            });
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountForm;

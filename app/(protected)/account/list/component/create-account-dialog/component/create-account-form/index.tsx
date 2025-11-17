"use-client";
import React, { ComponentType, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import GeneralProfile from "./component/general-profile";
import AccountRole from "./component/account-role";
import TemporaryPassword from "./component/temporary-password";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import DialogAccountConfirmation from "../../../create-account-confirmation";

interface CreateAccountFormProps {
  closeDialog: () => void;
}
const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  closeDialog,
}) => {
  const [dialogConfirmation, setDialogConfirmation] = useState(false);

  const formik = useFormik({
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
        <GeneralProfile
          groupValue={formik.values.generalProfile}
          setValue={async (label: any, value: any) => {
            await formik.setValues({
              ...formik.values,
              generalProfile: {
                ...formik.values.generalProfile,
                [label]: value,
              },
            });
          }}
        />
      </div>
      <div>
        <AccountRole
          groupValue={formik.values.accountRole}
          setValue={async (label: any, value: any) => {
            await formik.setValues({
              ...formik.values,
              accountRole: { ...formik.values.accountRole, [label]: value },
            });
          }}
        />
      </div>
      <div>
        <TemporaryPassword
          groupValue={formik.values.temporaryPassword}
          setValue={async (label: any, value: any) => {
            await formik.setValues({
              ...formik.values,
              temporaryPassword: {
                ...formik.values.temporaryPassword,
                [label]: value,
              },
            });
          }}
        />
      </div>
      <div className="flex justify-end w-full pb-20">
        <Button
          onClick={() => {
            // closeDialog();
            setDialogConfirmation(true);
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountForm;

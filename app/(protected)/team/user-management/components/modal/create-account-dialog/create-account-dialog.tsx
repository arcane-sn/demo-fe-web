"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollspy } from "@/components/ui/scrollspy";
import {
  ScrollspyMenu,
  ScrollspyMenuItems,
} from "@/app/components/partials/navbar/scrollspy-menu";
import { Button } from "@/components/ui/button";
import {
  GeneralProfileSection,
  AccountRoleSection,
  TemporaryPasswordSection,
} from "./components";
import { CreateAccountConfirmation } from "./components/create-account-confirmation";
import { ModalSubmit } from "@/components/shared/modals/modal-submit";
import {
  CreateAccountFormState,
  GeneralProfileValues,
  AccountRoleValues,
  TemporaryPasswordValues,
} from "./core/types";

const SECTIONS: ScrollspyMenuItems = [
  { title: "General Profile", target: "general-profile", active: true },
  { title: "Account Role", target: "account-role" },
  { title: "Temporary Password", target: "temporary-password" },
];

const INITIAL_FORM: CreateAccountFormState = {
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
};

interface CreateAccountDialogProps {
  isOpen: boolean;
  close: () => void;
}

const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({
  isOpen,
  close,
}) => {
  const [formValues, setFormValues] =
    useState<CreateAccountFormState>(INITIAL_FORM);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const menuItems = useMemo(
    () => SECTIONS.map((item, index) => ({ ...item, active: index === 0 })),
    [],
  );

  const handleGeneralProfileChange = (
    field: keyof GeneralProfileValues,
    value: string,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      generalProfile: { ...prev.generalProfile, [field]: value },
    }));
  };

  const handleAccountRoleChange = (
    field: keyof AccountRoleValues,
    value: string,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      accountRole: { ...prev.accountRole, [field]: value },
    }));
  };

  const handleTemporaryPasswordChange = (
    field: keyof TemporaryPasswordValues,
    value: boolean | string,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      temporaryPassword: {
        ...prev.temporaryPassword,
        [field]: value,
      },
    }));
  };

  const handleClose = () => {
    close();
  };

  const handleConfirm = () => {
    console.log("Create account payload:", formValues);
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    close();
    setFormValues(INITIAL_FORM);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="flex h-[90vh] max-w-[1100px]">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Complete all required data to invite user
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="flex gap-8 px-6 pb-6">
            <div className="hidden w-56 flex-shrink-0 lg:block">
              <Scrollspy targetRef={scrollRef} offset={100}>
                <ScrollspyMenu items={menuItems} />
              </Scrollspy>
            </div>
            <div className="flex-1">
              <ScrollArea className="h-[600px]" viewportRef={scrollRef}>
                <div className="space-y-7">
                  <GeneralProfileSection
                    values={formValues.generalProfile}
                    onChange={handleGeneralProfileChange}
                  />
                  <AccountRoleSection
                    values={formValues.accountRole}
                    onChange={handleAccountRoleChange}
                  />
                  <TemporaryPasswordSection
                    values={formValues.temporaryPassword}
                    onChange={handleTemporaryPasswordChange}
                  />
                </div>
              </ScrollArea>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setShowConfirmation(true)}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateAccountConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirm}
      />

      <ModalSubmit
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Success"
        imageSrc="/media/illustrations/28.svg"
        imageAlt="Invitation Sent"
        message="Invitation sent successfully!"
        description="The invited user will receive an email containing instructions to activate their account."
        buttonText="Okay!"
        onButtonClick={handleSuccessClose}
      />
    </>
  );
};

export default CreateAccountDialog;


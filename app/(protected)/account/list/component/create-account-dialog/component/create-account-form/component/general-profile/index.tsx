import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputPhoneNumber from "@/components/ui/input-phone-number";
import { GeneralProfileProps } from "./core/model";

const GeneralProfile: React.FC<GeneralProfileProps> = ({ formik }) => {
  const { values, getFieldMeta, setFieldValue, handleBlur } = formik;
  const generalProfile = values.generalProfile;

  // Direct handlers - faster than getFieldProps
  const handleUserNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("generalProfile.userName", e.target.value, false);
    },
    [setFieldValue]
  );

  const handleFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("generalProfile.fullName", e.target.value, false);
    },
    [setFieldValue]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("generalProfile.email", e.target.value, false);
    },
    [setFieldValue]
  );

  const handleDialCodeChange = useCallback(
    (val: string) => {
      setFieldValue("generalProfile.dialCode", val, false);
    },
    [setFieldValue]
  );

  const handlePhoneNumberChange = useCallback(
    (val: string) => {
      setFieldValue("generalProfile.phoneNumber", val, false);
    },
    [setFieldValue]
  );

  // Get meta only when needed for error display
  const userNameMeta = getFieldMeta("generalProfile.userName");
  const fullNameMeta = getFieldMeta("generalProfile.fullName");
  const emailMeta = getFieldMeta("generalProfile.email");
  const phoneNumberMeta = getFieldMeta("generalProfile.phoneNumber");

  return (
    <Card id="general-profile">
      <CardHeader>
        <CardTitle>General Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Username */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="usernameForm"
            className="w-48 text-left text-sm font-medium"
          >
            Username
          </Label>
          <div className="flex-1">
            <Input
              id="usernameForm"
              name="generalProfile.userName"
              value={generalProfile.userName}
              onChange={handleUserNameChange}
              onBlur={handleBlur}
              placeholder="Unique username"
              className="flex-1"
              error={userNameMeta.touched && !!userNameMeta.error}
              errorText={
                userNameMeta.touched && userNameMeta.error
                  ? userNameMeta.error
                  : undefined
              }
            />
          </div>
        </div>

        {/* Full Name */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="fullNameForm"
            className="w-48 text-left text-sm font-medium"
          >
            Full Name
          </Label>
          <div className="flex-1">
            <Input
              id="fullNameForm"
              name="generalProfile.fullName"
              value={generalProfile.fullName}
              onChange={handleFullNameChange}
              onBlur={handleBlur}
              placeholder="User full name"
              className="flex-1"
              error={fullNameMeta.touched && !!fullNameMeta.error}
              errorText={
                fullNameMeta.touched && fullNameMeta.error
                  ? fullNameMeta.error
                  : undefined
              }
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="phoneNumberForm"
            className="w-48 text-left text-sm font-medium"
          >
            Phone Number
          </Label>
          <div className="flex-1 w-full">
            <InputPhoneNumber
              id="phoneNumberForm"
              name="generalProfile.phoneNumber"
              dialCode={generalProfile.dialCode || "+62"}
              phoneNumber={generalProfile.phoneNumber}
              onDialCodeChange={handleDialCodeChange}
              onPhoneNumberChange={handlePhoneNumberChange}
              placeholder="e.g. 81234567890"
              error={phoneNumberMeta.touched && !!phoneNumberMeta.error}
              errorText={
                phoneNumberMeta.touched && phoneNumberMeta.error
                  ? phoneNumberMeta.error
                  : undefined
              }
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <Label htmlFor="email" className="w-48 text-left text-sm font-medium">
            Email
          </Label>
          <div className="flex-1">
            <Input
              id="email"
              name="generalProfile.email"
              value={generalProfile.email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              placeholder="email@domain.com"
              className="flex-1"
              error={emailMeta.touched && !!emailMeta.error}
              errorText={
                emailMeta.touched && emailMeta.error
                  ? emailMeta.error
                  : undefined
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralProfile;

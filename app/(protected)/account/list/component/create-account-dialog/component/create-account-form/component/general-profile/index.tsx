import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputPhoneNumber from "@/components/ui/input-phone-number";
import { GeneralProfileProps } from "./core/types";

const GeneralProfile: React.FC<GeneralProfileProps> = ({
  groupValue,
  setValue,
}) => {
  return (
    <Card id="general-profile">
      <CardHeader>
        <CardTitle>General Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Name */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="usernameForm"
            className="w-48 text-left text-sm font-medium"
          >
            Username
          </Label>
          <Input
            id="usernameForm"
            value={groupValue.userName}
            onChange={(e) => {
              setValue("userName", e.target.value);
            }}
            placeholder="Unique username"
            className="flex-1"
          />
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="fullNameForm"
            className="w-48 text-left text-sm font-medium"
          >
            Full Name
          </Label>
          <Input
            id="fullNameForm"
            value={groupValue.fullName}
            onChange={(e) => {
              setValue("fullName", e.target.value);
            }}
            placeholder="User full name"
            className="flex-1"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-4">
          <Label
            htmlFor="phoneNumberForm"
            className="w-48 text-left text-sm font-medium"
          >
            Phone Number
          </Label>
          <InputPhoneNumber
            id="phoneNumberForm"
            dialCode={groupValue.dialCode || "+62"}
            phoneNumber={groupValue.phoneNumber}
            onDialCodeChange={(val) => {
              setValue("dialCode", val);
            }}
            onPhoneNumberChange={(val) => {
              setValue("phoneNumber", val);
            }}
            placeholder="e.g. 81234567890"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <Label htmlFor="email" className="w-48 text-left text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            value={groupValue.email}
            onChange={(e) => {
              setValue("email", e.target.value);
            }}
            placeholder="email@domain.com"
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralProfile;

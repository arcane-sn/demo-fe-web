import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionItemDialCode from "@/components/common/section-item-dial-code";
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
          <div className="flex gap-2 flex-1">
            <SectionItemDialCode
              value={groupValue.dialCode}
              onValueChange={(val) => {
                setValue("dialCode", val);
              }}
              className="w-32"
            />
            <Input
              id="phoneNumberForm"
              value={groupValue.phoneNumber}
              onChange={(e) => {
                setValue("phoneNumber", e.target.value);
              }}
              placeholder="e.g. 81234567890"
              className="flex-1"
            />
          </div>
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

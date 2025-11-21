"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SectionItemDialCode from "@/components/common/section-item-dial-code";
import { GeneralProfileValues } from "../core/types";

interface GeneralProfileSectionProps {
  values: GeneralProfileValues;
  onChange: (field: keyof GeneralProfileValues, value: string) => void;
}

export const GeneralProfileSection = ({
  values,
  onChange,
}: GeneralProfileSectionProps) => {
  return (
    <Card id="general-profile" data-scrollspy-anchor="general-profile">
      <CardHeader>
        <CardTitle>General Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Label className="w-48 text-left text-sm font-medium">Username</Label>
          <Input
            value={values.userName}
            onChange={(e) => onChange("userName", e.target.value)}
            placeholder="Unique username"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-48 text-left text-sm font-medium">Full Name</Label>
          <Input
            value={values.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="User full name"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-48 text-left text-sm font-medium">
            Phone Number
          </Label>
          <div className="flex flex-1 gap-2">
            <SectionItemDialCode
              value={values.dialCode}
              onValueChange={(val) => onChange("dialCode", val)}
              className="w-32"
            />
            <Input
              value={values.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              placeholder="e.g. 81234567890"
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-48 text-left text-sm font-medium">Email</Label>
          <Input
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@domain.com"
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};


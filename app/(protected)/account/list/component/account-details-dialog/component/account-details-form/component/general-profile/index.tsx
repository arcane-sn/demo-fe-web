import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InputPhoneNumber from "@/components/ui/input-phone-number";
import { Copy, Camera, X } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { AccountData } from "../../../../../account-list-table/core/types";

interface GeneralProfileProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: AccountData;
  close: () => void;
}

const GeneralProfile: React.FC<GeneralProfileProps> = ({
  groupValue,
  setValue,
  accountData,
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Card
      id="general-profile"
      className="border border-gray-200 shadow-sm rounded-xl"
    >
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          General Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Status */}
        <div className="flex items-center  px-8 py-5">
          <Label className="w-48 text-sm font-medium text-gray-800">
            Status
          </Label>
          <Badge
            variant={groupValue.status === "active" ? "success" : "destructive"}
            size="md"
            appearance="light"
            shape="circle"
          >
            <BadgeDot
              className={
                groupValue.status === "active" ? "success" : "destructive"
              }
            />
            {groupValue.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* User ID */}
        <div className="flex items-center  px-8 py-5 border-gray-200">
          <Label className="w-48 text-sm font-medium text-gray-800">
            User ID
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800">{groupValue.userID}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => handleCopy(groupValue.userID, "User ID")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Client ID */}
        <div className="flex items-center  px-8 py-5">
          <Label className="w-48 text-sm font-medium text-gray-800">
            Client ID
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800">{groupValue.clientID}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => handleCopy(groupValue.clientID, "Client ID")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center  px-8 py-3">
          <Label className="min-w-48 w-48 text-sm font-medium text-gray-800">
            Username
          </Label>

          <Input
            value={groupValue.userName}
            onChange={(e) => setValue("userName", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter username"
          />
        </div>

        {/* Full Name */}
        <div className="flex items-center  px-8 py-3">
          <Label className="min-w-48 w-48 text-sm font-medium text-gray-800">
            Full Name
          </Label>
          <Input
            value={groupValue.fullName}
            onChange={(e) => setValue("fullName", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter full name"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center  px-8 py-3">
          <Label className="min-w-48 w-48 text-sm font-medium text-gray-800">
            Phone Number
          </Label>
          <InputPhoneNumber
            id="phoneNumberDetails"
            dialCode={groupValue.dialCode || "+62"}
            phoneNumber={groupValue.phoneNumber}
            onDialCodeChange={(val) => {
              setValue("dialCode", val);
            }}
            onPhoneNumberChange={(val) => {
              setValue("phoneNumber", val);
            }}
            placeholder="e.g. 81234567890"
            phoneNumberClassName="flex-1 bg-gray-50 border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="flex items-center  px-8 py-3">
          <Label className="min-w-48 w-48 text-sm font-medium text-gray-800">
            Email
          </Label>
          <Input
            value={groupValue.email}
            onChange={(e) => setValue("email", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter email address"
          />
        </div>

        {/* Photo */}
        <div className="flex items-center  px-8 py-3">
          <Label className="min-w-48 w-48 text-sm font-medium text-gray-800">
            Photo
          </Label>
          <div className="flex items-center justify-between flex-1">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {groupValue.fullName?.charAt(0) || "U"}
                </span>
                <div className="absolute overflow-hidden w-16 h-16 rounded-full top-0 flex items-end justify-end">
                  <div className="w-full bg-dark-clarity-20 opacity-40 p-1 flex items-center justify-center">
                    <Camera className="h-4 w-4 -mt-[2px] text-white" />
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-1 -right-1 h-6 w-6 p-0 bg-white border border-gray-300 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-sm text-gray-700">
              150x150px JPEG, PNG Image
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end px-8 py-8">
          <Button
            onClick={() => {
              console.log("Save changes:", groupValue);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralProfile;

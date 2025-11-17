import React from "react";
import { FormikProps } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Camera, X } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";

interface GeneralProfileProps {
  formik: FormikProps<any>;
  setValue: (label: string, value: any) => Promise<void>;
}

const GeneralProfile: React.FC<GeneralProfileProps> = ({
  formik,
  setValue,
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
        <div className="flex items-center gap-4 px-8 py-5">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Status
          </Label>
          <Badge
            variant={
              formik.values.status === "active" ? "success" : "destructive"
            }
            size="sm"
            appearance="light"
            shape="circle"
          >
            {formik.values.status || "active"}
          </Badge>
        </div>

        {/* User ID */}
        <div className="flex items-center gap-4 px-8 py-5 border-gray-200">
          <Label className="w-56 text-sm font-medium text-gray-800">
            User ID
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800">
              {formik.values.userID}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => handleCopy(formik.values.userID, "User ID")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Client ID */}
        <div className="flex items-center gap-4 px-8 py-5">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Client ID
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800">
              {formik.values.clientID}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => handleCopy(formik.values.clientID, "Client ID")}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Username
          </Label>
          <Input
            value={formik.values.userName}
            onChange={(e) => setValue("userName", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter username"
          />
        </div>

        {/* Full Name */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Full Name
          </Label>
          <Input
            value={formik.values.fullName}
            onChange={(e) => setValue("fullName", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter full name"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Phone Number
          </Label>
          <div className="flex gap-2 flex-1">
            <Input
              value={formik.values.dialCode || "+62"}
              onChange={(e) => setValue("dialCode", e.target.value)}
              className="w-20 bg-gray-50 border-gray-300"
              placeholder="+62"
            />
            <Input
              value={formik.values.phoneNumber}
              onChange={(e) => setValue("phoneNumber", e.target.value)}
              className="flex-1 bg-gray-50 border-gray-300"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Email
          </Label>
          <Input
            value={formik.values.email}
            onChange={(e) => setValue("email", e.target.value)}
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Enter email address"
          />
        </div>

        {/* Photo */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Photo
          </Label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {formik.values.fullName?.charAt(0) || "U"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center">
                <Camera className="h-3 w-3 text-white" />
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
              console.log("Save changes:", formik.values);
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

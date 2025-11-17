import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { AccountData } from "../../../../../account-list-table/core/types";

interface AccountRoleProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: AccountData;
  close: () => void;
}

const AccountRole: React.FC<AccountRoleProps> = ({
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
      id="account-role"
      className="border border-gray-200 shadow-sm rounded-xl"
    >
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Account Role
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Access Level */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">
            Access Level
          </Label>
          <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md px-3 py-2 flex-1">
            <span className="text-sm text-gray-400">
              Parent & Sub-Merchants
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center gap-4 px-8 py-3">
          <Label className="w-56 text-sm font-medium text-gray-800">Role</Label>
          <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md px-3 py-2 flex-1">
            <span className="text-sm text-gray-400">Super Admin</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Client ID */}
        <div className="flex items-center gap-4 px-8 py-5">
          <Label className="w-56 text-sm font-medium text-gray-800">
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

        {/* Save Button */}
        <div className="flex justify-end px-8 py-8">
          <Button
            onClick={() => {
              console.log("Save role changes:", groupValue);
            }}
            className="bg-blue-600 hover:bg-blue-700 opacity-50"
            disabled
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountRole;

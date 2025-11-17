import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Info } from "lucide-react";
import { AccountData } from "../../../../../account-list-table/core/types";

interface PinSectionProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: AccountData;
  close: () => void;
}

const PinSection: React.FC<PinSectionProps> = ({
  groupValue,
  setValue,
  accountData,
}) => {
  return (
    <Card id="pin" className="border border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          6-Digit PIN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {/* PIN Status Card */}
        <div className="bg-[var(--color-gray-100)] border border-gray-200 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12  bg-[var(--color-gray-100)] rounded-lg flex items-center justify-center">
                  <img
                    src="/assets/icon/hexa_pin.svg"
                    alt="PIN Lock"
                    className="w-50 h-50"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  6-Digit PIN
                </h3>
                <p className="text-sm text-gray-700">
                  Set a 6-digit code to help keep your account secure
                </p>
              </div>
            </div>
            <Badge
              variant="destructive"
              size="sm"
              appearance="light"
              className="bg-red-50 border-red-200 text-red-600"
            >
              Unsecured
            </Badge>
          </div>
        </div>

        {/* Information Message */}
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600">
            For security reasons, PIN setup is only available through
            self-service by the account owner
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PinSection;

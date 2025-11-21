import React from "react";
import { FormikProps } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Separator } from "@/components/ui/separator";

Dayjs.extend(utc);

interface AccountLogProps {
  formik: FormikProps<any>;
  setValue: (label: string, value: any) => Promise<void>;
}

const AccountLog: React.FC<AccountLogProps> = ({ formik, setValue }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const localTime = Dayjs.utc(dateString).local();
    return {
      date: localTime.format("ddd, MMM DD, YYYY"),
      time: `${localTime.format("HH:mm:ss")} (GMT ${localTime.format("Z")})`,
    };
  };

  const lastLogin = formatDate(formik.values.lastLogin);
  const lastUpdate = formatDate(formik.values.updatedDate);
  const createdDate = formatDate(formik.values.createdDate);

  return (
    <Card
      id="account-log"
      className="border border-gray-200 shadow-sm rounded-xl"
    >
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Account Log
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Last Login */}
        <div className="px-8 py-4">
          <div className="flex items-start gap-4">
            <Label className="w-44 text-sm text-gray-600">Last Login</Label>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-900">{lastLogin.date}</span>
              <span className="text-xs text-gray-700">{lastLogin.time}</span>
            </div>
          </div>
        </div>

        {/* Failed Login Attempts */}
        <div className="px-8 pb-4">
          <div className="flex items-center gap-4">
            <Label className="w-44 text-sm text-gray-600">
              Failed Login Attempts
            </Label>
            <span className="text-sm text-gray-800">
              {formik.values.failedLoginAttempts || "0"}
            </span>
          </div>
        </div>

        <Separator />

        {/* Last Update */}
        <div className="px-8 py-4">
          <div className="flex items-start gap-4">
            <Label className="w-44 text-sm text-gray-600">Last Update</Label>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-900">{lastUpdate.date}</span>
              <span className="text-xs text-gray-700">{lastUpdate.time}</span>
            </div>
          </div>
        </div>

        {/* Updated by */}
        <div className="px-8 pb-4">
          <div className="flex items-center gap-4">
            <Label className="w-44 text-sm text-gray-600">Updated by</Label>
            <span className="text-sm text-gray-800">
              {formik.values.updatedBy || "System"}
            </span>
          </div>
        </div>

        <Separator />

        {/* Created Date */}
        <div className="px-8 py-4">
          <div className="flex items-start gap-4">
            <Label className="w-44 text-sm text-gray-600">Created Date</Label>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-900">{createdDate.date}</span>
              <span className="text-xs text-gray-700">{createdDate.time}</span>
            </div>
          </div>
        </div>

        {/* Created by */}
        <div className="px-8 py-4 pb-4">
          <div className="flex items-center gap-4">
            <Label className="w-44 text-sm text-gray-600">Created by</Label>
            <span className="text-sm text-gray-800">
              {formik.values.createdBy || "System"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountLog;

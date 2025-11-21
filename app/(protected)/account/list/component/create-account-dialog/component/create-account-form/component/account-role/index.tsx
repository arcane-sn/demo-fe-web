import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accessLevelList, getRoleList } from "./core/hooks";
import { AccountRoleProps, SelectionItemProps } from "./core/model";
import { Button } from "@/components/ui/button";
import SelectTableMerchant from "../select-table-merchant";
import { InputAction } from "@/components/ui/input-action";

const AccountRole: React.FC<AccountRoleProps> = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const accountRole = values.accountRole;
  const [isOpenSelectTableMerchant, setIsOpenSelectTableMerchant] =
    useState(false);
  const labelAccesLevel = accessLevelList.find(
    (item) => item.value === accountRole.accessLevel
  );

  // Get role list based on access level
  const roleList = getRoleList(accountRole.accessLevel || "");
  const labelRole = roleList.find((item) => item.value === accountRole.role);
  const isShowAsignToMerchant = accountRole.accessLevel !== "internal";

  useEffect(() => {
    setFieldValue("accountRole.role", "");
  }, [accountRole.accessLevel, setFieldValue]);

  useEffect(() => {
    setFieldValue("accountRole.asignToMerchant", "");
  }, [accountRole.role, setFieldValue]);

  const SelectionItem = ({ dataArray, groupValue }: SelectionItemProps) => {
    return (
      <div>
        {dataArray?.map((item: any, index: any) => {
          const isItemSelected = item.value === groupValue;
          return (
            <div
              key={index}
              className={`${isItemSelected ? `bg-[var(--color-primary-light)]` : ``}`}
            >
              <SelectItem value={item.value}>
                <div>
                  <div>
                    <p
                      className={`text-B-12-12-400 ${isItemSelected ? `text-[var(--color-primary)]` : `text-[var(--color-gray-800)]`}`}
                    >
                      {item.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-B-12-12-400 text-[var(--color-gray-600)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SelectItem>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Card id="account-role">
        <CardHeader>
          <CardTitle>Account Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Access Level */}
          <div className="flex items-center gap-4">
            <Label
              htmlFor="accessLevel"
              className="w-48 text-left text-sm font-medium"
            >
              Access Level
            </Label>
            <Select
              value={accountRole.accessLevel}
              onValueChange={(value) => {
                setFieldValue("accountRole.accessLevel", value);
              }}
            >
              <SelectTrigger className="flex-1">
                {!labelAccesLevel ? (
                  <SelectValue placeholder="Choose Access Level" />
                ) : (
                  <div>
                    <p className="text-B-12-12-400 text-[var(--color-grey-800)]">
                      {labelAccesLevel.label}
                    </p>
                  </div>
                )}
              </SelectTrigger>
              <SelectContent>
                {/* value must be from data access level  */}
                <SelectionItem
                  dataArray={accessLevelList}
                  groupValue={accountRole.accessLevel}
                  groupKey={"accessLevel"}
                />
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Label
              htmlFor="role"
              className="w-48 text-left text-sm font-medium"
            >
              Role
            </Label>
            <Select
              disabled={!accountRole.accessLevel}
              value={accountRole.role}
              onValueChange={(value) => {
                setFieldValue("accountRole.role", value);
              }}
            >
              <SelectTrigger
                className="flex-1"
                error={true}
                errorText="Role is required"
              >
                {/* <SelectValue placeholder="Choose Role" /> */}
                {!labelRole ? (
                  <SelectValue placeholder="Choose Role" />
                ) : (
                  <div>
                    <p className="text-B-12-12-400 text-[var(--color-grey-800)]">
                      {labelRole.label}
                    </p>
                  </div>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectionItem
                  dataArray={roleList}
                  groupValue={accountRole.role}
                  groupKey={"role"}
                />
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {isShowAsignToMerchant && (
        <Card id="user-assignment" className="mt-7.5">
          <CardHeader>
            <CardTitle>User Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Access Level */}
            <div className="flex items-center gap-4">
              <Label
                htmlFor="accessLevel"
                className="w-48 min-w-48 text-left text-sm font-medium"
              >
                Assign User to Merchant
              </Label>
              {accountRole.asignToMerchant ? (
                <InputAction
                  value={accountRole.asignToMerchant}
                  disabled={true}
                  onClick={() => setIsOpenSelectTableMerchant(true)}
                  buttonText="Change"
                  buttonVariant="outline"
                  buttonClassName="bg-primary-light text-primary border border-primary-clarity-20"
                />
              ) : (
                <div className="flex items-center justify-start gap-4">
                  <Button
                    variant={"outline"}
                    onClick={() => setIsOpenSelectTableMerchant(true)}
                    className="bg-primary-light text-primary border border-primary-clarity-20"
                  >
                    Select Merchant
                  </Button>
                  <p className="text-gray-600 text-xs">
                    Please select a merchant
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <SelectTableMerchant
        open={isOpenSelectTableMerchant}
        onOpenChange={setIsOpenSelectTableMerchant}
        onSelectMerchant={(merchant) => {
          setFieldValue("accountRole.asignToMerchant", merchant.clientId);
        }}
      />
    </>
  );
};

export default AccountRole;

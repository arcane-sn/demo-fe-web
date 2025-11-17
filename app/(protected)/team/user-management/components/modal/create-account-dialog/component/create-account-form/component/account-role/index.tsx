import React, { useEffect } from "react";
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
import { accessLevelList, roleList } from "./core/hooks";
import { AccountRoleProps, SelectionItemProps } from "./core/types";

const AccountRole: React.FC<AccountRoleProps> = ({ groupValue, setValue }) => {
  const labelAccesLevel = accessLevelList.find(
    (item) => item.value === groupValue.accessLevel
  );
  const labelRole = roleList.find((item) => item.value === groupValue.role);
  const isShowAsignToMerchant = groupValue.accessLevel !== "internal";

  useEffect(() => {
    setValue("role", "");
  }, [groupValue.accessLevel]);
  useEffect(() => {
    setValue("asignToMerchant", "");
  }, [groupValue.role]);

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
            value={groupValue.accessLevel}
            onValueChange={async (value) => {
              setValue("accessLevel", value);
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
                groupValue={groupValue.accessLevel}
                groupKey={"accessLevel"}
              />
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="role" className="w-48 text-left text-sm font-medium">
            Role
          </Label>
          <Select
            disabled={!groupValue.accessLevel}
            value={groupValue.role}
            onValueChange={(value) => {
              setValue("role", value);
            }}
          >
            <SelectTrigger className="flex-1">
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
                groupValue={groupValue.role}
                groupKey={"role"}
              />
            </SelectContent>
          </Select>
        </div>
        {isShowAsignToMerchant && (
          <div className="flex items-center gap-4">
            <Label
              htmlFor="asignToMerchant"
              className="w-48 text-left text-sm font-medium"
            >
              Asign to Merchant
            </Label>
            <Input
              value={groupValue.asignToMerchant}
              onChange={(e) => {
                setValue("asignToMerchant", e.target.value);
              }}
              placeholder="Input Client ID"
              className="flex-1"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountRole;

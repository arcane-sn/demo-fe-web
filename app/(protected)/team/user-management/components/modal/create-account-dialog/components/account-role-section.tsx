"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_OPTIONS } from "../core/constants";
import { AccountRoleValues } from "../core/types";

interface AccountRoleSectionProps {
  values: AccountRoleValues;
  onChange: (field: keyof AccountRoleValues, value: string) => void;
}

export const AccountRoleSection = ({
  values,
  onChange,
}: AccountRoleSectionProps) => {
  const selectedRole = ROLE_OPTIONS.find(
    (option) => option.value === values.role,
  );

  return (
    <Card id="account-role" data-scrollspy-anchor="account-role">
      <CardHeader>
        <CardTitle>Account Role</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Label className="w-48 text-left text-sm font-medium">Role</Label>
          <Select
            value={values.role}
            onValueChange={(next) => {
              onChange("role", next);
            }}
          >
            <SelectTrigger className="flex-1 text-left">
              {selectedRole ? (
                <span className="text-sm font-medium text-gray-900">
                    {selectedRole.label}
                </span>
              ) : (
                <SelectValue placeholder="Choose role" />
              )}
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};


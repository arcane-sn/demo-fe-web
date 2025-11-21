"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InputPassword } from "@/components/ui/input-password";
import { Icons } from "@/components/common/icons";
import { TemporaryPasswordValues } from "../core/types";
import {
  isPasswordCombinationLetterNumberSymbol,
  isPasswordContainUppercase,
  isPasswordLeast8Char,
} from "../core/password-utils";

interface TemporaryPasswordSectionProps {
  values: TemporaryPasswordValues;
  onChange: (
    field: keyof TemporaryPasswordValues,
    value: string | boolean,
  ) => void;
}

export const TemporaryPasswordSection = ({
  values,
  onChange,
}: TemporaryPasswordSectionProps) => {
  const renderCriteria = () => (
    <div className="pt-2">
      <CriteriaRow
          checked={isPasswordLeast8Char(values.password)}
        label="At least 8 characters"
      />
      <CriteriaRow
        checked={isPasswordContainUppercase(values.password)}
        label="At least one uppercase letter"
      />
      <CriteriaRow
        checked={isPasswordCombinationLetterNumberSymbol(values.password)}
        label="A combination of letters, numbers, and symbols"
      />
    </div>
  );

  return (
    <Card
      id="temporary-password"
      data-scrollspy-anchor="temporary-password"
    >
      <CardHeader>
        <CardTitle>Temporary Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-b-12-12-400 text-[var(--color-gray-600)]">
          A temporary password is provided for the user&apos;s first login. After
          successfully logging in, the user will be required to change the
          password. If the toggle is off, the password will be generated
          automatically.
        </p>
      </CardContent>
    </Card>
  );
};

const CriteriaRow = ({
  checked,
  label,
}: {
  checked: boolean;
  label: string;
}) => (
  <div className="flex w-full items-center gap-2">
    <div>{checked ? <Icons.check_circle /> : <Icons.cross_circle />}</div>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);


import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDialogStore } from "@/app/(protected)/team/user-management/core/hooks/use-dialog";
import { UserData } from "@/app/(protected)/team/user-management/components/user-list-table/core/types";
import ResetPasswordEmailDialog from "../../reset-password";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PasswordProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: UserData;
  sectionId: string;
}

const Password: React.FC<PasswordProps> = ({
  groupValue,
  setValue,
  accountData,
  sectionId,
}) => {
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(false);
  const { openResetPasswordEmail } = useDialogStore();

  const renderConfirmation = () => (
    <Table>
      <TableBody>
        <TableRow className="border-0 hover:!bg-transparent">
          <TableCell className="w-1/3 align-top pt-6">
            <Label>User Confirmation</Label>
          </TableCell>
          <TableCell>
          <InputPassword
            value={groupValue.currentPassword}
            onChange={(e) => setValue("currentPassword", e.target.value)}
            placeholder="Input your password"
          />
            <div className="flex pt-4 gap-2">
              <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                Enter your password to continue resetting or changing the account
                password.
              </p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-600 border-blue-600"
                  disabled={!groupValue.currentPassword}
                  onClick={() => setPasswordConfirmed(true)}
                >
                  Confirm Password
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    );

  const renderPasswordForm = () => (
    <Table>
      <TableBody>
        <TableRow className="border-0 hover:!bg-transparent">
          <TableCell className="w-1/3">
            <Label>User</Label>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-between rounded-md border border-dashed border-muted-foreground/30 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {groupValue.userName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {groupValue.email}
                </p>
                </div>
                <Badge variant="primary" appearance="light" size="sm">
                Active
                </Badge>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="border-0 hover:!bg-transparent">
          <TableCell className="w-1/4 align-top pt-5">
            <Label>New Password</Label>
          </TableCell>
          <TableCell>
              <InputPassword
                value={groupValue.newPassword}
                onChange={(e) => setValue("newPassword", e.target.value)}
                placeholder="New password"
                showCriteria
              />
          </TableCell>
        </TableRow>
        <TableRow className="border-0 hover:!bg-transparent">
          <TableCell className="w-1/4">
            <Label>Confirm Password</Label>
          </TableCell>
          <TableCell>
              <InputPassword
                value={groupValue.confirmPassword}
                onChange={(e) => setValue("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
              />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    );

  return (
    <Card id={sectionId} data-scrollspy-anchor={sectionId}>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Password last changed 2 months ago. Confirm your identity before
          applying updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        {!passwordConfirmed ? renderConfirmation() : renderPasswordForm()}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            disabled={!passwordConfirmed}
            onClick={() => openResetPasswordEmail()}
          >
            Reset Password
          </Button>
          <Button
            variant="primary"
            disabled={
              !passwordConfirmed ||
              !groupValue.newPassword ||
              !groupValue.confirmPassword
            }
            onClick={() => console.log("Change Password clicked")}
          >
            Change Password
          </Button>
        </div>
      </CardContent>

      <ResetPasswordEmailDialog
        trigger={<div />}
        onSuccessClose={() => {
          console.log("Reset password email dialog closed");
        }}
        userEmail={accountData?.email}
      />
    </Card>
  );
};

export default Password;

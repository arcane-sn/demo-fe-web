import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { UserData } from "@/app/(protected)/team/user-management/components/user-list-table/core/types";
import DeleteAccountConfirmationDialog from "../../delete-confirmation";
import DeactivateAccountConfirmationDialog from "../../deactive-confirmation";
import { useDialogStore } from "@/app/(protected)/team/user-management/core/hooks/use-dialog";

interface DeleteAccountProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: UserData;
  close: () => void;
  sectionId: string;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  groupValue,
  setValue,
  accountData,
  close,
  sectionId,
}) => {
  const { openDeleteConfirmation, openDeactivateConfirmation } =
    useDialogStore();

  return (
    <Card id={sectionId} data-scrollspy-anchor={sectionId}>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently remove this account and all related data
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <p className="text-sm text-muted-foreground">
          Once deleted, this user and all related data will be removed. The same
          email can be reused to create a new account later.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Checkbox
            id="confirm-delete"
            checked={groupValue.confirmDelete}
            onCheckedChange={(checked) => setValue("confirmDelete", checked)}
          />
          <label
            htmlFor="confirm-delete"
            className="text-sm font-medium text-foreground"
          >
            Confirm deleting account
          </label>
        </div>
        <div className="mt-4 flex items-start gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Super Admin cannot be deleted from here. Use merchant deletion
            instead.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => openDeactivateConfirmation()}
          >
            Deactivate Instead
          </Button>
          <Button
            variant="destructive"
            disabled={!groupValue.confirmDelete}
            onClick={() => openDeleteConfirmation()}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>

      <DeleteAccountConfirmationDialog
        trigger={<div />}
        onConfirmDelete={(password) =>
          console.log("Deleting account with password:", password)
        }
        onSuccessClose={close}
        accountData={{
          userName: accountData?.userName,
          email: accountData?.email,
        }}
      />

      <DeactivateAccountConfirmationDialog
        trigger={<div />}
        onConfirmDeactivate={() => console.log("Deactivating account")}
        onSuccessClose={close}
        accountData={{
          userName: accountData?.userName,
          email: accountData?.email,
        }}
      />
    </Card>
  );
};

export default DeleteAccount;

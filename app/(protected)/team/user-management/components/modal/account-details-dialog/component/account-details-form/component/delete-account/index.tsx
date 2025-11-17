import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { UserData } from "@/app/(protected)/team/user-management/components/user-list-table/core/types";
import DeleteAccountConfirmationDialog from "../../../../../delete-account-confirmation-dialog";
import DeactivateAccountConfirmationDialog from "../../../../../deactive-account-confirmation-dialog";
import { useDialogStore } from "@/app/(protected)/team/user-management/core/hooks/use-dialog";

interface DeleteAccountProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  accountData?: UserData;
  close: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  groupValue,
  setValue,
  accountData,
}) => {
  const { openDeleteConfirmation, openDeactivateConfirmation } =
    useDialogStore();

  const handleDeleteAccount = () => {
    openDeleteConfirmation();
  };

  const handleConfirmDelete = (password: string) => {
    console.log("Deleting account with password:", password);
    // Add your delete account logic here
    // After successful deletion, the success dialog will be shown automatically
  };

  const handleDeactivateAccount = () => {
    openDeactivateConfirmation();
  };

  const handleConfirmDeactivate = () => {
    console.log("Deactivating account");
    // Add your deactivate account logic here
    // After successful deactivation, the success dialog will be shown automatically
  };
  return (
    <Card
      id="delete-account"
      className="border border-gray-200 shadow-sm rounded-xl"
    >
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Delete Account
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {/* Warning Message */}
        <p className="text-sm text-gray-800 mb-6">
          Once deleted, this account and all related data will be permanently
          removed. You may still use the same email address to create a new
          account in the future
        </p>

        {/* Confirmation Checkbox */}
        <div className="flex items-center gap-3 mb-6">
          <Checkbox
            id="confirm-delete"
            checked={groupValue.confirmDelete}
            onCheckedChange={(checked) => setValue("confirmDelete", checked)}
            className="border-gray-300"
          />
          <label
            htmlFor="confirm-delete"
            className="text-sm font-medium text-gray-800 cursor-pointer"
          >
            Confirm deleting account
          </label>
        </div>

        {/* Information Message */}
        <div className="flex items-start gap-2 mb-8">
          <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600">
            Super Admin cannot be deleted here. Can be deleted through merchant
            deletion.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleDeactivateAccount}
          >
            Deactivate Instead
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={!groupValue.confirmDelete}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <DeleteAccountConfirmationDialog
        trigger={<div />}
        onConfirmDelete={handleConfirmDelete}
        onSuccessClose={close} // Close the account-details dialog when success dialog closes
        accountData={{
          userName: accountData?.userName,
          email: accountData?.email,
        }}
      />

      {/* Deactivate Confirmation Dialog */}
      <DeactivateAccountConfirmationDialog
        trigger={<div />}
        onConfirmDeactivate={handleConfirmDeactivate}
        onSuccessClose={close} // Close the account-details dialog when success dialog closes
        accountData={{
          userName: accountData?.userName,
          email: accountData?.email,
        }}
      />
    </Card>
  );
};

export default DeleteAccount;

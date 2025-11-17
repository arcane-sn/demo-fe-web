import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { useState } from "react";
import { useDialogStore } from "../../core/hooks/use-dialog";
import DeleteAccountConfirmationDialog from "../dialog-delete-account-confirmation";
import DeactivateAccountConfirmationDialog from "../dialog-deactivate-confirmation";
import DeactivateAccountSuccessDialog from "../dialog-deactivate-success";

const DeleteAccount: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { openDeleteAccountConfirmation, openDeactivateConfirmation } =
    useDialogStore();

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      openDeleteAccountConfirmation();
    }
  };

  const handleConfirmDelete = () => {
    // Handle the actual delete account logic here
    console.log("Account deleted successfully");
  };

  const handleDeactivateAccount = () => {
    openDeactivateConfirmation();
  };

  const handleConfirmDeactivate = () => {
    // Handle the actual deactivate account logic here
    console.log("Account deactivated successfully");
  };

  return (
    <Card className="border border-gray-200 shadow-sm rounded-xl">
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
            checked={confirmDelete}
            onCheckedChange={(checked) => setConfirmDelete(!!checked)}
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
            disabled={!confirmDelete}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>

      {/* Delete Account Confirmation Dialog */}
      <DeleteAccountConfirmationDialog
        trigger={<div />}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Deactivate Account Confirmation Dialog */}
      <DeactivateAccountConfirmationDialog
        trigger={<div />}
        onConfirmDeactivate={handleConfirmDeactivate}
      />

      {/* Deactivate Account Success Dialog */}
      <DeactivateAccountSuccessDialog trigger={<div />} />
    </Card>
  );
};

export default DeleteAccount;

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Icons } from "@/components/common/icons";
import AccountListTable from "./component/account-list-table";
import { accountListMock } from "./core/hooks";
import CreateAccountDialog from "./component/create-account-dialog";
import { useState } from "react";
import DialogAccountSuccess from "./component/created-account-success-dialog";
import ModalExport from "@/app/(protected)/components/modal/export/modal-export";

export default function AccountListPage() {
  const createAccount = () => {
    console.log("create account btn");
  };

  const mockData = [];

  const [isOpen, setIsOpen] = useState(false);
  const [dialogCreateAccountSuccess, setDialogCreateAccountSuccess] =
    useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="container mx-auto pb-6 pl-6 pr-6">
      <div className="flex flex-row justify-between">
        <div className="">
          <h1 className="text-b-20-20-500 flex items-center gap-2">
            Account List
          </h1>
          <p className="text-B-14-14-400 text-[var(--color-gray-700)]">
            View and manage all registered accounts
          </p>
        </div>
        <div className="pl-6">
          <CreateAccountDialog
            isOpen={isOpen}
            close={() => {
              setIsOpen(false);
              setDialogCreateAccountSuccess(true);
            }}
            triger={
              <Button
                type="button"
                onClick={() => {
                  console.log("pressed");
                  setIsOpen(true);
                }}
              >
                {/* <Icons.apple /> */}
                Create New Account
              </Button>
            }
          ></CreateAccountDialog>
        </div>
      </div>

      <div>
        <DialogAccountSuccess
          visible={dialogCreateAccountSuccess}
          // visible={true}
          close={() => {
            setDialogCreateAccountSuccess(false);
          }}
        />
      </div>

      <div className="pt-12">
        <AccountListTable
          data={accountListMock}
          onOpenExport={() => setShowExportModal(true)}
        />
      </div>

      {/* Export Modal */}
      <ModalExport
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}

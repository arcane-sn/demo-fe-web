"use client";

import { Button } from "@/components/ui/button";
import { RiUserAddFill } from "@remixicon/react";
import CreateAccountDialog from "./modal/create-account-dialog";
import { useState } from "react";
import UserListTable from "./user-list-table";
import { userListMock } from "../core/hooks";

const UserManagementContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="w-full">
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
          <Button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <RiUserAddFill />
            Invite User
          </Button>
        </div>
      </div>
      <CreateAccountDialog
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
        }}
      />

      {/* Table */}
      <div className="pt-6">
        <UserListTable
          data={userListMock}
          onOpenExport={() => setShowExportModal(true)}
        />
      </div>
    </div>
  );
};

export default UserManagementContent;

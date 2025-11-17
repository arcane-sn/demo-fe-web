"use client";

import React, { useMemo, useState } from "react";
import { ReusableTable } from "@/components/table";
import { headerConfig, footerConfig } from "./core/hooks";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getUserColumns } from "./core/hooks/columnData";
import { UserData, UserServiceTableProps } from "./core/types";
import { useUserTableConfig } from "./core/hooks/use-user-table-config";
import AccountDetailsDialog from "../modal/account-details-dialog";

const UserListTable: React.FC<UserServiceTableProps> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
  onSelectionChange,
  onView,
  onOpenExport,
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | undefined>(
    undefined
  );
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);

  // Handle filter button press
  const handleFilterPressed = () => {
    console.log("User list filter button pressed");
    // Add filter logic here
  };

  // Handle filter application
  const handleApplyFilter = (filters: any) => {
    console.log("Applied filters:", filters);
    // Add your filter logic here
  };

  // Handle filter reset
  const handleResetFilter = () => {
    console.log("Reset filters");
    // Add your reset logic here
  };

  const columns = useMemo(
    () => getUserColumns({ copyToClipboard }), // Pass the required utility function
    [copyToClipboard] // Dependency on copyToClipboard
  );

  // Use the custom hook for table configuration with TypeScript interfaces
  const { tableConfig, toolbarConfig } = useUserTableConfig({
    data,
    columns,
    onOpenExport,
  });

  return (
    <div>
      <AccountDetailsDialog
        visible={isUserDetailsDialogOpen}
        close={() => {
          setIsUserDetailsDialogOpen(false);
          setSelectedUser(undefined);
        }}
        accountData={selectedUser}
      />
      <ReusableTable
        config={tableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        onFilterPressed={handleFilterPressed}
        onRowClick={(row: any) => {
          console.log("row clicked", row);
          setSelectedUser(row);
          setIsUserDetailsDialogOpen(true);
        }}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default UserListTable;

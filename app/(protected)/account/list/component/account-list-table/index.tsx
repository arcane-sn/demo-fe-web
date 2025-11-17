"use client";

import React, { useMemo, useState } from "react";
import { ReusableTable } from "@/components/table";
import { headerConfig, footerConfig } from "./core/hooks";
import {
  AccountData,
  AccountServiceTableProps,
  AccountTableConfig,
  useAccountTableConfig,
} from "./core";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getAccountColumns } from "./core/hooks/columnData";
import AccountDetailsDialog from "../account-details-dialog";
import FilterAccountListDialog from "../filter-account-list-dialog";
import { useDialogStore } from "../../core/hooks/use-dialog";

const AccountListTable: React.FC<AccountServiceTableProps> = ({
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
  const [selectedAccount, setSelectedAccount] = useState<
    AccountData | undefined
  >(undefined);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const { openAccountDetails, closeAccountDetails } = useDialogStore();

  // Handle filter button press
  const handleFilterPressed = () => {
    console.log("Account list filter button pressed");
    setIsFilterDialogOpen(true);
  };

  // Handle filter application
  const handleApplyFilter = (filters: any) => {
    console.log("Applied filters:", filters);
    // Add your filter logic here
    // For example: update the data based on filters
    setIsFilterDialogOpen(false);
  };

  // Handle filter reset
  const handleResetFilter = () => {
    console.log("Reset filters");
    // Add your reset logic here
  };

  const columns = useMemo(
    () => getAccountColumns({ copyToClipboard }), // Pass the required utility function
    [copyToClipboard] // Dependency on copyToClipboard
  );

  // Use the custom hook for table configuration with TypeScript interfaces
  const { tableConfig, toolbarConfig } = useAccountTableConfig({
    data,
    columns,
    onOpenExport,
  });

  return (
    <div>
      <AccountDetailsDialog
        visible={false}
        close={() => {
          console.log("close account details dialog");
          closeAccountDetails();
        }}
        accountData={selectedAccount}
      />

      <FilterAccountListDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        onApplyFilter={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <ReusableTable
        config={tableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        // actionConfig={actionConfig}
        // onSelectionChange={onSelectionChange}
        onFilterPressed={handleFilterPressed}
        onRowClick={(row: any) => {
          console.log("row clicked", row);
          setSelectedAccount(row);
          openAccountDetails();
        }}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default AccountListTable;

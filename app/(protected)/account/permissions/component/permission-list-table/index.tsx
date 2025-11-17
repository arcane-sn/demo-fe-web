"use client";

import React, { useMemo, useState } from "react";
import { ReusableTable } from "@/components/table";
import { headerConfig, footerConfig } from "./core/hooks";
import {
  PermissionData,
  PermissionServiceTableProps,
  PermissionTableConfig,
  usePermissionTableConfig,
} from "./core";
import { getPermissionColumns } from "./core/hooks/columnData";

const PermissionListTable: React.FC<PermissionServiceTableProps> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
  onSelectionChange,
  onView,
  onOpenExport,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<
    PermissionData | undefined
  >(undefined);

  // Handle filter button press
  const handleFilterPressed = () => {
    console.log("Permission list filter button pressed");
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

  const columns = useMemo(() => getPermissionColumns(), []);

  // Use the custom hook for table configuration with TypeScript interfaces
  const { tableConfig, toolbarConfig } = usePermissionTableConfig({
    data,
    columns,
    onOpenExport,
  });

  return (
    <div>
      <ReusableTable
        config={tableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        onFilterPressed={handleFilterPressed}
        onRowClick={(row: any) => {
          console.log("row clicked", row);
          setSelectedPermission(row);
          if (onView) {
            onView(row);
          }
        }}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default PermissionListTable;

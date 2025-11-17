"use client";
import React, { useMemo, useState } from "react";
import { headerConfig, footerConfig } from "./core/hooks";
import { ReusableTable } from "@/components/table";
import { AuditLogData, getAuditLogColumns } from "./core/hooks/columnData";
import {
  AuditLogServiceTableProps,
  useAuditLogTableConfig,
} from "./core/hooks/use-audit-log-table-config";

const AuditLogTable: React.FC<AuditLogServiceTableProps> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
  onSelectionChange,
  onView,
  onOpenExport,
  onOpenFilters,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLogData | undefined>(
    undefined
  );

  // Handle filter button press
  const handleFilterPressed = () => {
    console.log("Audit log filter button pressed");
    if (onOpenFilters) {
      onOpenFilters();
    }
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

  const columns = useMemo(() => getAuditLogColumns(), []);

  // Use the custom hook for table configuration with TypeScript interfaces
  const { tableConfig, toolbarConfig } = useAuditLogTableConfig({
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
          setSelectedLog(row);
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

export default AuditLogTable;

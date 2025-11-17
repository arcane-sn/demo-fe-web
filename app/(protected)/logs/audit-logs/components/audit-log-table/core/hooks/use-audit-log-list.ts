import { useState } from "react";
import { AuditLogData } from "./columnData";

export const useAuditLogList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectionChange = (selectedRows: AuditLogData[]) => {
    console.log("Selected audit logs:", selectedRows);
    // Add your selection change logic here
  };

  return {
    loading,
    error,
    handleSelectionChange,
  };
};


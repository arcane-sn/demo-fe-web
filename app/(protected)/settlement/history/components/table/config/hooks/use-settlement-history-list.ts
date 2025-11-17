import { useState } from "react";
import { SettlementHistoryData } from "./columnData";

export const useSettlementHistoryList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectionChange = (selectedRows: SettlementHistoryData[]) => {
    console.log("Selected settlements:", selectedRows);
    // Add your selection change logic here
  };

  return {
    loading,
    error,
    handleSelectionChange,
  };
};

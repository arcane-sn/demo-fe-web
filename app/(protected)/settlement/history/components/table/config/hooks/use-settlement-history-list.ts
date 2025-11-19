import { useState } from "react";
export const useSettlementHistoryList = () => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return {
    loading,
    error,
  };
};

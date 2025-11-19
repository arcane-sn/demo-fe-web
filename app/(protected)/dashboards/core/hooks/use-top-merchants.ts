import { useState, useMemo } from "react";
import { MerchantSortBy } from "../models";
import { MOCK_MERCHANTS } from "../data/mock-data";
import { sortMerchants } from "../helpers";

export const useTopMerchants = () => {
  const [sortBy, setSortBy] = useState<MerchantSortBy>("byAmount");

  const sortedMerchants = useMemo(() => {
    return sortMerchants(MOCK_MERCHANTS, sortBy);
  }, [sortBy]);

  return {
    merchants: sortedMerchants,
    sortBy,
    setSortBy,
  };
};


"use client";

import React from "react";
import { ReusableTable, TableConfig } from "@/components/table";
import {
  ProviderMasterData,
  MOCK_PROVIDER_MASTER_DATA,
  PROVIDER_MASTER_DATA_TABLE_CONFIG,
  PROVIDER_SEARCH_FIELDS,
} from "../core";
import { useProviderMasterDataColumns } from "../hooks";
import FilterMasterData from "./FilterMasterData";

export function TableMasterData() {
  // Table configuration
  const tableConfig: TableConfig<ProviderMasterData> = {
    data: MOCK_PROVIDER_MASTER_DATA,
    columns: useProviderMasterDataColumns(),
    ...PROVIDER_MASTER_DATA_TABLE_CONFIG,
    searchFields: PROVIDER_SEARCH_FIELDS,
  };

  const handleRowClick = (row: { original: ProviderMasterData }) => {
    console.log("Row clicked:", row.original);
    // You can navigate to detail page or open modal here
  };

  const handleSelectionChange = (selectedRows: ProviderMasterData[]) => {
    console.log("Selected providers:", selectedRows);
  };

  return (
    <ReusableTable
      headerConfig={{
        customHeader: <FilterMasterData />,
      }}
      config={tableConfig}
      onRowClick={handleRowClick}
      onSelectionChange={handleSelectionChange}
      emptyStateConfig={{
        type: "noData",
        title: "No Providers Found",
        description:
          "Looks like you don't have any providers yet. Create your first provider to get started.",
        illustration: (
          <img
            src="/assets/illustrations/puzzle.svg"
            alt="No providers illustration"
            className="w-32 h-32"
          />
        ),
      }}
    />
  );
}

export default TableMasterData;

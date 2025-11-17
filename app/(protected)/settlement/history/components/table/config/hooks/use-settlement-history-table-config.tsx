import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SettlementHistoryData } from "./columnData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface SettlementHistoryTableConfig {
  data: SettlementHistoryData[];
  columns: ColumnDef<SettlementHistoryData>[];
  onRowClick?: (row: SettlementHistoryData) => void;
  onSelectionChange?: (selectedRows: SettlementHistoryData[]) => void;
}

export interface SettlementHistoryServiceTableProps {
  data: SettlementHistoryData[];
  loading?: boolean;
  error?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSelectionChange?: (selectedRows: SettlementHistoryData[]) => void;
  onView?: (row: SettlementHistoryData) => void;
  onOpenExport?: () => void;
  onOpenFilters?: () => void;
}

export const useSettlementHistoryTableConfig = ({
  data,
  columns,
  onOpenExport,
}: {
  data: SettlementHistoryData[];
  columns: ColumnDef<SettlementHistoryData>[];
  onOpenExport?: () => void;
}) => {
  const tableConfig: SettlementHistoryTableConfig = useMemo(
    () => ({
      data,
      columns,
      customFilters: [
        {
          id: "transactionType",
          label: "Transaction Type",
          type: "multiselect" as const,
          options: [{ label: "Transfer", value: "transfer", count: 4 }],
        },
      ],
    }),
    [data, columns]
  );

  const toolbarConfig = useMemo(
    () => ({
      title: "Settlement History",
      subtitle: "View all settled transactions",
      showSearch: true,
      showFilters: true,
      showCustomActions: true,
      customActions: (
        <Button variant="outline" onClick={onOpenExport}>
          <Download className="h-4 w-4" /> Export
        </Button>
      ),
    }),

    [onOpenExport]
  );

  return {
    tableConfig,
    toolbarConfig,
  };
};

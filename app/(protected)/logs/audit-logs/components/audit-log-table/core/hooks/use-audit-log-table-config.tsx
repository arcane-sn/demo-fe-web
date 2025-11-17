import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLogData } from "./columnData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface AuditLogTableConfig {
  data: AuditLogData[];
  columns: ColumnDef<AuditLogData>[];
  onRowClick?: (row: AuditLogData) => void;
  onSelectionChange?: (selectedRows: AuditLogData[]) => void;
}

export interface AuditLogServiceTableProps {
  data: AuditLogData[];
  loading?: boolean;
  error?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSelectionChange?: (selectedRows: AuditLogData[]) => void;
  onView?: (row: AuditLogData) => void;
  onOpenExport?: () => void;
  onOpenFilters?: () => void;
}

export const useAuditLogTableConfig = ({
  data,
  columns,
  onOpenExport,
}: {
  data: AuditLogData[];
  columns: ColumnDef<AuditLogData>[];
  onOpenExport?: () => void;
}) => {
  const tableConfig: AuditLogTableConfig = useMemo(
    () => ({
      data,
      columns,
      customFilters: [
        {
          id: "actionType",
          label: "Action Type",
          type: "multiselect" as const,
          options: [
            { label: "CREATE", value: "create", count: 4 },
            { label: "UPDATE", value: "update", count: 8 },
            { label: "DELETE", value: "delete", count: 2 },
          ],
        },
      ],
    }),
    [data, columns]
  );

  const toolbarConfig = useMemo(
    () => ({
      title: "Audit Logs",
      subtitle: "View all system activity logs",
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

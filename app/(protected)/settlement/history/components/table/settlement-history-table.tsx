import { ReusableTable } from "@/components/table";
import {
  getSettlementHistoryColumns,
  SettlementHistoryData,
} from "./config/hooks/columnData";
import { useMemo, useState } from "react";
import {
  footerConfig,
  headerConfig,
  SettlementHistoryServiceTableProps,
  useSettlementHistoryTableConfig,
} from "./config";

const SettlementHistoryTable: React.FC<SettlementHistoryServiceTableProps> = ({
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
  const [selectedSettlement, setSelectedSettlement] = useState<
    SettlementHistoryData | undefined
  >(undefined);

  // Handle filter button press
  const handleFilterPressed = () => {
    console.log("Settlement history filter button pressed");
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

  const columns = useMemo(() => getSettlementHistoryColumns(), []);

  // Use the custom hook for table configuration with TypeScript interfaces
  const { tableConfig, toolbarConfig } = useSettlementHistoryTableConfig({
    data,
    columns,
    onOpenExport,
  });

  const additionalHeaderConfig = useMemo(
    () => ({
      ...headerConfig,
      onFilterPressed: onOpenFilters,
    }),
    []
  );

  console.log(toolbarConfig, "toolbarConfig");
  return (
    <div>
      <ReusableTable
        config={tableConfig}
        headerConfig={additionalHeaderConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        onFilterPressed={handleFilterPressed}
        onRowClick={(row: any) => {
          console.log("row clicked", row);
          setSelectedSettlement(row);
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

export default SettlementHistoryTable;

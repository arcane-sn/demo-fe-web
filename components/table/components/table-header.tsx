import React from "react";
import { CardHeader, CardHeading } from "@/components/ui/card";
import { TableHeaderConfig, TableFilter } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import { Filter, Settings2 } from "lucide-react";

interface TableHeaderProps {
  config?: TableHeaderConfig;
  recordCount?: number;
  children?: React.ReactNode;
  // Bottom mode props
  mode?: "default" | "bottom";
  filters?: TableFilter[];
  activeFiltersCount?: number;
  onFilterChange?: (filterId: string, value: any) => void;
  onClearFilters?: () => void;
  onFilterPressed?: () => void;
  table?: any;
  toolbarConfig?: any;
}

export function TableHeader({
  config,
  recordCount,
  children,
  mode = "default",
  filters = [],
  activeFiltersCount = 0,
  onFilterChange,
  onClearFilters,
  onFilterPressed,
  table,
  toolbarConfig,
}: TableHeaderProps) {
  if (config?.customHeader) {
    return <>{config.customHeader}</>;
  }

  // Bottom mode layout - title on left, actions on right
  if (mode === "bottom") {
    return (
      <div className="flex items-center justify-between">
        {/* Title section */}
        <div>
          <h2 className="text-sm font-medium text-[#071437] leading-[14px]">
            {config?.title || "Account List"}
          </h2>
          {config?.subtitle && (
            <p className="text-sm text-muted-foreground mt-1">
              {config.subtitle}
            </p>
          )}
          {config?.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {config.description}
            </p>
          )}
          {config?.showRecordCount && recordCount !== undefined && (
            <p className="text-xs text-muted-foreground mt-1">
              {recordCount} records found
            </p>
          )}
        </div>

        {/* Actions section */}
        <div className="flex items-center gap-2.5">
          {/* Filters */}
          {toolbarConfig?.showFilters !== false && filters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="px-2.5 py-2.25 bg-white border-[#DBDFE9] hover:bg-gray-50"
              onClick={onFilterPressed}
            >
              <Filter className="w-3.5 h-3.5 text-[#99A1B7]" />
              <span className="text-xs font-medium text-[#4B5675]">Filter</span>
              {activeFiltersCount > 0 && (
                <Badge size="sm" variant="outline">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Custom Actions */}
          {toolbarConfig?.showCustomActions && toolbarConfig?.customActions}

          {/* Column Visibility */}
          {toolbarConfig?.showColumnVisibility !== false && table && (
            <DataGridColumnVisibility
              table={table}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="px-2.5 py-2.25 bg-white border-[#DBDFE9] hover:bg-gray-50"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#99A1B7]" />
                  <span className="text-xs font-medium text-[#4B5675]">
                    Column
                  </span>
                </Button>
              }
            />
          )}
        </div>
      </div>
    );
  }

  // Default mode layout
  return (
    <div className="flex items-center justify-between flex-wrap min-h-14 gap-2.5">
      {config?.title && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{config.title}</h2>
            {config.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {config.subtitle}
              </p>
            )}
            {config.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {config.description}
              </p>
            )}
            {config.showRecordCount && recordCount !== undefined && (
              <p className="text-xs text-muted-foreground mt-1">
                {recordCount} records found
              </p>
            )}
          </div>
          {children}
        </div>
      )}
      {!config?.title && children}
    </div>
  );
}

import React from "react";
import { Search, X, Filter, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CardToolbar } from "@/components/ui/card";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import { SearchBar } from "@/components/ui/search-bar";
import { ToolbarConfig, TableFilter } from "../types";

interface TableToolbarProps {
  config?: ToolbarConfig;
  searchQuery: string;
  searchField: string;
  onSearchChange: (query: string) => void;
  onSearchFieldChange: (field: string) => void;
  filters: TableFilter[];
  activeFiltersCount: number;
  onFilterChange: (filterId: string, value: any) => void;
  onClearFilters: () => void;
  onFilterPressed?: () => void;
  table: any; // TanStack Table instance
  // SearchBar specific props
  showSearchBar?: boolean;
  searchBarPlaceholder?: string;
  searchBarOptions?: Array<{ value: string; label: string }>;
  searchBarPlaceholderMapping?: Record<string, string>;
  // Layout mode
  mode?: "default" | "bottom";
}

export function TableToolbar({
  config,
  searchQuery,
  searchField,
  onSearchChange,
  onSearchFieldChange,
  filters,
  activeFiltersCount,
  onFilterChange,
  onClearFilters,
  onFilterPressed,
  table,
  showSearchBar = false,
  searchBarPlaceholder = "Search merchant name",
  searchBarOptions,
  searchBarPlaceholderMapping,
  mode = "default",
}: TableToolbarProps) {
  if (!config) return null;

  // Bottom mode layout - only search bar (actions are in TableHeader)
  if (mode === "bottom") {
    return (
      <div className="flex justify-start">
        {showSearchBar && (
          <SearchBar
            searchField={searchField}
            searchQuery={searchQuery}
            onFieldChange={onSearchFieldChange}
            onQueryChange={onSearchChange}
            placeholder={searchBarPlaceholder}
            options={searchBarOptions}
            placeholderMapping={searchBarPlaceholderMapping}
          />
        )}
      </div>
    );
  }

  // Default mode layout - original single row
  return (
    <CardToolbar>
      <div className="flex items-center gap-2.5">
        {/* SearchBar - New combined search component */}
        {showSearchBar && (
          <SearchBar
            searchField={searchField}
            searchQuery={searchQuery}
            onFieldChange={onSearchFieldChange}
            onQueryChange={onSearchChange}
            placeholder={searchBarPlaceholder}
            options={searchBarOptions}
            placeholderMapping={searchBarPlaceholderMapping}
          />
        )}

        {/* Legacy Search - Keep for backward compatibility */}
        {!showSearchBar && config.showSearch !== false && (
          <div className="relative">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder={config.searchPlaceholder || "Search..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="ps-9 w-40"
            />
            {searchQuery.length > 0 && (
              <Button
                mode="icon"
                variant="ghost"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => onSearchChange("")}
              >
                <X />
              </Button>
            )}
          </div>
        )}

        {/* Filters */}
        {config.showFilters !== false && filters.length > 0 && (
          <Button variant="outline" onClick={onFilterPressed}>
            <Filter />
            Filters
            {activeFiltersCount > 0 && (
              <Badge size="sm" variant="outline">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        )}

        {/* Custom Actions */}
        {config.showCustomActions && config.customActions}

        {/* Column Visibility */}
        {config.showColumnVisibility !== false && (
          <DataGridColumnVisibility
            table={table}
            trigger={
              <Button variant="outline">
                <Settings2 />
                Columns
              </Button>
            }
          />
        )}
      </div>
    </CardToolbar>
  );
}

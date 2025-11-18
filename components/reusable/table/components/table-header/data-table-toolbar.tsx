"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeenIcon } from "@/components/keenicons";
import { DataTableActionConfig, DataTableToolbarProps } from "../../types";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import type { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarActions({
  actions,
  buttonClassName,
  activeFilterCount,
  onClearFilters,
}: {
  actions: DataTableActionConfig[];
  buttonClassName?: string;
  activeFilterCount?: number;
  onClearFilters?: () => void;
}) {
  if (!actions.length) return null;

  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => {
        // Special handling for filter button when filters are active
        if (action.id === "filter" && activeFilterCount && activeFilterCount > 0) {
          return (
            <div
              key={action.id}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 rounded-md bg-black text-white cursor-pointer whitespace-nowrap",
                buttonClassName,
              )}
              onClick={action.onClick}
            >
              <KeenIcon icon="filter" style="outline" className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-sm font-medium text-white whitespace-nowrap">
                Filter Applied ({activeFilterCount})
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearFilters?.();
                }}
                className="ml-1 hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0"
                aria-label="Clear all filters"
              >
                <KeenIcon icon="cross-circle" style="outline" className="w-4 h-4 text-white" />
              </button>
            </div>
          );
        }

        return (
          <Button
            key={action.id}
            variant={action.variant ?? "outline"}
            size="md"
            onClick={action.onClick}
            disabled={action.disabled}
            className={cn(
              "inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-700",
              buttonClassName,
            )}
          >
            {action.icon}
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

export function DataTableToolbar<TData>({
  search,
  actions = [],
  extra,
  showColumnVisibility,
  columnVisibilityTrigger,
  table,
  mode = "default",
  activeFilterCount,
  onClearFilters,
}: DataTableToolbarProps & { 
  table?: Table<TData>;
  activeFilterCount?: number;
  onClearFilters?: () => void;
}) {
  const [internalValue, setInternalValue] = useState(search?.value ?? "");

  useEffect(() => {
    if (search) {
      setInternalValue(search.value);
    }
  }, [search?.value]);

  if (!search && !actions.length && !extra) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search?.onSubmit?.();
  };

  const handleChange = (value: string) => {
    setInternalValue(value);
    search?.onChange(value);
  };

  const isCompact = mode === "compact";

  const buttonHeight = isCompact ? "h-9" : "h-9";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2",
        isCompact
          ? "md:flex-row md:items-center md:justify-end md:gap-3"
          : "lg:flex-row lg:items-center lg:justify-between",
      )}
    >
      {search ? (
        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex items-center justify-start gap-0 rounded-md border border-gray-300 bg-gray-50",
            isCompact ? "w-full md:w-[420px]" : "flex-1",
          )}
        >
          {search.fields?.length ? (
            <Select
              value={search.selectedField ?? search.fields[0]?.value ?? ""}
              onValueChange={search.onFieldChange ?? (() => {})}
            >
              <SelectTrigger className="h-9 w-44 border-none rounded-r-none bg-gray-200 px-3 text-left text-b-13-14-500 text-gray-600">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                {search.fields.map((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}

          <Input
              value={internalValue}
              onChange={(event) => handleChange(event.target.value)}
              placeholder={search.placeholder}
              className="h-9 flex-1 rounded-none border-0 bg-transparent text-b-13-14-400 text-gray-700 focus-visible:ring-0"
          />

          <Button
            type="submit"
            variant="ghost"
            className="h-9` rounded-l-none bg-gray-200 border-l border-gray-200 px-4 text-gray-600 hover:bg-gray-200"
          >
            <KeenIcon icon="magnifier" />
          </Button>
        </form>
      ) : (
        <div className={cn(isCompact ? "hidden md:block" : "")} />
      )}

      <div
        className={cn(
          "flex items-center gap-2",
          isCompact ? "justify-end" : "justify-end",
        )}
      >
        {showColumnVisibility && table ? (
          <DataGridColumnVisibility
            table={table}
            trigger={
              columnVisibilityTrigger ?? (
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-700",
                    buttonHeight,
                  )}
                >
                  <Settings2 className="size-4" />
                  Columns
                </Button>
              )
            }
          />
        ) : null}
        {extra}
        <ToolbarActions 
          actions={actions} 
          buttonClassName={buttonHeight}
          activeFilterCount={activeFilterCount}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
}



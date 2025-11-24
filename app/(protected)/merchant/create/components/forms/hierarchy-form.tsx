"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { KeenIcon } from "@/components/keenicons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { DialogBody } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  getHierarchySchema,
  type HierarchySchemaType,
} from "../../../core/schemas";
import { mockMerchants } from "../../../core/data/mock-data";
import type { MerchantData } from "../../../types/merchant";
import { toAbsoluteUrl } from "@/lib/helpers";
import { HexagonBadge } from "@/app/components/partials/common/hexagon-badge";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridTableBase, DataGridTableHead, DataGridTableHeadRow, DataGridTableHeadRowCell, DataGridTableBody, DataGridTableBodyRow, DataGridTableBodyRowCell, DataGridTableEmpty, DataGridTableRowSpacer } from "@/components/ui/data-grid-table";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, type ColumnDef, flexRender } from "@tanstack/react-table";

interface MerchantLevel {
  id: string;
  name: string;
  description: string;
  hasParent: boolean;
  canHaveChildren: boolean;
}

interface ParentMerchant extends MerchantData {
  parentClientId?: string;
  type?: string;
  location?: string;
}

export function HierarchyForm() {
  const [showAvailableParents, setShowAvailableParents] = useState(false);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const form = useForm<HierarchySchemaType>({
    resolver: zodResolver(getHierarchySchema()),
    defaultValues: {
      selectedLevel: "level-1",
      selectedParent: "",
      hasParentMerchant: false,
    },
  });

  const onSubmit = (data: HierarchySchemaType) => {
    // TODO: Implement form submission
  };

  const merchantLevels: MerchantLevel[] = [
    {
      id: "level-0",
      name: "Level 0 (Grand-Parent Merchant)",
      description: "Top-level merchant. Doesn't have a parent merchant above",
      hasParent: false,
      canHaveChildren: true,
    },
    {
      id: "level-1",
      name: "Level 1 (Parent Merchant)",
      description: "Has a parent (Level 0). Can have child merchants.",
      hasParent: true,
      canHaveChildren: true,
    },
    {
      id: "level-2",
      name: "Level 2 (Child Merchant)",
      description: "Has a parent (Level 1). Can have child merchants",
      hasParent: true,
      canHaveChildren: true,
    },
    {
      id: "level-3",
      name: "Level 3 (Grand-Child Merchant)",
      description: "Has a parent (Level 2). Cannot have child merchants below.",
      hasParent: true,
      canHaveChildren: false,
    },
  ];

  const availableParents: ParentMerchant[] = useMemo(() => {
    return mockMerchants.map((merchant) => ({
      ...merchant,
      parentClientId: "PMUP123999222",
      type: `Level ${merchant.merchantLevel.level}`,
      location: "Jakarta",
    }));
  }, []);

  const selectedLevelData = useMemo(() => {
    return merchantLevels.find(
      (level) => level.id === form.watch("selectedLevel")
    );
  }, [form.watch("selectedLevel")]);

  const filteredParents = useMemo(() => {
    if (!selectedLevelData?.hasParent) return [];

    let filtered = availableParents.filter((parent) => {
      const parentType = parent.type || "";
      const selectedLevel = form.watch("selectedLevel");
      if (selectedLevel === "level-1") return parentType.includes("Level 0");
      if (selectedLevel === "level-2")
        return parentType.includes("Level 0") || parentType.includes("Level 1");
      if (selectedLevel === "level-3")
        return parentType.includes("Level 1") || parentType.includes("Level 2");
      return false;
    });

    // Apply level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter((parent) => {
        const levelLabel = parent.merchantLevel?.label || '';
        return levelLabel === levelFilter;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((parent) => {
        return (
          parent.companyName.toLowerCase().includes(query) ||
          parent.clientId.toLowerCase().includes(query) ||
          parent.brandName?.toLowerCase().includes(query) ||
          false
        );
      });
    }

    return filtered;
  }, [selectedLevelData, availableParents, form.watch("selectedLevel"), levelFilter, searchQuery]);

  // Helper function to get merchant level badge color
  const getMerchantLevelBadgeClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 1:
        return 'bg-green-100 text-green-800 border-green-300';
      case 2:
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 3:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleSelectParent = (parentId: string) => {
    form.setValue("selectedParent", parentId);
    setShowAvailableParents(false);
  };

  // Table columns configuration
  const columns: ColumnDef<ParentMerchant>[] = useMemo(() => [
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.companyName}</div>
      ),
    },
    {
      accessorKey: "clientId",
      header: "Client ID",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{row.original.clientId}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => navigator.clipboard.writeText(row.original.clientId)}
          >
            <KeenIcon icon="copy" className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "parentClientId",
      header: "Parent Client ID",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">
            {row.original.parentClientId || "N/A"}
          </span>
          {row.original.parentClientId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() =>
                navigator.clipboard.writeText(row.original.parentClientId!)
              }
            >
              <KeenIcon icon="copy" className="h-3 w-3" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "merchantLevel",
      header: "Merchant Level",
      cell: ({ row }) => {
        const level = row.original.merchantLevel?.level ?? 0;
        const label = row.original.merchantLevel?.label || `Level ${level}`;
        return (
          <Badge
            variant="outline"
            size="sm"
            className={getMerchantLevelBadgeClass(level)}
          >
            {label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "productionStatus",
      header: "Production Status",
      cell: ({ row }) => (
        <StatusBadge
          variant={row.original.productionStatus.status === "active" ? "success" : "secondary"}
          size="sm"
        >
          {row.original.productionStatus.label}
        </StatusBadge>
      ),
    },
    {
      accessorKey: "registeredDate",
      header: "Registered Date",
      cell: ({ row }) => (
        <div className="text-sm whitespace-pre-line">
          {row.original.registeredDate.date}
          <br />
          {row.original.registeredDate.time} (
          {row.original.registeredDate.timezone})
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => handleSelectParent(row.original.id)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Select
        </Button>
      ),
    },
  ], []);

  // Create table instance
  const table = useReactTable({
    data: filteredParents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Card className="max-w-4xl mx-auto" id="merchant-hierarchy">
          <CardHeader>
            <CardTitle>Merchant Hierarchy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Have a Parent Merchant Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-sm font-medium">
                    Have a Parent Merchant
                  </FormLabel>
                  <p className="text-sm text-muted-foreground mt-1">
                    Toggle ON if this merchant have a Parent Merchant and want
                    to set as a Sub-Merchant
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="hasParentMerchant"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            // Reset selectedParent when toggle is turned off
                            if (!checked) {
                              form.setValue("selectedParent", "");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-8 border rounded-lg bg-no-repeat bg-right bg-cover rtl:bg-left ${
                form.watch("hasParentMerchant") && form.watch("selectedParent")
                  ? "bg-white"
                  : "bg-white"
              }`}
              style={{
                backgroundImage:
                  form.watch("hasParentMerchant") &&
                  form.watch("selectedParent")
                    ? "url('/media/images/2600x1200/bg-5.png')"
                    : "url('/media/images/2600x1200/bg-5.png')",
                backgroundSize: "650px",
                backgroundPosition: "right center",
              }}
            >
              <div className="flex items-center gap-3">
                <HexagonBadge
                  size="size-[50px]"
                  stroke={
                    form.watch("hasParentMerchant") &&
                    form.watch("selectedParent")
                      ? "stroke-blue-600"
                      : "stroke-gray-300"
                  }
                  fill="fill-transparent"
                  badge={
                    <KeenIcon
                      icon="shop"
                      style="outline"
                      className={`text-lg ${
                        form.watch("hasParentMerchant") &&
                        form.watch("selectedParent")
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    />
                  }
                />
                <div>
                  <h3
                    className={`font-medium ${
                      form.watch("hasParentMerchant") &&
                      form.watch("selectedParent")
                        ? "text--900"
                        : "text-gray-900"
                    }`}
                  >
                    {form.watch("hasParentMerchant")
                      ? "Sub-Merchant"
                      : "Top-Level Merchant"}
                  </h3>
                  <p
                    className={`text-sm ${
                      form.watch("hasParentMerchant") &&
                      form.watch("selectedParent")
                        ? "text--700"
                        : "text-muted-foreground"
                    }`}
                  >
                    {form.watch("hasParentMerchant") &&
                    form.watch("selectedParent")
                      ? `Parent: ${availableParents.find((p) => p.id === form.watch("selectedParent"))?.companyName}`
                      : form.watch("hasParentMerchant")
                        ? "Has a parent merchant above"
                        : "Doesn't have a parent merchant above"}
                  </p>
                </div>
              </div>

              {form.watch("hasParentMerchant") &&
                !form.watch("selectedParent") && (
                  <Button
                    type="button"
                    variant="primary"
                    className="bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => setShowAvailableParents(true)}
                  >
                    Select Parent Merchant
                  </Button>
                )}

              {form.watch("hasParentMerchant") &&
                form.watch("selectedParent") && (
                  <Button
                    type="button"
                    variant="primary"
                    className="bg-blue-100 hover:bg-blue-700 text-blue-600 border border-blue-500"
                    onClick={() => setShowAvailableParents(true)}
                  >
                    Change Parent
                  </Button>
                )}
            </div>
          </CardContent>
        </Card>

        <Dialog
          open={showAvailableParents}
          onOpenChange={setShowAvailableParents}
        >
          <DialogContent className="max-w-6xl max-h-[90vh] p-0" close={false}>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Select Parent Merchant
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <KeenIcon 
                      icon="magnifier" 
                      style="outline" 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
                    />
                    <Input
                      placeholder="Search Merchants"
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="All Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Level</SelectItem>
                      <SelectItem value="Level 0">Level 0</SelectItem>
                      <SelectItem value="Level 1">Level 1</SelectItem>
                      <SelectItem value="Level 2">Level 2</SelectItem>
                      <SelectItem value="Level 3">Level 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogHeader>

            <DialogBody className="p-0 overflow-y-auto">
              <DataGrid
                table={table}
                recordCount={filteredParents.length}
                tableLayout={{
                  rowBorder: true,
                  headerBorder: true,
                  headerBackground: true,
                }}
              >
                <DataGridContainer border={false} className="p-0">
                  <DataGridTableBase>
                    <DataGridTableHead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <DataGridTableHeadRow key={headerGroup.id} headerGroup={headerGroup}>
                          {headerGroup.headers.map((header) => (
                            <DataGridTableHeadRowCell key={header.id} header={header}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </DataGridTableHeadRowCell>
                          ))}
                        </DataGridTableHeadRow>
                      ))}
                    </DataGridTableHead>
                    <DataGridTableRowSpacer />
                    <DataGridTableBody>
                      {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                          <DataGridTableBodyRow key={row.id} row={row}>
                            {row.getVisibleCells().map((cell) => (
                              <DataGridTableBodyRowCell key={cell.id} cell={cell}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </DataGridTableBodyRowCell>
                            ))}
                          </DataGridTableBodyRow>
                        ))
                      ) : (
                        <DataGridTableEmpty />
                      )}
                    </DataGridTableBody>
                    <tfoot className="border-t bg-muted/50">
                      <tr>
                        <td colSpan={table.getAllColumns().length} className="px-6 py-4">
                          <DataGridPagination
                            sizes={[5, 10, 20]}
                            sizesLabel="Show"
                            sizesDescription="per page"
                          />
                        </td>
                      </tr>
                    </tfoot>
                  </DataGridTableBase>
                </DataGridContainer>
              </DataGrid>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

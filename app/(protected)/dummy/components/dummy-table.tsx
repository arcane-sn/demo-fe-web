"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Copy,
  Eye,
  Edit,
  Trash2,
  Star,
  Package,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import {
  ReusableTable,
  TableConfig,
  ActionCellConfig,
} from "@/components/table";
import { DummyProduct } from "../core/_model";

interface DummyTableProps {
  onView?: (product: DummyProduct) => void;
  onEdit?: (product: DummyProduct) => void;
  onDelete?: (product: DummyProduct) => void;
  onSelectionChange?: (selectedProducts: DummyProduct[]) => void;
  data: DummyProduct[];
  loading?: boolean;
  error?: string;
}

export function DummyTable({
  onView,
  onEdit,
  onDelete,
  onSelectionChange,
  data,
  loading,
  error,
}: DummyTableProps) {
  const { copyToClipboard } = useCopyToClipboard();

  // Define columns
  const columns = useMemo<ColumnDef<DummyProduct>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => (
          <DataGridColumnHeader title="Product Title" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.images[0]}
              alt={row.original.title}
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="font-medium text-foreground">
              {row.original.title}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 300,
      },
      {
        id: "brand",
        accessorKey: "brand",
        header: ({ column }) => (
          <DataGridColumnHeader title="Brand" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            size="sm"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            {row.original.brand}
          </Badge>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "category",
        accessorKey: "category",
        header: ({ column }) => (
          <DataGridColumnHeader title="Category" column={column} />
        ),
        cell: ({ row }) => (
          <Badge variant="outline" size="sm" className="capitalize">
            {row.original.category}
          </Badge>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Price" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span className="font-medium text-foreground">
              ${row.original.price}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 100,
      },
      {
        id: "stock",
        accessorKey: "stock",
        header: ({ column }) => (
          <DataGridColumnHeader title="Stock" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3 text-blue-600" />
            <span
              className={`font-medium ${
                row.original.stock > 50
                  ? "text-green-600"
                  : row.original.stock > 10
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {row.original.stock}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 100,
      },
      {
        id: "sku",
        accessorKey: "sku",
        header: ({ column }) => (
          <DataGridColumnHeader title="SKU" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-foreground">
              {row.original.sku}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => {
                copyToClipboard(row.original.sku);
                toast.success("SKU copied to clipboard");
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: "availabilityStatus",
        accessorKey: "availabilityStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.availabilityStatus === "In Stock"
                ? "success"
                : "destructive"
            }
            size="sm"
            appearance="light"
            shape="circle"
          >
            <BadgeDot
              className={
                row.original.availabilityStatus === "In Stock"
                  ? "success"
                  : "destructive"
              }
            />
            {row.original.availabilityStatus}
          </Badge>
        ),
        enableSorting: true,
        size: 120,
      },
    ],
    [copyToClipboard]
  );

  // Define action configuration
  const actionConfig: ActionCellConfig<DummyProduct> = {
    actions: [
      {
        label: "View Details",
        icon: <Eye className="h-4 w-4" />,
        onClick: (row) => onView?.(row.original),
      },
      {
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: (row) => onEdit?.(row.original),
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onClick: (row) => onDelete?.(row.original),
      },
    ],
    showDropdown: true,
  };

  // Define table configuration
  const tableConfig: TableConfig<DummyProduct> = {
    data,
    columns,
    enableRowSelection: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableColumnResizing: true,
    pageSize: 10,
    searchable: true,
    searchPlaceholder: "Search products...",
    searchFields: ["title", "brand", "sku", "category"],
    customFilters: [
      {
        id: "category",
        label: "Category",
        type: "multiselect",
        options: [
          { label: "smartphones", value: "smartphones", count: 0 },
          { label: "laptops", value: "laptops", count: 0 },
          { label: "fragrances", value: "fragrances", count: 0 },
          { label: "skincare", value: "skincare", count: 0 },
          { label: "groceries", value: "groceries", count: 0 },
          { label: "home-decoration", value: "home-decoration", count: 0 },
        ],
      },
      {
        id: "brand",
        label: "Brand",
        type: "multiselect",
        options: [
          { label: "Apple", value: "Apple", count: 0 },
          { label: "Samsung", value: "Samsung", count: 0 },
          { label: "OPPO", value: "OPPO", count: 0 },
          { label: "Huawei", value: "Huawei", count: 0 },
          { label: "Microsoft", value: "Microsoft", count: 0 },
          { label: "Infinix", value: "Infinix", count: 0 },
        ],
      },
      {
        id: "availabilityStatus",
        label: "Status",
        type: "multiselect",
        options: [
          { label: "In Stock", value: "In Stock", count: 0 },
          { label: "Low Stock", value: "Low Stock", count: 0 },
          { label: "Out of Stock", value: "Out of Stock", count: 0 },
        ],
      },
    ],
  };

  // Define header configuration
  const headerConfig = {
    title: "Product List",
    subtitle: "Browse and manage products from DummyJSON API",
    showRecordCount: true,
  };

  // Define toolbar configuration
  const toolbarConfig = {
    showSearch: true,
    showFilters: false,
    showColumnVisibility: true,
    searchPlaceholder: "Search products...",
  };

  // Define footer configuration
  const footerConfig = {
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
  };

  return (
    <div>
      <ReusableTable
        config={tableConfig}
        headerConfig={headerConfig}
        toolbarConfig={toolbarConfig}
        footerConfig={footerConfig}
        actionConfig={actionConfig}
        loading={loading}
        error={error}
      />
    </div>
  );
}

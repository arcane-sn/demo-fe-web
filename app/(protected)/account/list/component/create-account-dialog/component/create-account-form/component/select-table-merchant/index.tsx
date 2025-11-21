"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search, Copy } from "lucide-react";
import { ReusableTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { BaseTableData } from "@/components/table/types";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Badge, BadgeDot } from "@/components/ui/badge";
import dayjs from "dayjs";

// Merchant interface for selection
interface SelectMerchant extends BaseTableData {
  companyName: string;
  clientId: string;
  parentClientId: string;
  merchantLevel: number;
  productionStatus: "active" | "inactive";
  registeredDate: string;
}

// Dummy data
const dummyMerchants: SelectMerchant[] = [
  {
    id: "1",
    companyName: "PT Teknologi Maju Sejahtera",
    clientId: "UP2025091900002",
    parentClientId: "UP2025091900001",
    merchantLevel: 1,
    productionStatus: "active",
    registeredDate: "2024-01-15",
  },
  {
    id: "2",
    companyName: "PT Inovasi Digital Abadi",
    clientId: "UP2025091900003",
    parentClientId: "-",
    merchantLevel: 2,
    productionStatus: "active",
    registeredDate: "2024-02-20",
  },
  {
    id: "3",
    companyName: "PT Solusi Digital Cemerlang",
    clientId: "UP2025091900004",
    parentClientId: "UP2025091900002",
    merchantLevel: 1,
    productionStatus: "inactive",
    registeredDate: "2024-03-10",
  },
  {
    id: "4",
    companyName: "PT Digital Inovasi Jaya",
    clientId: "UP2025091900005",
    parentClientId: "-",
    merchantLevel: 3,
    productionStatus: "active",
    registeredDate: "2024-04-05",
  },
  {
    id: "5",
    companyName: "PT Digital Cerdas Abadi",
    clientId: "UP2025091900006",
    parentClientId: "UP2025091900003",
    merchantLevel: 2,
    productionStatus: "active",
    registeredDate: "2024-05-12",
  },
  {
    id: "6",
    companyName: "PT Digital Maju Bersama",
    clientId: "UP2025091900007",
    parentClientId: "-",
    merchantLevel: 1,
    productionStatus: "active",
    registeredDate: "2024-06-18",
  },
  {
    id: "7",
    companyName: "PT Digital Cemerlang Abadi",
    clientId: "UP2025091900008",
    parentClientId: "UP2025091900004",
    merchantLevel: 2,
    productionStatus: "inactive",
    registeredDate: "2024-07-22",
  },
  {
    id: "8",
    companyName: "PT Digital Inovasi Sejahtera",
    clientId: "UP2025091900009",
    parentClientId: "-",
    merchantLevel: 3,
    productionStatus: "active",
    registeredDate: "2024-08-30",
  },
  {
    id: "9",
    companyName: "PT Teknologi Digital Indonesia",
    clientId: "UP2025091900010",
    parentClientId: "UP2025091900005",
    merchantLevel: 1,
    productionStatus: "active",
    registeredDate: "2024-09-15",
  },
  {
    id: "10",
    companyName: "PT Solusi Teknologi Terdepan",
    clientId: "UP2025091900011",
    parentClientId: "-",
    merchantLevel: 2,
    productionStatus: "active",
    registeredDate: "2024-10-05",
  },
  {
    id: "11",
    companyName: "PT Inovasi Teknologi Maju",
    clientId: "UP2025091900012",
    parentClientId: "UP2025091900006",
    merchantLevel: 1,
    productionStatus: "inactive",
    registeredDate: "2024-11-10",
  },
  {
    id: "12",
    companyName: "PT Digital Solutions Indonesia",
    clientId: "UP2025091900013",
    parentClientId: "-",
    merchantLevel: 3,
    productionStatus: "active",
    registeredDate: "2024-12-20",
  },
  {
    id: "13",
    companyName: "PT Teknologi Nusantara",
    clientId: "UP2025091900014",
    parentClientId: "UP2025091900007",
    merchantLevel: 2,
    productionStatus: "active",
    registeredDate: "2025-01-08",
  },
  {
    id: "14",
    companyName: "PT Digital Kreatif Indonesia",
    clientId: "UP2025091900015",
    parentClientId: "-",
    merchantLevel: 1,
    productionStatus: "active",
    registeredDate: "2025-01-25",
  },
  {
    id: "15",
    companyName: "PT Solusi Digital Nusantara",
    clientId: "UP2025091900016",
    parentClientId: "UP2025091900008",
    merchantLevel: 3,
    productionStatus: "inactive",
    registeredDate: "2025-02-12",
  },
];

interface SelectTableMerchantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMerchant?: (merchant: SelectMerchant) => void;
}

const SelectTableMerchant: React.FC<SelectTableMerchantProps> = ({
  open,
  onOpenChange,
  onSelectMerchant,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const { copyToClipboard } = useCopyToClipboard();
  // Filter merchants based on search and level
  const filteredMerchants = useMemo(() => {
    let filtered = dummyMerchants;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (merchant) =>
          merchant.companyName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          merchant.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          merchant.parentClientId
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      const level = parseInt(selectedLevel);
      filtered = filtered.filter(
        (merchant) => merchant.merchantLevel === level
      );
    }

    return filtered;
  }, [searchQuery, selectedLevel]);

  // Define columns
  const columns: ColumnDef<SelectMerchant>[] = useMemo(
    () => [
      {
        accessorKey: "companyName",
        header: "Company Name",
        size: 250,
        minSize: 200,
        cell: ({ row }) => (
          <span className="font-medium text-gray-800">
            {row.getValue("companyName")}
          </span>
        ),
      },
      {
        accessorKey: "clientId",
        header: "Client ID",
        size: 180,
        minSize: 150,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{row.getValue("clientId")}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => {
                copyToClipboard(row.getValue("clientId"));
                toast.success("Client ID copied to clipboard");
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        ),
      },
      {
        accessorKey: "parentClientId",
        header: "Parent Client ID",
        size: 180,
        minSize: 150,
        cell: ({ row }) => {
          if (row.getValue("parentClientId") === "-") {
            return <span className="text-gray-800">-</span>;
          }
          return (
            <div className="flex items-center gap-2">
              <span className="text-gray-800">
                {row.getValue("parentClientId")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => {
                  copyToClipboard(row.getValue("parentClientId"));
                  toast.success("Parent Client ID copied to clipboard");
                }}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "merchantLevel",
        header: "Merchant Level",
        size: 150,
        minSize: 120,
        cell: ({ row }) => {
          if (row.getValue("merchantLevel") === 0) {
            return (
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-light text-primary border border-primary-clarity-20"
              >
                Level 0
              </Button>
            );
          }
          if (row.getValue("merchantLevel") === 1) {
            return (
              <Button
                variant="outline"
                size="sm"
                className="bg-success-light text-success border border-success-clarity-20"
              >
                Level 1
              </Button>
            );
          }
          if (row.getValue("merchantLevel") === 2) {
            return (
              <Button
                variant="outline"
                size="sm"
                className="bg-info-light text-info border border-info-clarity-20"
              >
                Level 2
              </Button>
            );
          }
          if (row.getValue("merchantLevel") === 3) {
            return (
              <Button
                variant="outline"
                size="sm"
                className="bg-warning-light text-warning border border-warning-clarity-20"
              >
                Level 3
              </Button>
            );
          }
        },
      },
      {
        accessorKey: "productionStatus",
        header: "Production Status",
        size: 160,
        minSize: 140,
        cell: ({ row }) => {
          const status = row.getValue("productionStatus") as string;
          return (
            <Badge
              variant={status === "active" ? "success" : "destructive"}
              size="sm"
              appearance="light"
              shape="circle"
            >
              <BadgeDot
                className={status === "active" ? "success" : "destructive"}
              />
              {status === "active" ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "registeredDate",
        header: "Registered Date",
        size: 160,
        minSize: 140,
        cell: ({ row }) => (
          <div>
            <div className="text-gray-800 text-sm">
              {dayjs(row.getValue("registeredDate")).format("DD, MMM, YYYY")}
            </div>
            <div className="text-gray-700 text-xs">
              {dayjs(row.getValue("registeredDate")).format(
                "hh:mm:ss ([GMT]Z)"
              )}
            </div>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        size: 120,
        minSize: 100,
        cell: ({ row }) => (
          <Button
            onClick={() => {
              if (onSelectMerchant) {
                onSelectMerchant(row.original);
              }
              onOpenChange(false);
            }}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Select
          </Button>
        ),
      },
    ],
    [onSelectMerchant, onOpenChange]
  );

  // Table configuration
  const tableConfig = useMemo(
    () => ({
      data: filteredMerchants,
      columns,
      enableSorting: true,
      enablePagination: true,
      enableColumnVisibility: false,
      enableColumnPinning: false,
      enableColumnResizing: true,
      enableColumnMoving: false,
      enableRowSelection: false,
      pageSize: 10,
      pageSizeOptions: [5, 10, 25, 50],
      searchable: false, // We handle search manually
    }),
    [columns, filteredMerchants]
  );

  const headerConfig = useMemo(
    () => ({
      customHeader: (
        <div className="flex items-center justify-between w-full">
          {/* Title on left */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Select Merchant
            </h2>
          </div>

          {/* Search and Level dropdown on right */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search merchant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            {/* Level Dropdown */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    }),
    [searchQuery, selectedLevel]
  );

  const toolbarConfig = useMemo(
    () => ({
      showSearch: false,
      showColumnVisibility: false,
      showFilters: false,
    }),
    []
  );

  const footerConfig = useMemo(
    () => ({
      showPagination: true,
      showRowCount: true,
    }),
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0 " close={false}>
        <VisuallyHidden>
          <DialogTitle>Select Merchant</DialogTitle>
        </VisuallyHidden>

        {/* ReusableTable */}
        <ReusableTable
          config={tableConfig}
          headerConfig={headerConfig}
          toolbarConfig={toolbarConfig}
          footerConfig={footerConfig}
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default SelectTableMerchant;

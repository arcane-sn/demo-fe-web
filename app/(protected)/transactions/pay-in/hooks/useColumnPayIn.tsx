import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction, PaymentStatus } from "../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import CopyButton from "../components/CopyButton";

// Status badge component using the UI Badge component
const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case "Success":
        return {
          variant: "success" as const,
          appearance: "light" as const,
        };
      case "Request":
        return {
          variant: "warning" as const,
          appearance: "light" as const,
        };
      case "Failed":
        return {
          variant: "destructive" as const,
          appearance: "light" as const,
        };
      case "Pending":
        return {
          variant: "secondary" as const,
          appearance: "light" as const,
        };
      default:
        return {
          variant: "secondary" as const,
          appearance: "light" as const,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      appearance={config.appearance}
      size="sm"
      shape="circle"
      className="gap-1.5"
    >
      <BadgeDot />
      {status}
    </Badge>
  );
};

// Table columns configuration
export const useColumnPayIn: () => ColumnDef<PayInTransaction>[] = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return [
    {
      id: "transactionDate",
      accessorKey: "transactionDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.transactionDate}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.transactionTime}
          </div>
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "merchantName",
      accessorKey: "merchantName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.merchantName}
        </div>
      ),
      enableSorting: true,
      size: 192, // w-48
    },
    {
      id: "clientId",
      accessorKey: "clientId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Client ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-slate-800">
            {row.original.clientId}
          </div>
          <CopyButton text={row.original.clientId} label="Client ID" />
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "transactionId",
      accessorKey: "transactionId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.transactionId}
          </div>
          <CopyButton
            text={row.original.transactionId}
            label="Transaction ID"
          />
        </div>
      ),
      enableSorting: true,
      size: 288, // w-72
    },
    {
      id: "paymentStatus",
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Status" column={column} />
      ),
      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "activity",
      accessorKey: "activity",
      header: ({ column }) => (
        <DataGridColumnHeader title="Activity" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.activity}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "activityId",
      accessorKey: "activityId",
      header: ({ column }) => (
        <DataGridColumnHeader title="Activity ID" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.activityId}
          </div>
          <CopyButton text={row.original.activityId} label="Activity ID" />
        </div>
      ),
      enableSorting: true,
      size: 288, // w-72
    },
    {
      id: "paymentMethod",
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Method" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.paymentMethod}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "paymentChannel",
      accessorKey: "paymentChannel",
      header: ({ column }) => (
        <DataGridColumnHeader title="Payment Channel" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.paymentChannel}
        </div>
      ),
      enableSorting: true,
      size: 176, // w-44
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.amount)}
        </div>
      ),
      enableSorting: true,
      size: 192, // w-48
    },
    {
      id: "customerInfo",
      accessorKey: "customerInfo",
      header: ({ column }) => (
        <DataGridColumnHeader title="Customer Info" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.customerEmail}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.customerPhone}
          </div>
        </div>
      ),
      enableSorting: false,
      size: 192, // w-48
    },
  ];
};

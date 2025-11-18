import { ColumnDef } from "@tanstack/react-table";
import { PayOutTransaction, AmountDetail } from "../../../core/_models";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CopyButton from "../../../../components/shared/CopyButton";
import { formatCurrency, renderAmountDetailCell } from "../../../../components/shared/utils";

// Status badge component
const StatusBadge = ({ status }: { status: PayOutTransaction["status"] }) => {
  const getStatusConfig = (status: PayOutTransaction["status"]) => {
    switch (status) {
      case "Success":
        return {
          className: "bg-green-50 border border-green-200 text-green-600",
          dotClassName: "bg-green-500",
        };
      case "Request":
        return {
          className: "bg-yellow-50 border border-yellow-200 text-yellow-600",
          dotClassName: "bg-yellow-500",
        };
      case "Failed":
        return {
          className: "bg-red-600 border border-red-600 text-white",
          dotClassName: "bg-white",
        };
      case "Pending":
        return {
          className: "bg-yellow-50 border border-yellow-200 text-yellow-600",
          dotClassName: "bg-yellow-500",
        };
      case "Init":
        return {
          className: "bg-blue-50 border border-blue-200 text-blue-600",
          dotClassName: "bg-blue-500",
        };
      case "Canceled":
        return {
          className: "bg-gray-50 border border-gray-200 text-gray-600",
          dotClassName: "bg-gray-500",
        };
      case "Scheduled":
        return {
          className: "bg-purple-50 border border-purple-200 text-purple-600",
          dotClassName: "bg-purple-500",
        };
      default:
        return {
          className: "bg-gray-50 border border-gray-200 text-gray-600",
          dotClassName: "bg-gray-500",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      size="sm"
      shape="default"
      className={cn("rounded-full px-2.5 py-1 gap-1.5 border", config.className)}
    >
      <span className={cn("w-1 h-1 rounded-full flex-shrink-0", config.dotClassName)} />
      {status}
    </Badge>
  );
};

export function useColumnPayOut(): ColumnDef<PayOutTransaction>[] {
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
      size: 176,
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
      size: 192,
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
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      enableSorting: true,
      size: 176,
    },
    {
      id: "referenceNumber",
      accessorKey: "referenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Reference Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.referenceNumber}
          </div>
          <CopyButton
            text={row.original.referenceNumber}
            label="Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "partnerReferenceNumber",
      accessorKey: "partnerReferenceNumber",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Partner Reference Number"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.partnerReferenceNumber}
          </div>
          <CopyButton
            text={row.original.partnerReferenceNumber}
            label="Partner Reference Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "transactionType",
      accessorKey: "transactionType",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transaction Type" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.transactionType}
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "transferAmount",
      accessorKey: "transferAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Transfer Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.transferAmount)}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "adminFee",
      accessorKey: "adminFee",
      header: ({ column }) => (
        <DataGridColumnHeader title="Admin Fee (IDR)" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.adminFee)}
        </div>
      ),
      enableSorting: true,
      size: 144,
    },
    {
      id: "totalTransferAmount",
      accessorKey: "totalTransferAmount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Total Transfer Amount" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {formatCurrency(row.original.totalTransferAmount)}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "beneficiaryAccountNumber",
      accessorKey: "beneficiaryAccountNumber",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Beneficiary Account Number"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-slate-800">
            {row.original.beneficiaryAccountNumber}
          </div>
          <CopyButton
            text={row.original.beneficiaryAccountNumber}
            label="Beneficiary Account Number"
          />
        </div>
      ),
      enableSorting: true,
      size: 288,
    },
    {
      id: "bankName",
      accessorKey: "bankName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Beneficiary Bank Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.bankName}
        </div>
      ),
      enableSorting: true,
      size: 192,
    },
    {
      id: "beneficiaryAccountName",
      accessorKey: "beneficiaryAccountName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Beneficiary Account Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-slate-800">
            {row.original.beneficiaryAccountName || "-"}
          </div>
          {row.original.beneficiaryAccountName && (
            <CopyButton
              text={row.original.beneficiaryAccountName}
              label="Beneficiary Account Name"
            />
          )}
        </div>
      ),
      enableSorting: true,
      size: 240,
    },
    {
      id: "virtualAccount",
      accessorKey: "virtualAccount",
      header: ({ column }) => (
        <DataGridColumnHeader title="Virtual Account" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.virtualAccount ? "Yes" : "No"}
        </div>
      ),
      enableSorting: true,
      size: 144,
    },
    {
      id: "providerRefNumber",
      accessorKey: "providerRefNumber",
      header: ({ column }) => (
        <DataGridColumnHeader title="Provider Ref. Number" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal text-blue-500">
            {row.original.providerRefNumber || "-"}
          </div>
          {row.original.providerRefNumber && (
            <CopyButton
              text={row.original.providerRefNumber}
              label="Provider Ref. Number"
            />
          )}
        </div>
      ),
      enableSorting: true,
      size: 240,
    },
    {
      id: "providerName",
      accessorKey: "providerName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Provider Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.providerName || "-"}
        </div>
      ),
      enableSorting: true,
      size: 144,
    },
    {
      id: "remark",
      accessorKey: "remark",
      header: ({ column }) => (
        <DataGridColumnHeader title="Remarks" column={column} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-normal text-slate-800">
          {row.original.remark}
        </div>
      ),
      enableSorting: true,
      size: 144,
    },
    {
      id: "servedDate",
      accessorKey: "servedDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Served Date" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-slate-800">
            {row.original.servedDate}
          </div>
          <div className="text-xs text-slate-600">
            {row.original.servedTime}
          </div>
        </div>
      ),
      enableSorting: true,
      size: 176,
    },
    {
      id: "providerRate",
      accessorKey: "providerRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Provider Rate" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.providerRate),
      enableSorting: true,
      size: 192,
    },
    {
      id: "merchantReferralRate",
      accessorKey: "merchantReferralRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Merchant Referral Rate" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.merchantReferralRate),
      enableSorting: true,
      size: 240,
    },
    {
      id: "flypayRate",
      accessorKey: "flypayRate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Flypay Rate (excluded)" column={column} />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.flypayRate),
      enableSorting: true,
      size: 240,
    },
    {
      id: "merchantReferralFee",
      accessorKey: "merchantReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Merchant Referral Fee (excluded)"
          column={column}
        />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.merchantReferralFee),
      enableSorting: true,
      size: 240,
    },
    {
      id: "salesReferralFee",
      accessorKey: "salesReferralFee",
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Sales Referral Fee (excluded)"
          column={column}
        />
      ),
      cell: ({ row }) => renderAmountDetailCell(row.original.salesReferralFee),
      enableSorting: true,
      size: 240,
    },
  ];
}


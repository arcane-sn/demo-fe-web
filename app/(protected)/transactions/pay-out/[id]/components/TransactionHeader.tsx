"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { PayOutDetailTransaction } from "../../core/_models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDropdownActionPayout from "../../hooks/useDropdownActionPayout";

interface TransactionHeaderProps {
  transaction: PayOutDetailTransaction;
  onAction?: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "destructive";
    case "canceled":
      return "secondary";
    default:
      return "secondary";
  }
};

export function TransactionHeader({ transaction }: TransactionHeaderProps) {
  const transactionActions = useDropdownActionPayout();
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-7">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-2.5 mb-7">
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="text-xs font-normal text-slate-600 leading-tight">
              Reference Number
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-semibold text-slate-900 leading-normal">
                {transaction.referenceNumber}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(transaction.referenceNumber)}
                className="size-4 p-0 hover:bg-transparent"
              >
                <Copy className="size-4 text-slate-400" />
              </Button>
              <Badge
                variant={getStatusBadgeVariant(transaction.status)}
                appearance="light"
                size="md"
                className="px-2.5 py-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                {transaction.status}
              </Badge>
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-[150px] cursor-pointer bg-primary-light">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              {transactionActions.map(({ value, label, onClick }, index) => (
                <SelectItem key={index} value={value} onClick={onClick}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-5">
          <div className="px-3 py-2.5 rounded-md border border-slate-300 flex flex-col gap-1.5">
            <div className="text-base font-medium text-slate-900 leading-none">
              {formatCurrency(transaction.transferAmount)}
            </div>
            <div className="text-xs font-normal text-slate-600 leading-none">
              Transfer Amount
            </div>
          </div>
          <div className="px-3 py-2.5 rounded-md border border-slate-300 flex flex-col gap-1.5">
            <div className="text-base font-medium text-slate-900 leading-none">
              {transaction.beneficiaryAccountNumber}
            </div>
            <div className="text-xs font-normal text-slate-600 leading-none">
              Beneficiary Account Number
            </div>
          </div>
          <div className="px-3 py-2.5 rounded-md border border-slate-300 flex flex-col gap-1.5">
            <div className="text-base font-medium text-slate-900 leading-none">
              {transaction.beneficiaryAccountName}
            </div>
            <div className="text-xs font-normal text-slate-600 leading-none">
              Beneficiary Account Name
            </div>
          </div>
          <div className="px-3 py-2.5 rounded-md border border-slate-300 flex flex-col gap-1.5">
            <div className="text-base font-medium text-slate-900 leading-none">
              {transaction.transactionType}
            </div>
            <div className="text-xs font-normal text-slate-600 leading-none">
              Transaction Type
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeenIcon } from "@/components/keenicons";
import type { TransactionItem, BatchDetail } from "../../../types/batch-detail";
import { useTransactionTableColumns } from "./transaction-table-columns";
import { FIELD_LABELS } from "../core/constants";
import { EditTransactionModal } from "../../../components/modals/edit/edit-transaction-modal";

interface TransactionListCardProps {
  transactions: TransactionItem[];
  batchDetail?: BatchDetail;
  onDelete?: (selectedTransactions: TransactionItem[]) => void;
}

export function TransactionListCard({ transactions, batchDetail, onDelete }: TransactionListCardProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTransactions, setSelectedTransactions] = useState<TransactionItem[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionItem | undefined>();
  
  const showStatus = batchDetail?.status === 'valid' || batchDetail?.status === 'issue' || batchDetail?.status === 'pending-approval';
  const showSelection = batchDetail?.status === 'issue';
  const showActions = batchDetail?.status !== 'pending-approval'; // Hide actions for pending approval
  
  const handleEdit = useCallback((transaction: TransactionItem) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  }, []);

  const handleSaveTransaction = useCallback((updatedTransaction: TransactionItem) => {
    // Handle save transaction - update the transaction in the list
    console.log("Save transaction:", updatedTransaction);
    // In real app, this would update the transaction in the parent component
  }, []);

  const columns = useTransactionTableColumns({ showStatus, onEdit: handleEdit, showActions });

  // Filter transactions based on search and status
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((txn) => txn.status === selectedStatus);
    }

    // Filter by search
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((txn) =>
        txn.partnerReferenceNumber.toLowerCase().includes(searchLower) ||
        txn.accountNumber.toLowerCase().includes(searchLower) ||
        txn.accountName.toLowerCase().includes(searchLower) ||
        txn.bankName.toLowerCase().includes(searchLower) ||
        (txn.remark && txn.remark.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [transactions, searchValue, selectedStatus]);

  const handleRowClick = useCallback((row: TransactionItem) => {
    // Handle row click if needed
    console.log("Transaction clicked:", row);
  }, []);

  const handleSelectionChange = useCallback((rows: TransactionItem[]) => {
    setSelectedTransactions(rows);
  }, []);

  const handleDelete = useCallback(() => {
    if (onDelete && selectedTransactions.length > 0) {
      onDelete(selectedTransactions);
      setSelectedTransactions([]);
    }
  }, [onDelete, selectedTransactions]);

  // Get status filter options based on transactions
  const statusFilterOptions = useMemo(() => {
    const statuses = new Set(transactions.map(t => t.status).filter(Boolean));
    const options = [{ label: "All", value: "all" }];
    if (statuses.has('valid')) options.push({ label: "Valid", value: "valid" });
    if (statuses.has('invalid')) options.push({ label: "Invalid", value: "invalid" });
    return options;
  }, [transactions]);

  const statusFilterCount = useMemo(() => {
    if (selectedStatus === 'all') return transactions.length;
    return transactions.filter(t => t.status === selectedStatus).length;
  }, [selectedStatus, transactions]);

  return (
    <>
    <DataTable<TransactionItem>
      data={filteredTransactions}
      columns={columns}
      header={{
        title: FIELD_LABELS.TRANSACTION_LIST,
      }}
      toolbar={{
        search: {
          placeholder: FIELD_LABELS.QUICK_SEARCH,
          value: searchValue,
          onChange: setSearchValue,
        },
        extra: showStatus || showSelection ? (
          <div className="flex items-center gap-3">
            {showStatus && (
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue>
                    {FIELD_LABELS.ACCOUNT_STATUS} {statusFilterCount > 0 ? `(${statusFilterCount})` : ''}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statusFilterOptions.map((opt) => {
                    const count = opt.value === 'all' 
                      ? transactions.length 
                      : transactions.filter(t => t.status === opt.value).length;
                    return (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label} {count > 0 ? `(${count})` : ''}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            {showSelection && (
              <>
                <div className="px-3 h-9 flex items-center border border-gray-300 rounded-md bg-white whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {FIELD_LABELS.SELECTED}: <span className="font-medium text-gray-900">{selectedTransactions.length}</span>
                  </span>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={selectedTransactions.length === 0}
                  className="h-9 gap-2"
                >
                  <KeenIcon icon="trash" style="outline" className="h-4 w-4" />
                  {FIELD_LABELS.DELETE}
                </Button>
              </>
            )}
          </div>
        ) : undefined,
      }}
      pagination={{
        totalItems: filteredTransactions.length,
        page: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
      }}
      enableRowSelection={showSelection}
      onSelectionChange={handleSelectionChange}
      emptyState={{
        title: "No transactions found",
        description: searchValue.trim() || selectedStatus !== 'all'
          ? "No transactions match your search criteria."
          : "No transactions available.",
        hasActiveFilters: searchValue.trim().length > 0 || selectedStatus !== 'all',
      }}
      dataGridOptions={{
        tableLayout: {
          width: "fixed" as const,
          columnsPinnable: false,
          columnsMovable: false,
          columnsVisibility: false,
          cellBorder: true,
        },
      }}
      onRowClick={handleRowClick}
    />
    <EditTransactionModal
      open={isEditModalOpen}
      onOpenChange={setIsEditModalOpen}
      transaction={selectedTransaction}
      onSave={handleSaveTransaction}
    />
  </>
  );
}


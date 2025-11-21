"use client";
import { Card, CardContent } from "@/components/ui/card";
import BalanceOverview from "./balance-statement-overview";
import { BalanceStatementTable } from "./table";
import { mockBalanceStatementData } from "../core/data/mock-balance-statement";
import { useBalanceStatementList } from "../core/hooks/use-balance-statement-list";
import { ModalBalanceFilter } from "../../components";
import { useState } from "react";
import ModalBalanceExport from "./modal/modal.balance.export";

const BalanceStatementContent = () => {
  const { loading, error, handleRowClick, handleSelectionChange } =
    useBalanceStatementList();
  const [open, setOpen] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Balance Statement</h1>
            <p className="text-sm text-muted-foreground">
              View all balance activities
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-6">
        <BalanceStatementTable
          data={mockBalanceStatementData}
          onRowClick={handleRowClick}
          loading={loading}
          error={error || undefined}
          onOpenFilters={() => setOpen(true)}
          onOpenExport={() => setOpenExport(true)}
        />
      </div>
      <ModalBalanceFilter
        open={open}
        onClose={() => setOpen(false)}
        statusOptions={[
          { id: "success", label: "Success" },
          { id: "pending", label: "Pending" },
          { id: "failed", label: "Failed" },
          { id: "cancelled", label: "Cancelled" },
        ]}
      />
      <ModalBalanceExport
        open={openExport}
        onClose={() => setOpenExport(false)}
      />
    </div>
  );
};

export default BalanceStatementContent;

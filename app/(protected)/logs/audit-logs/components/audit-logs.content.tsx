"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  mockInternalAuditLogs,
  mockMerchantAuditLogs,
} from "./audit-log-table/core/data/mock-audit-logs";
import { useAuditLogList } from "./audit-log-table/core/hooks/use-audit-log-list";
import AuditLogFilterModal from "./modal/audit-log-filter-modal";
import AuditLogExportModal from "./modal/audit-log-export-modal";
import AuditLogTable from "./audit-log-table";

const AuditLogsContent = () => {
  const { loading, error, handleSelectionChange } = useAuditLogList();
  const [openFilters, setOpenFilters] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  return (
    <div className="w-full">
      <Tabs defaultValue="internal" className="text-sm text-muted-foreground">
        <TabsList variant="line" className="w-fit">
          <TabsTrigger value="internal">Internal Logs</TabsTrigger>
          <TabsTrigger value="merchant">Merchant Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="internal">
          {/* Table For Internal Logs */}
          <div className="mt-6">
            <AuditLogTable
              data={mockInternalAuditLogs}
              onSelectionChange={handleSelectionChange}
              loading={loading}
              error={error || undefined}
              onOpenFilters={() => setOpenFilters(true)}
              onOpenExport={() => setOpenExport(true)}
            />
          </div>
        </TabsContent>
        <TabsContent value="merchant">
          {/* Table For Merchant Logs */}
          <div className="mt-6">
            <AuditLogTable
              data={mockMerchantAuditLogs}
              onSelectionChange={handleSelectionChange}
              loading={loading}
              error={error || undefined}
              onOpenFilters={() => setOpenFilters(true)}
              onOpenExport={() => setOpenExport(true)}
            />
          </div>
        </TabsContent>
      </Tabs>

      <AuditLogFilterModal
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      />
      <AuditLogExportModal
        open={openExport}
        onClose={() => setOpenExport(false)}
      />
    </div>
  );
};

export default AuditLogsContent;

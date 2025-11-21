"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockInternalAuditLogs,
  mockMerchantAuditLogs,
} from "./audit-log-table/core/data/mock-audit-logs";
import { AuditLogTable } from "./audit-log-table";

const AuditLogsContent = () => {
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
            <AuditLogTable data={mockInternalAuditLogs} />
          </div>
        </TabsContent>
        <TabsContent value="merchant">
          {/* Table For Merchant Logs */}
          <div className="mt-6">
            <AuditLogTable data={mockMerchantAuditLogs} isMerchantLogs={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditLogsContent;

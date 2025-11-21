"use client";

import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import { AuditLogData } from "../audit-log-table/core/types";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";

Dayjs.extend(utc);

interface ChangesDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: AuditLogData | null;
}

// Action button component
const ActionButton = ({ action, isActive }: { action: string; isActive: boolean }) => {
  const getActionLabel = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "Login";
      case "CREATE":
        return "Create";
      case "UPDATE":
        return "Update";
      case "DELETE":
        return "Delete";
      case "REVIEW":
        return "Review";
      default:
        return action;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={!isActive}
      className={`h-7 px-3 text-xs font-medium ${!isActive ? "opacity-50" : ""}`}
    >
      {getActionLabel(action)}
    </Button>
  );
};

// Copy button component
const CopyButton = ({ text, label }: { text: string; label: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="h-6 w-6 p-0"
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    }}
    title={`Copy ${label}`}
  >
    <Copy className="h-3 w-3" />
  </Button>
);

// Format date
const formatDate = (dateString: string) => {
  const localTime = Dayjs.utc(dateString).local();
  const formattedDate = localTime.format("ddd, MMM DD, YYYY");
  const formattedTime = localTime.format("HH:mm:ss");
  const offsetHours = localTime.utcOffset() / 60;
  const offsetSign = offsetHours >= 0 ? "+" : "-";
  const offsetValue = Math.abs(offsetHours);
  const formattedOffset = `${offsetSign}${offsetValue}`;

  return `${formattedDate}, ${formattedTime} (GMT ${formattedOffset})`;
};

// Parse bullet points from text
const parseBulletPoints = (text: string): string[] => {
  if (!text) return [];
  // Split by newlines or periods, filter empty strings
  return text
    .split(/[.\n]/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export function ChangesDetailModal({ open, onOpenChange, data }: ChangesDetailModalProps) {
  if (!data) return null;

  const beforeChangePoints = parseBulletPoints(data.beforeChange);
  const afterChangePoints = parseBulletPoints(data.afterChange);
  const isMerchantLog = !!data.clientId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="">
              Changes Detail
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="px-5 py-5 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Changes Detail Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Changes Detail</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Timestamp</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">{formatDate(data.timestamp)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Action</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 flex-wrap">
                        {(() => {
                          const actions = Array.isArray(data.action) ? data.action : [data.action];
                          return (
                            <>
                              <ActionButton action="CREATE" isActive={actions.includes("CREATE")} />
                              <ActionButton action="UPDATE" isActive={actions.includes("UPDATE")} />
                              <ActionButton action="DELETE" isActive={actions.includes("DELETE")} />
                            </>
                          );
                        })()}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Section</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">{data.sectionType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Section ID</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">{data.sectionId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Before Changes</TableCell>
                    <TableCell>
                      {beforeChangePoints.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {beforeChangePoints.map((point, index) => (
                            <li key={index} className="text-sm font-normal text-gray-800">
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm font-normal text-gray-800">No changes</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">After Changes</TableCell>
                    <TableCell>
                      {afterChangePoints.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {afterChangePoints.map((point, index) => (
                            <li key={index} className="text-sm font-normal text-gray-800">
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm font-normal text-gray-800">No changes</span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* User Info Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">User Info</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">User ID</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-gray-800 font-mono">{data.userId}</span>
                        <CopyButton text={data.userId} label="User ID" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">User Name</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">{data.user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">User Email</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">{data.user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">IP Address</TableCell>
                    <TableCell className="text-sm font-normal text-gray-800 font-mono">{data.ipAddress}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Merchant Info Section - Only for merchant logs */}
            {isMerchantLog && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Merchant Info</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Client ID</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-normal text-gray-800 font-mono">
                            {data.clientId || "N/A"}
                          </span>
                          {data.clientId && <CopyButton text={data.clientId} label="Client ID" />}
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-1/3 font-medium text-gray-600 text-xs">Merchant Name</TableCell>
                      <TableCell className="text-sm font-normal text-gray-800">
                        {data.merchantName || "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 border-t border-gray-200">
          <div className="flex items-center justify-end w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-4 py-3.5 text-b-13-14-500 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


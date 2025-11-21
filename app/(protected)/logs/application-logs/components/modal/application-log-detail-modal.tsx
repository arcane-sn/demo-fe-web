"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import { ApplicationLogData } from "../../core/types";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

Dayjs.extend(utc);

interface ApplicationLogDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ApplicationLogData | null;
}

// Level badge component
const LevelBadge = ({ level }: { level: ApplicationLogData["level"] }) => {
  const getVariant = (level: string) => {
    switch (level) {
      case "ERROR":
        return "destructive";
      case "WARN":
        return "warning";
      case "INFO":
        return "info";
      case "DEBUG":
        return "secondary";
      default:
        return "info";
    }
  };

  return (
    <Badge variant={getVariant(level)} className="text-xs font-medium">
      {level}
    </Badge>
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

export function ApplicationLogDetailModal({
  open,
  onOpenChange,
  data,
}: ApplicationLogDetailModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="">Application Log Detail</DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="px-5 py-5 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Log Information Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Log Information</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Timestamp
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {formatDate(data.timestamp)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Log ID
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-gray-800 font-mono">
                          {data.logId}
                        </span>
                        <CopyButton text={data.logId} label="Log ID" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Level
                    </TableCell>
                    <TableCell>
                      <LevelBadge level={data.level} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Service Name
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.serviceName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Event Type
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.eventType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Environment
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800 capitalize">
                      {data.env}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Response Status
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.responseStatus ?? "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Response Message
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.responseMessage}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Request Information Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Request Information</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      User ID
                    </TableCell>
                    <TableCell>
                      {data.userId ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-normal text-gray-800 font-mono">
                            {data.userId}
                          </span>
                          <CopyButton text={data.userId} label="User ID" />
                        </div>
                      ) : (
                        <span className="text-sm font-normal text-gray-800">
                          N/A
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Client ID
                    </TableCell>
                    <TableCell>
                      {data.clientId ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-normal text-gray-800 font-mono">
                            {data.clientId}
                          </span>
                          <CopyButton text={data.clientId} label="Client ID" />
                        </div>
                      ) : (
                        <span className="text-sm font-normal text-gray-800">
                          N/A
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Trace ID
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-gray-800 font-mono">
                          {data.traceId}
                        </span>
                        <CopyButton text={data.traceId} label="Trace ID" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      IP Address
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800 font-mono">
                      {data.ipAddress}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
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

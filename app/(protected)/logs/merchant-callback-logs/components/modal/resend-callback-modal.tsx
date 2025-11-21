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
import { MerchantCallbackLogData } from "../../core/types";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "sonner";
import { Badge, BadgeDot } from "@/components/ui/badge";

Dayjs.extend(utc);

interface ResendCallbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: MerchantCallbackLogData | null;
}

// Status badge component with BadgeDot
const StatusBadge = ({ status }: { status: "success" | "failed" }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "success":
        return {
          label: "Success",
          variant: "success" as const,
          appearance: "light" as const,
          dotColor: "bg-green-500",
        };
      case "failed":
        return {
          label: "Failed",
          variant: "destructive" as const,
          appearance: "light" as const,
          dotColor: "bg-red-500",
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
          appearance: "light" as const,
          dotColor: "bg-gray-500",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      appearance={config.appearance}
      shape="circle"
      className="text-xs font-medium"
    >
      <BadgeDot className={config.dotColor} />
      {config.label}
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

export function ResendCallbackModal({
  open,
  onOpenChange,
  data,
}: ResendCallbackModalProps) {
  if (!data) return null;

  // Determine status for the response (success or failed)
  const responseStatus: "success" | "failed" =
    data.status === "success" ? "success" : "failed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="">Resend Callback Response</DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="px-5 py-5 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Response Information Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Response Information</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      URL
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.url}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Client ID
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-gray-800 font-mono">
                          {data.clientId}
                        </span>
                        <CopyButton text={data.clientId} label="Client ID" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Merchant Name
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.merchantName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Status
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={responseStatus} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Response Code
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.responseCode ?? "N/A"}
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
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Retry Limit
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.remainingRetry}
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

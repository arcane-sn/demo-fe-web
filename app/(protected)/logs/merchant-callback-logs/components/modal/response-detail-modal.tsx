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

Dayjs.extend(utc);

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

interface ResponseDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: MerchantCallbackLogData | null;
}

export function ResponseDetailModal({
  open,
  onOpenChange,
  data,
}: ResponseDetailModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        {/* Header */}
        <DialogHeader className="px-5 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="">Response Detail</DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="px-5 py-5 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Callback Information Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Callback Information</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Created Date
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {formatDate(data.createdDate)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Updated Date
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {formatDate(data.updatedDate)}
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
                      Reference Number
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800 font-mono">
                      {data.referenceNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Partner Reference Number
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800 font-mono">
                      {data.partnerReferenceNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      URL
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.url}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Response Information Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Response Information</h3>
              <Table>
                <TableBody>
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
                      HTTP Status
                    </TableCell>
                    <TableCell className="text-sm font-normal text-gray-800">
                      {data.httpStatus ?? "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 font-medium text-gray-600 text-xs">
                      Remaining Retry
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

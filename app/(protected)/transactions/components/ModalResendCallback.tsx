"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { ComponentProps } from "react";
import { ResendCallbackDataTypes } from "../core/_models";

type ModalResendCallbackPropsTypes = ComponentProps<typeof Dialog> & {
  data?: ResendCallbackDataTypes;
  onResendCallback?: (open: boolean) => void;
};

const ModalResendCallback = ({
  open,
  onOpenChange,
  data,
  onResendCallback,
}: ModalResendCallbackPropsTypes) => {
  const handleResendCallback = () => {
    onResendCallback?.(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return (
          <Badge variant="success" appearance="light" size="sm">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Success
          </Badge>
        );
      case "Failed":
        return (
          <Badge variant="destructive" appearance="light" size="sm">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Failed
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="warning" appearance="light" size="sm">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" appearance="light" size="sm">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Header */}
        <DialogHeader className="pb-3 border-b border-gray-100">
          <DialogTitle className="text-slate-900 text-sm font-semibold">
            Response Vendor
          </DialogTitle>
        </DialogHeader>
        {/* Content */}
        <DialogBody className="p-0 w-full flex flex-col  gap-5 mb-4">
          {/* Response Data Section */}
          <div className="flex flex-col justify-start items-start gap-4">
            {/* URL */}
            <div className="w-full h-4 flex justify-start items-center gap-2.5">
              <div className="w-44 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm">URL</div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <div className="justify-start text-slate-800 text-sm ">
                  {data?.url || "Trx-1209123asdkj12038"}
                </div>

                <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </div>
            </div>

            {/* Separator */}
            <div className="self-stretch h-px bg-gray-100" />

            {/* Status */}
            <div className="self-stretch h-4 inline-flex justify-start items-center gap-2.5">
              <div className="w-44 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm ">
                  Status
                </div>
              </div>
              {getStatusBadge(data?.status || "Success")}
            </div>

            {/* Separator */}
            <div className="self-stretch h-px bg-gray-100" />

            {/* Response Code */}
            <div className="self-stretch h-4  inline-flex justify-start items-center gap-2.5">
              <div className="w-44 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm ">
                  Response Code
                </div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <div className="justify-start text-slate-800 text-sm ">
                  {data?.responseCode || "500"}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="self-stretch h-px bg-gray-100" />

            {/* Response Message */}
            <div className="self-stretch h-4  inline-flex justify-start items-center gap-2.5">
              <div className="w-44 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm ">
                  Response Message
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-800 text-sm ">
                  {data?.responseMessage || "Success Transfer"}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="self-stretch h-px bg-gray-100" />

            {/* Retry Limit */}
            <div className="self-stretch h-4  inline-flex justify-start items-center gap-2.5">
              <div className="w-44 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm ">
                  Retry Limit
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-800 text-sm ">
                  {data?.retryLimit || "5"}
                </div>
              </div>
            </div>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="w-full pt-3 flex justify-between items-center gap-2.5 border-t border-gray-100">
          <Button variant="primary-light" onClick={handleResendCallback}>
            Resend Callback
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="py-3 px-4 text-slate-600 text-xs font-medium bg-white rounded-md  flex justify-center items-center gap-2.5 "
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResendCallback;

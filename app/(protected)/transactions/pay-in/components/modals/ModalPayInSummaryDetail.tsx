"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PAY_IN_SUMMARY_DETAIL_ITEMS,
  type PayInSummaryDetailItem,
} from "../../core/_consts";

interface ModalPayInSummaryDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  items?: PayInSummaryDetailItem[];
}

const ModalPayInSummaryDetail = ({
  open,
  onOpenChange,
  title = "Pay-In Summary Detail",
  items = PAY_IN_SUMMARY_DETAIL_ITEMS,
}: ModalPayInSummaryDetailProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  // Group items into rows based on the image layout
  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3, 7);
  const thirdRow = items.slice(7, 9);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl max-h-[90vh] overflow-y-auto"
        close={false}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4 mb-0">
          <DialogTitle>
            {title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="size-8 p-1.5"
          >
            <X className="size-4" />
          </Button>
        </DialogHeader>

        {/* Content */}
        <DialogBody className="py-6">
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {firstRow.map((item, index) => (
                <Card key={index} >
                <CardHeader>
                    <CardTitle className="text-sm font-normal text-slate-900 leading-none">
                        {item.label}
                    </CardTitle>
                    <KeenIcon icon={item.icon} className="w-5 h-5 text-gray-500" />
                </CardHeader>
                  <CardContent className="p-5">
                    <div className="text-2xl font-semibold text-dark leading-none">
                      {item.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondRow.map((item, index) => (
                <Card key={index} >
                <CardHeader>
                    <CardTitle className="text-sm font-normal text-slate-900 leading-none">
                        {item.label}
                    </CardTitle>
                    <KeenIcon icon={item.icon} className="w-5 h-5 text-gray-500" />
                </CardHeader>
                  <CardContent className="p-5">
                    <div className="text-2xl font-semibold text-dark leading-none">
                      {item.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thirdRow.map((item, index) => (
                <Card key={index} >
                <CardHeader>
                    <CardTitle className="text-sm font-normal text-slate-900 leading-none">
                        {item.label}
                    </CardTitle>
                    <KeenIcon icon={item.icon} className="w-5 h-5 text-gray-500" />
                </CardHeader>
                  <CardContent className="p-5">
                    <div className="text-2xl font-semibold text-dark leading-none">
                      {item.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex justify-end border-t border-gray-100 pt-4">
          <Button
            variant="outline"
            size="md"
            onClick={handleClose}
            className="bg-white border-zinc-200 text-slate-600 text-xs font-medium"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPayInSummaryDetail;


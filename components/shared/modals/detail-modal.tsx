"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, X } from "lucide-react";
import { ReactNode } from "react";

export interface DetailItem {
  label: string;
  value: string | number;
  IconComponent?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  description?: string;
  onInfoClick?: () => void;
  formatValue?: (value: string | number) => string;
}

export interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: DetailItem[];
  closeButtonLabel?: string;
  maxWidth?: string;
  showInfoIcon?: boolean;
  currencyFormat?: {
    currency?: string;
    locale?: string;
    useDotSeparator?: boolean;
  };
}

const defaultFormatCurrency = (
  amount: number | string,
  options?: {
    currency?: string;
    locale?: string;
    useDotSeparator?: boolean;
  }
): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return String(amount);

  const currency = options?.currency || "IDR";
  const locale = options?.locale || "id-ID";
  const useDotSeparator = options?.useDotSeparator ?? true;

  if (useDotSeparator) {
    return `${currency} ${numAmount.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/,/g, ".")}`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency === "IDR" ? "IDR" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(numAmount)
    .replace("Rp", currency);
};

export const DetailModal = ({
  open,
  onClose,
  title,
  items,
  closeButtonLabel = "Close",
  maxWidth = "max-w-[540px]",
  showInfoIcon = true,
  currencyFormat,
}: DetailModalProps) => {
  const formatValue = (item: DetailItem, value: string | number): string => {
    if (item.formatValue) {
      return item.formatValue(value);
    }

    if (typeof value === "number") {
      return defaultFormatCurrency(value, currencyFormat);
    }

    return value;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`${maxWidth} p-0`}>
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogBody className="px-6 py-6">
          <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-4">
                  {item.IconComponent && (
                    <div className="flex items-center justify-center flex-shrink-0 pt-2">
                      <item.IconComponent
                        className={`w-6 h-6 ${item.iconColor || "text-gray-500"}`}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="text-2xl font-semibold text-gray-900 leading-tight">
                      {formatValue(item, item.value)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-normal text-gray-500">
                        {item.label}
                      </div>
                      {showInfoIcon && item.description && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                              onClick={item.onInfoClick}
                            >
                              <Info className="w-3 h-3 text-gray-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            variant="light"
                            side="right"
                            className="max-w-xs p-4 text-sm bg-white border border-gray-200 shadow-lg rounded-lg"
                          >
                            <p className="text-gray-700 whitespace-normal leading-relaxed">
                              {item.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {showInfoIcon && !item.description && (
                        <div
                          className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                          onClick={item.onInfoClick}
                          title="Information"
                        >
                          <Info className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="border-t border-gray-200 px-6 py-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="ml-auto bg-gray-50 hover:bg-gray-100 text-gray-900 border-gray-200"
          >
            {closeButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;


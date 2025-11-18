"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { InfoCardItem, PayInInfoCardItem, PayOutInfoCardItem } from "./types";

interface InfoCardProps {
  title: string;
  items: InfoCardItem[];
  variant?: "pay-in" | "pay-out";
  className?: string;
}

function isPayInItem(item: InfoCardItem): item is PayInInfoCardItem {
  return "isHighlighted" in item || "showDivider" in item || "info" in item;
}

function isPayOutItem(item: InfoCardItem): item is PayOutInfoCardItem {
  return "badge" in item;
}

const getBadgeVariant = (variant: string) => {
  switch (variant) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "destructive":
      return "destructive";
    case "info":
      return "info";
    case "primary":
      return "primary";
    default:
      return "secondary";
  }
};

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function InfoCard({ title, items, variant, className }: InfoCardProps) {
  const detectedVariant = variant || (items.length > 0 && isPayOutItem(items[0]) ? "pay-out" : "pay-in");

  if (detectedVariant === "pay-out") {
    return (
      <Card className={className}>
        <CardHeader className="px-7 py-5 border-b border-gray-100">
          <CardTitle className="text-base font-semibold text-slate-900 leading-none">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-7 pb-7 pt-0">
          <div className="flex flex-col gap-4 pt-5">
            {items.map((item, index) => {
              const payOutItem = item as PayOutInfoCardItem;
              return (
                <div key={index}>
                  <div className="flex items-center gap-2.5 min-h-4">
                    <div className="w-44 flex items-center gap-2.5">
                      <div className="text-sm font-normal text-slate-500 leading-none">
                        {payOutItem.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {payOutItem.badge ? (
                        <Badge
                          variant={getBadgeVariant(payOutItem.badge.variant)}
                          appearance="light"
                          size="sm"
                          className="px-1.5 py-1"
                        >
                          <div className="w-1 h-1 rounded-full bg-current mr-1" />
                          {payOutItem.badge.label}
                        </Badge>
                      ) : (
                        <div className="text-sm font-normal text-slate-800 leading-none">
                          {payOutItem.value}
                        </div>
                      )}
                      {payOutItem.copyable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(payOutItem.value)}
                          className="size-4 p-0 hover:bg-transparent"
                        >
                          <Copy className="size-4 text-slate-400" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < items.length - 1 && (
                    <div className="h-px bg-gray-100 mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  const payInItems = items as PayInInfoCardItem[];
  return (
    <Card className={cn("bg-light overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-[240px]" />
            <col className="w-auto" />
          </colgroup>
          <TableBody>
            {payInItems.map((item, index) => {
              const isLast = index === payInItems.length - 1;
              const showDivider = item.showDivider && !isLast;
              const isHighlighted = item.isHighlighted;

              return (
                <React.Fragment key={index}>
                  {showDivider && (
                    <TableRow className="border-0 hover:!bg-transparent [&:has(td):hover]:!bg-transparent">
                      <TableCell
                        colSpan={2}
                        className="p-0 pb-4 pt-0 px-8 border-b border-gray-300"
                      />
                    </TableRow>
                  )}
                  <TableRow
                    className={cn(
                      "border-0 hover:!bg-transparent [&:has(td):hover]:!bg-transparent",
                      !isLast && !showDivider && "border-b border-gray-200"
                    )}
                  >
                    <TableCell
                      className={cn(
                        "p-0 py-4 pl-8 pr-20 align-top whitespace-nowrap",
                        isHighlighted
                          ? "text-b-14-22-600 text-dark"
                          : "text-b-13-20-400 text-gray-600"
                      )}
                    >
                      {item.label}
                    </TableCell>
                    <TableCell className="p-0 py-4 pr-8 align-top">
                      <div className="flex items-center gap-3">
                        <div
                          className={
                            isHighlighted
                              ? " text-dark"
                              : " text-dark"
                          }
                        >
                          {item.value}
                        </div>
                        {item.copyable && (
                          <button
                            type="button"
                            onClick={() => handleCopy(item.value)}
                            className="cursor-pointer hover:opacity-70"
                          >
                            <KeenIcon
                              icon="copy"
                              className="w-4 h-4 text-gray-600 hover:text-gray-800"
                            />
                          </button>
                        )}
                        {item.info && (
                          <KeenIcon
                            icon="information-5"
                            className="w-4 h-4 text-gray-500"
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


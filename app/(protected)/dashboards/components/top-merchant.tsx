"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTopMerchants } from "../core/hooks";
import { formatCurrency, formatNumber } from "../core/helpers";
import { MERCHANT_SORT_OPTIONS } from "../core/constants";

export default function TopMerchant() {
  const { merchants, sortBy, setSortBy } = useTopMerchants();

  return (
    <Card>
      <CardContent className="p-0">
        {/* Header with title and select */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Top 5 Merchants
          </h3>
          <Select
            value={sortBy}
            onValueChange={(value: "byAmount" | "byVolume") => setSortBy(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue>
                {sortBy === MERCHANT_SORT_OPTIONS.BY_AMOUNT
                  ? "by Amount"
                  : "by Volume"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MERCHANT_SORT_OPTIONS.BY_AMOUNT}>
                by Amount
              </SelectItem>
              <SelectItem value={MERCHANT_SORT_OPTIONS.BY_VOLUME}>
                by Volume
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-700 bg-gray-100">
                Merchant
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-center bg-gray-100">
                Volume
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right bg-gray-100">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchants.map((merchant) => (
              <TableRow key={merchant.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {merchant.name}
                </TableCell>
                <TableCell className="text-center text-gray-600">
                  {formatNumber(merchant.volume)}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  {formatCurrency(merchant.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


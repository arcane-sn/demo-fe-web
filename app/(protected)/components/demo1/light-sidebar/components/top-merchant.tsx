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
import { useState } from "react";

const merchants = [
  {
    id: "MERCH001",
    name: "TechCorp Solutions",
    volume: 1250,
    amount: 125000,
  },
  {
    id: "MERCH002",
    name: "Global Retail Ltd",
    volume: 980,
    amount: 98000,
  },
  {
    id: "MERCH003",
    name: "Digital Services Inc",
    volume: 750,
    amount: 75000,
  },
  {
    id: "MERCH004",
    name: "E-commerce Hub",
    volume: 650,
    amount: 65000,
  },
  {
    id: "MERCH005",
    name: "Online Marketplace",
    volume: 520,
    amount: 52000,
  },
];

export default function TopMerchant() {
  const [sortBy, setSortBy] = useState<"byAmount" | "byVolume">("byAmount");

  // Sort merchants based on selected criteria
  const sortedMerchants = [...merchants].sort((a, b) => {
    if (sortBy === "byAmount") {
      return b.amount - a.amount;
    } else {
      return b.volume - a.volume;
    }
  });

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header with title and select */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Top 5 Merchants
          </h3>
          <Select
            value={sortBy}
            onValueChange={(value: "byAmount" | "byVolume") => setSortBy(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="byAmount">By Amount</SelectItem>
              <SelectItem value="byVolume">By Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-gray-700">
                Merchant
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Volume
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMerchants.map((merchant, index) => (
              <TableRow key={merchant.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    {merchant.name}
                  </div>
                </TableCell>
                <TableCell className="text-right text-gray-600">
                  {merchant.volume.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  ${merchant.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

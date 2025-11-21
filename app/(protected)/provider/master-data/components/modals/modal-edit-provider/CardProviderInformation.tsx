import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";

const CardProviderInformation = () => {
  const providerId = "CH-P2025091900001";

  const handleCopy = () => {
    navigator.clipboard.writeText(providerId);
  };

  return (
    <Card id="Provider Information-0" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Provider Information</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <Table>
          <TableBody>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Provider ID</Label>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-900">{providerId}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 h-auto"
                    onClick={handleCopy}
                    title="Copy Provider ID"
                  >
                    <Copy className="size-3 text-slate-400" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Provider Name</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Enter provider name"
                  defaultValue="PIRO-01"
                />
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Provider Type</Label>
              </TableCell>
              <TableCell>
                <Select value="QR" onValueChange={() => {}}>
                  <SelectTrigger className="max-w-full">
                    <SelectValue placeholder="Choose provider type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QR">QR</SelectItem>
                    <SelectItem value="transaction_id">Transaction ID</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardProviderInformation;

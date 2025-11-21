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
import React from "react";

const CardProviderInformation = () => {
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
                <Label>Provider Name</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Enter provider name"
                />
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Provider Type</Label>
              </TableCell>
              <TableCell>
                <Select value={""} onValueChange={() => {}}>
                  <SelectTrigger className="max-w-full">
                    <SelectValue placeholder="Choose provider type" />
                  </SelectTrigger>
                  <SelectContent>
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

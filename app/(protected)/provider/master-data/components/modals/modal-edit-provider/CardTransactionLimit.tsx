import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Info } from "lucide-react";
import React, { useState } from "react";

const CardTransactionLimit = () => {
  const [minimumAmount, setMinimumAmount] = useState("IDR 15.000");
  const [maximumAmount, setMaximumAmount] = useState("IDR 100.000.000");

  return (
    <Card id="Default Transaction Limit-3" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Default Transaction Limit (Optional)</CardTitle>
        <CardDescription>
          Set a default transaction limit for this provider
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <div className="flex items-start gap-2 mb-5">
          <Info className="size-4 text-slate-500 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            Modifying the default limit will not impact any previously
            configured limit
          </p>
        </div>
        <Table>
          <TableBody>
            {/* Amount Limit Section */}
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Amount Limit</Label>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5 max-w-full">
                  <FloatingLabelInput
                    label="Minimum Amount"
                    value={minimumAmount}
                    onChange={setMinimumAmount}
                    placeholder="IDR 15.000"
                    className="bg-white"
                  />
                  <span className="text-xs">-</span>
                  <FloatingLabelInput
                    label="Maximum Amount"
                    value={maximumAmount}
                    onChange={setMaximumAmount}
                    placeholder="IDR 100.000.000"
                    className="bg-white"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground mt-5">
          If empty, the validation limit will be on provider side
        </p>
      </CardContent>
    </Card>
  );
};

export default CardTransactionLimit;

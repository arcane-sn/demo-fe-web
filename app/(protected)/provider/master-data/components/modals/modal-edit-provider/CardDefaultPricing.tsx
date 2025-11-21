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

const CardDefaultPricing = () => {
  const [percentagePrice, setPercentagePrice] = useState("0.7%");
  const [fixedPrice, setFixedPrice] = useState("IDR 0");

  return (
    <Card id="Default Pricing (MDR)-2" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Default Pricing (MDR)</CardTitle>
        <CardDescription>
          Set a default pricing for this provider
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <div className="flex items-start gap-2 mb-5">
          <Info className="size-4 text-slate-500 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            Modifying the default pricing will not impact any previously
            configured pricing
          </p>
        </div>
        <Table>
          <TableBody>
            {/* Provider Rate Section */}
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Provider Rate</Label>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5 max-w-full">
                  <FloatingLabelInput
                    label="Percentage Price"
                    value={percentagePrice}
                    onChange={setPercentagePrice}
                    placeholder="0%"
                    className="bg-white"
                  />
                  <span className="text-xs">+</span>
                  <FloatingLabelInput
                    label="Fixed Price"
                    value={fixedPrice}
                    onChange={setFixedPrice}
                    placeholder="IDR 0"
                    className="bg-white"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardDefaultPricing;

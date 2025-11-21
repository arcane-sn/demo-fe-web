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
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AlertCircle } from "lucide-react";

export interface CardDefaultPricingHandle {
  validate: () => boolean;
}

const CardDefaultPricing = forwardRef<CardDefaultPricingHandle>((_props, ref) => {
  const [percentagePrice, setPercentagePrice] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [errors, setErrors] = useState<{ percentage?: string; fixed?: string }>(
    {}
  );

  const formatPercentage = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (!numericValue) return "";
    return `${numericValue}%`;
  };

  const formatIDR = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (!numericValue) return "";
    const formatted = Number(numericValue).toLocaleString("id-ID");
    return `IDR ${formatted}`;
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!percentagePrice.trim()) {
      newErrors.percentage = "This field is required";
    }

    if (!fixedPrice.trim()) {
      newErrors.fixed = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate,
    }),
    [validate]
  );

  const handlePercentageChange = (value: string) => {
    const formattedValue = formatPercentage(value);
    setPercentagePrice(formattedValue);
    setErrors((prev) => ({ ...prev, percentage: undefined }));
  };

  const handleFixedChange = (value: string) => {
    const formattedValue = formatIDR(value);
    setFixedPrice(formattedValue);
    setErrors((prev) => ({ ...prev, fixed: undefined }));
  };

  return (
    <Card id="Default Pricing (MDR)-2" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Default Pricing (MDR)</CardTitle>
        <CardDescription>
          Set a default pricing for this provider
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
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
                    onChange={handlePercentageChange}
                    placeholder="0%"
                    className="bg-white"
                    error={!!errors.percentage}
                    errorMessage={errors.percentage}
                    errorIcon={<AlertCircle className="h-4 w-4 text-red-500" />}
                  />
                  <span className="text-xs">+</span>
                  <FloatingLabelInput
                    label="Fixed Price"
                    value={fixedPrice}
                    onChange={handleFixedChange}
                    placeholder="IDR 0"
                    className="bg-white"
                    error={!!errors.fixed}
                    errorMessage={errors.fixed}
                    errorIcon={<AlertCircle className="h-4 w-4 text-red-500" />}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

CardDefaultPricing.displayName = "CardDefaultPricing";

export default CardDefaultPricing;

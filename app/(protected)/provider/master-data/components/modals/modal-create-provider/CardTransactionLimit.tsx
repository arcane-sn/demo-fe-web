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
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { AlertCircle } from "lucide-react";

export interface CardTransactionLimitHandle {
  validate: () => boolean;
}

const CardTransactionLimit = forwardRef<CardTransactionLimitHandle>(
  (_props, ref) => {
    const [minimumAmount, setMinimumAmount] = useState("");
    const [maximumAmount, setMaximumAmount] = useState("");
    const [error, setError] = useState<string>("");

    const parseAmount = (value: string): number => {
      const cleaned = value.replace(/[^\d]/g, "");
      return parseInt(cleaned || "0", 10);
    };

    const validate = useCallback(() => {
      if (!minimumAmount.trim() || !maximumAmount.trim()) {
        setError("This field is required");
        return false;
      }

      const minValue = parseAmount(minimumAmount);
      const maxValue = parseAmount(maximumAmount);

      if (maxValue <= minValue) {
        setError("Max amount must be greater than min amount");
        return false;
      }

      setError("");
      return true;
    }, [maximumAmount, minimumAmount]);

    useImperativeHandle(
      ref,
      () => ({
        validate,
      }),
      [validate]
    );

    const formatIDR = (value: string) => {
      const numericValue = value.replace(/[^\d]/g, "");
      if (!numericValue) return "";
      const formatted = Number(numericValue).toLocaleString("id-ID");
      return `IDR ${formatted}`;
    };

    const handleMinimumChange = (value: string) => {
      const formattedValue = formatIDR(value);
      setMinimumAmount(formattedValue);
      setError("");
    };

    const handleMaximumChange = (value: string) => {
      const formattedValue = formatIDR(value);
      setMaximumAmount(formattedValue);
      setError("");
    };

    return (
      <Card id="Default Transaction Limit-3" className="min-w-0 max-w-full">
        <CardHeader>
          <CardTitle>Default Transaction Limit (Optional)</CardTitle>
          <CardDescription>
            Set a default transaction limit for this provider
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-0 max-w-full">
          <Table>
            <TableBody>
              {/* Amount Limit Section */}
              <TableRow className="border-0 hover:!bg-transparent">
                <TableCell className="w-1/4">
                  <Label>Amount Limit</Label>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5 max-w-full">
                      <FloatingLabelInput
                        label="Minimum Amount"
                        value={minimumAmount}
                        onChange={handleMinimumChange}
                        placeholder="IDR 15.000"
                        className="bg-white"
                      />
                      <span className="text-xs">-</span>
                      <FloatingLabelInput
                        label="Maximum Amount"
                        value={maximumAmount}
                        onChange={handleMaximumChange}
                        placeholder="IDR 100.000.000"
                        className="bg-white"
                        error={!!error}
                        errorMessage={error}
                        errorIcon={<AlertCircle className="h-4 w-4 text-red-500" />}
                      />
                    </div>
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
  }
);

CardTransactionLimit.displayName = "CardTransactionLimit";

export default CardTransactionLimit;

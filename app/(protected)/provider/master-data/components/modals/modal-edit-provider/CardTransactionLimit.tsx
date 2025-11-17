import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CardTransactionLimit = () => {
  return (
    <Card className="mb-7" id="Default Transaction Limit-3">
      <CardHeader className="justify-start gap-3">
        <CardTitle className="text-b-16-16-600 text-gray-900">
          Default Transaction Limit (Optional)
        </CardTitle>
        <CardDescription className="text-b-13-14-400 text-gray-600">
          Set a default transaction limit for this provider
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Amount Limit Section */}
        <div className="flex items-center mb-6">
          <Label className="text-b-12-12-400 text-gray-800 w-1/4">
            Amount Limit
          </Label>
          <div className="flex items-center gap-2.5 w-full max-w-xs">
            <div className="flex-1 relative">
              <Input value="IDR 15.000" className="bg-gray-100 text-gray-800" />
              <Label className="absolute -top-2 left-2 bg-white px-1 text-b-11-12-400 text-gray-500">
                Minimum Amount
              </Label>
            </div>
            <span className="text-b-12-12-400 text-gray-800">-</span>
            <div className="flex-1 relative">
              <Input
                value="IDR 100.000.000"
                className="bg-gray-100 text-gray-800"
              />
              <Label className="absolute -top-2 left-2 bg-white px-1 text-b-11-12-400 text-gray-500">
                Maximum Amount
              </Label>
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-b-12-12-400 text-gray-500">
          If empty, the validation limit will be on provider side
        </p>
      </CardContent>
    </Card>
  );
};

export default CardTransactionLimit;

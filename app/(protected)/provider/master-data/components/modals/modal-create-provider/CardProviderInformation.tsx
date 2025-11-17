import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const CardProviderInformation = () => {
  return (
    <Card className="mb-7" id="Provider Information-0">
      <CardHeader>
        <CardTitle className="text-b-16-16-600 text-gray-900">
          Provider Information
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <InputGroup>
          <Label className="text-b-13-14-400 text-gray-800">
            Provider Name
          </Label>
          <Input
            type="text"
            placeholder="Enter provider name"
            className="w-full"
          />
        </InputGroup>
        <InputGroup>
          <Label className="text-b-13-14-400 text-gray-800">
            Provider Type
          </Label>
          <Select value={""} onValueChange={() => {}}>
            <SelectTrigger>
              <SelectValue placeholder="Choose provider type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transaction_id">Transaction ID</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
      </CardContent>
    </Card>
  );
};

export default CardProviderInformation;

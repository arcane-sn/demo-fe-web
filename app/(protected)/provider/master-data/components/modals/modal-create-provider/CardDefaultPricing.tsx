import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch, SwitchWrapper } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";
import { Separator } from "@/components/ui/separator";

const CardDefaultPricing = () => {
  return (
    <Card className="mb-7" id="Default Pricing (MDR)-2">
      <CardHeader className="justify-start gap-5">
        <CardTitle className="text-b-16-16-600 text-gray-900">
          Default Pricing (MDR)
        </CardTitle>
        <CardDescription className="text-b-13-14-400 text-gray-600">
          Set a default pricing for this provider
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* ON US Section */}
        <div className="flex items-center mb-4">
          <Label className="text-base font-semibold text-slate-900 w-1/4">
            ON US
          </Label>
          <div className="flex items-center gap-2.5">
            <SwitchWrapper>
              <Switch defaultChecked />
            </SwitchWrapper>
            <span className="text-sm font-medium text-slate-800">Active</span>
          </div>
        </div>

        {/* Pricing Type Section */}
        <div className="flex items-center mb-5">
          <Label className="text-xs font-normal text-slate-800 w-1/4">
            Pricing Type
          </Label>
          <Select defaultValue="medium">
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select pricing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Inactive</SelectItem>
              <SelectItem value="medium">Medium - Active</SelectItem>
              <SelectItem value="high">High - Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fee Rate Section */}
        <div className="flex items-center">
          <Label className="text-xs font-normal text-slate-800 w-1/4">
            Fee Rate
          </Label>
          <div className="flex items-center gap-2.5 w-full max-w-xs">
            <div className="flex-1 relative">
              <Input
                value="0%"
                disabled
                className="bg-stone-50 text-slate-300"
              />
              <Label className="absolute -top-2 left-2 bg-stone-50 px-1 text-xs text-slate-300">
                Percentage Price
              </Label>
            </div>
            <span className="text-xs font-normal text-slate-800">+</span>
            <div className="flex-1 relative">
              <Input
                value="IDR 0"
                disabled
                className="bg-stone-50 text-slate-300"
              />
              <Label className="absolute -top-2 left-2 bg-stone-50 px-1 text-xs text-slate-300">
                Fixed Price
              </Label>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* OFF US Section */}
        <div className="flex items-center mb-4">
          <Label className="text-base font-semibold text-slate-900 w-1/4">
            OFF US
          </Label>
          <div className="flex items-center gap-2.5">
            <SwitchWrapper>
              <Switch defaultChecked />
            </SwitchWrapper>
            <span className="text-sm font-medium text-slate-800">Active</span>
          </div>
        </div>

        {/* Pricing Type Section */}
        <div className="flex items-center mb-5">
          <Label className="text-xs font-normal text-slate-800 w-1/4">
            Pricing Type
          </Label>
          <Select defaultValue="medium">
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select pricing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Inactive</SelectItem>
              <SelectItem value="medium">Medium - Active</SelectItem>
              <SelectItem value="high">High - Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fee Rate Section */}
        <div className="flex items-center">
          <Label className="text-xs font-normal text-slate-800 w-1/4">
            Fee Rate
          </Label>
          <div className="flex items-center gap-2.5 w-full max-w-xs">
            <div className="flex-1 relative">
              <Input
                value="0%"
                disabled
                className="bg-stone-50 text-slate-300"
              />
              <Label className="absolute -top-2 left-2 bg-stone-50 px-1 text-xs text-slate-300">
                Percentage Price
              </Label>
            </div>
            <span className="text-xs font-normal text-slate-800">+</span>
            <div className="flex-1 relative">
              <Input
                value="IDR 0"
                disabled
                className="bg-stone-50 text-slate-300"
              />
              <Label className="absolute -top-2 left-2 bg-stone-50 px-1 text-xs text-slate-300">
                Fixed Price
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDefaultPricing;

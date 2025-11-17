import BalanceOverview from "@/app/(protected)/balance/merchants-balance/components/balance-overview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes, BoxesIcon, RefreshCcw, Rocket, Watch } from "lucide-react";

const ProviderBalance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between">
          <div className="size- inline-flex justify-start items-center gap-3">
            <div className="size-5 relative overflow-hidden">
              <Boxes className="size-5 text-grey-500 bg-grey-500" />
            </div>
            <div className="justify-start text-grey-900 text-base font-semibold font-['Inter'] leading-none">
              Provider Balance
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className=" bg-primary-light text-primary border-primary-clarity-20"
            >
              <RefreshCcw />
              Refresh Balance
            </Button>
            <Button variant="outline">Balance Detail</Button>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                        <BoxesIcon className="size-4" />
                      </div>
                      <span className="text-grey-900">[Provider Name]</span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alto Premium">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                      <BoxesIcon className="size-4" />
                    </div>
                    <span className="text-grey-900">[Alto Premium]</span>
                  </div>
                </SelectItem>
                <SelectItem value="Alto Standar">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                      <BoxesIcon className="size-4" />
                    </div>
                    <span className="text-grey-900">[Alto Standar]</span>
                  </div>
                </SelectItem>
                <SelectItem value="Alto Basic">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                      <BoxesIcon className="size-4" />
                    </div>
                    <span className="text-grey-900">[Alto Basic]</span>
                  </div>
                </SelectItem>
                <SelectItem value="Flip ">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                      <BoxesIcon className="size-4" />
                    </div>
                    <span className="text-grey-900">[Flip]</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-start gap-8">
          <div className="w-full">
            <BalanceOverview
              icon={<Rocket className="h-7 w-7 text-success -mt-3" />}
              value="IDR 1.195.000.000"
              title="Total Active Balance"
            />
          </div>
          <div className="h-12 w-1 border-l border-gray-200 "></div>
          <div className="w-full">
            <BalanceOverview
              icon={<Watch className="h-7 w-7 text-orange -mt-3" />}
              value="IDR 155.000.000"
              title="Total Pending Balance"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderBalance;

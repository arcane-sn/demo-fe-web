import { Card, CardContent } from "@/components/ui/card";
import BalanceOverview from "@/app/(protected)/balance/balance-statement/components/balance-statement-overview";
import TopMerchant from "./components/top-merchant";
import { TransactionHighlight } from "./components/transaction-highlight";
import TopChannel from "./components/top-channel";

export function Demo1LightSidebarContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="w-full">
        <Card>
          <CardContent>
            <div className="w-full flex items-center justify-center gap-8 p-8">
              {/* <BalanceOverview value="600" title="Total Transaction" />
              <BalanceOverview
                value="IDR 155.000.000"
                title="Total Flypay Revenue"
              />
              <BalanceOverview
                value="IDR 624.000.000"
                title="Total Vendor Admin Fee"
              /> */}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <div className="w-full">
          <TransactionHighlight />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <TopMerchant />
        </div>
        <div className="lg:col-span-1">
          <TopChannel />
        </div>
      </div>
    </div>
  );
}

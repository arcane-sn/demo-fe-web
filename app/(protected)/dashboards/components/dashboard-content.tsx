"use client";

import { Card, CardContent } from "@/components/ui/card";
import BalanceOverview from "./balance-overview";
import TopMerchant from "./top-merchant";
import { TransactionHighlight } from "./transaction-highlight";
import TopChannel from "./top-channel";
import { QuickAccess } from "./quick-access";
import { MOCK_BALANCE_OVERVIEW } from "../core/data/mock-data";

export function DashboardContent() {
  const balanceOverviewData = MOCK_BALANCE_OVERVIEW;

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="w-full">
        <Card>
          <CardContent>
            <div className="w-full flex items-center justify-center gap-8 p-5">
              {balanceOverviewData.map((item, index) => (
                <BalanceOverview
                  key={index}
                  value={item.value}
                  title={item.title}
                />
              ))}
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
      <div className="w-full">
        <QuickAccess />
      </div>
    </div>
  );
}

import BalanceStatementOverview from "@/app/(protected)/balance/balance-statement/components/balance-statement-overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettlementOverview = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between">
          Settled Transactions Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-start gap-8">
          <div className="w-full">
            <BalanceStatementOverview value="1000" title="Total Transaction" />
          </div>
          <div className="h-12 w-1 border-l border-gray-200 "></div>
          <div className="w-full">
            <BalanceStatementOverview
              value="IDR 155.000.000"
              title="Total Net Settlement Amount"
            />
          </div>
          <div className="h-12 w-1 border-l border-gray-200 "></div>
          <div className="w-full">
            <BalanceStatementOverview
              value="IDR 9.000.000"
              title="Total MDR Flypay"
            />
          </div>
          <div className="h-12 w-1 border-l border-gray-200 "></div>
          <div className="w-full">
            <BalanceStatementOverview
              value="IDR 369.000.000"
              title="Total Paid Amount"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementOverview;

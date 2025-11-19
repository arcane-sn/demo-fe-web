import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewStatCard from "./overview-stat-card";
import { SETTLEMENT_OVERVIEW_STATS } from "../core/constants";

const SettlementOverview = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between">
          Settled Transactions Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {SETTLEMENT_OVERVIEW_STATS.map((stat) => (
            <OverviewStatCard key={stat.title} value={stat.value} title={stat.title} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementOverview;

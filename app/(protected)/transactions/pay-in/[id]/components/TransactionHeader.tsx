import { Badge } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";
import { TransactionDetail } from "../core/_models";
import { StatsCard } from "./StatsCard";
import { getStatsData } from "../core/_helpers";
import { Card } from "@/components/ui/card";
import DropdownActionPayin from "../../components/DropdownActionPayIn";

interface TransactionHeaderProps {
  transaction: TransactionDetail;
}

export function TransactionHeader({
  transaction,
}: TransactionHeaderProps) {
  return (
    <Card className="w-full p-8 bg-light rounded-xl border border-gray-300 shadow-sm flex flex-col gap-8">
      {/* Transaction ID Section */}
      <div className="w-full flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-b-14-22-400 text-gray-600">Transaction ID</div>
          <div className="flex items-center gap-3">
            <div className="text-h-24-24-600 text-dark">{transaction.id}</div>
            <KeenIcon
              icon="copy"
              className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <Badge
              variant="success"
              className="px-3 py-2 bg-success-light rounded-full border border-success"
            >
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-b-13-14-500 text-success ml-2">
                {transaction.status}
              </span>
            </Badge>
          </div>
        </div>

        <DropdownActionPayin
          triggerClassName="w-20 justify-center gap-1.5 cursor-pointer bg-primary-light"
          alwaysEnabled={true}
        />
      </div>
      {/* Stats Cards */}
      <div className="w-full flex gap-5 flex-wrap">
        {getStatsData(transaction).map((data, index) => (
          <StatsCard key={index} data={data} />
        ))}
      </div>
    </Card>
  );
}

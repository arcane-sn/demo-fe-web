import { Badge } from "@/components/ui/badge";
import { KeenIcon } from "@/components/keenicons";
import { TransactionDetail } from "../core/_models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_ACTIONS } from "../../core/_consts";
import { StatsCard } from "./StatsCard";
import { getStatsData } from "../core/_helpers";
import { Card } from "@/components/ui/card";

interface TransactionHeaderProps {
  transaction: TransactionDetail;
  onAction: (value: string) => void;
}

export function TransactionHeader({
  transaction,
  onAction,
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

        <Select onValueChange={onAction}>
          <SelectTrigger className="w-[150px] cursor-pointer bg-primary-light">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            {TRANSACTION_ACTIONS.map(({ value, label }, index) => (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

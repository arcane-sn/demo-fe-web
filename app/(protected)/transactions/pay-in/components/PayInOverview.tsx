import { Card, CardContent } from "@/components/ui/card";
import {
  PAY_IN_STATS,
  PAYMENT_METHODS,
  TRANSACTION_ACTIONS,
} from "../core/_consts";
import { Statistics } from "@/components/ui/statistics";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "@/components/common/toolbar";
import {
  ToolbarDescription,
  ToolbarPageTitle,
} from "@/app/components/partials/common/toolbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DropdownActionPayin from "./DropdownActionPayIn";

const PayInOverview = () => {
  return (
    <>
      <Statistics items={PAY_IN_STATS.slice(0, 2)} />
      <Statistics items={PAY_IN_STATS.slice(2)} />
      <Toolbar>
        <ToolbarHeading>
          <ToolbarPageTitle text="Pay-In History" />
          <ToolbarDescription>View all Pay-In transactions</ToolbarDescription>
        </ToolbarHeading>
      </Toolbar>

      <Toolbar>
        <ToolbarHeading>
          <Select defaultValue={PAYMENT_METHODS[0].value}>
            <SelectTrigger className="bg-light-active rounded">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map(({ value, label }, index) => (
                <SelectItem key={index} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ToolbarHeading>
        <ToolbarActions>
          <Card className="bg-light-active rounded-lg">
            <CardContent className="text-gray-600 text-b-11-12-400 py-2 px-2.5">
              Selected Transactions: 0
            </CardContent>
          </Card>
          <DropdownActionPayin isInsideTable={false} />
        </ToolbarActions>
      </Toolbar>
    </>
  );
};

export default PayInOverview;

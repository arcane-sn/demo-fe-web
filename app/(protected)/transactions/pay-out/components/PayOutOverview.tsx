import { Card, CardContent } from "@/components/ui/card";
import { PAY_OUT_STATS, PAY_OUT_TRANSACTION_ACTIONS } from "../core/_consts";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DropdownActionPayout from "./DropdownActionPayout";

const PayOutOverview = () => {
  return (
    <>
      <Statistics items={PAY_OUT_STATS} />
      <Toolbar>
        <ToolbarHeading>
          <ToolbarPageTitle text="Pay-Out History" />
          <ToolbarDescription>View all Pay-Out transactions</ToolbarDescription>
        </ToolbarHeading>
        <ToolbarActions>
          <Card className="bg-light-active rounded-lg">
            <CardContent className="text-gray-600 text-xs py-2 px-2.5">
              <span className="text-slate-500">Selected Transactions:</span>{" "}
              <span className="text-slate-800">0</span>
            </CardContent>
          </Card>
          <DropdownActionPayout isInsideTable={false} />
        </ToolbarActions>
      </Toolbar>
    </>
  );
};

export default PayOutOverview;

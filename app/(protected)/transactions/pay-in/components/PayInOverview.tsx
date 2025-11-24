"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PAY_IN_STATS, PAYMENT_METHODS } from "../core/_consts";
import { usePayinStore } from "../hooks/usePayinStore";
import { Statistics } from "@/components/ui/statistics";
import { StatisticsCard } from "./StatisticsCard";
import ModalPayInSummaryDetail from "./modals/ModalPayInSummaryDetail";
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

const PayInOverview = memo(() => {
  const selectedCount = usePayinStore(
    (state) => state.selectedTransactions.length
  );
  const selectedPaymentMethod = usePayinStore(
    (state) => state.selectedPaymentMethod
  );
  const setSelectedPaymentMethod = usePayinStore(
    (state) => state.setSelectedPaymentMethod
  );
  const [isSummaryDetailOpen, setIsSummaryDetailOpen] = useState(false);

  const paymentMethodOptions = useMemo(() => PAYMENT_METHODS, []);

  const handlePaymentMethodChange = useCallback(
    (value: string) => {
      setSelectedPaymentMethod(value);
    },
    [setSelectedPaymentMethod]
  );

  const handleSeeDetail = useCallback(() => {
    setIsSummaryDetailOpen(true);
  }, []);

  const statsFirst = useMemo(() => PAY_IN_STATS.slice(0, 4), []);

  return (
    <>
      <StatisticsCard items={statsFirst} onSeeDetail={handleSeeDetail} />
      <div>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Pay-In History" />
            <ToolbarDescription>
              View all Pay-In transactions
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>

        <Toolbar>
          <ToolbarHeading>
            <Select
              value={selectedPaymentMethod}
              onValueChange={handlePaymentMethodChange}
            >
              <SelectTrigger className="bg-light-active rounded">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodOptions.map(({ value, label }, index) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ToolbarHeading>
          <ToolbarActions>
            <Card className="bg-light-active rounded-lg">
              <CardContent className="text-gray-600 text-b-11-12-400 py-2 px-2.5">
                Selected Transactions: {selectedCount}
              </CardContent>
            </Card>
            <DropdownActionPayin isInsideTable={false} />
          </ToolbarActions>
        </Toolbar>
      </div>

      {/* Pay-In Summary Detail Modal */}
      <ModalPayInSummaryDetail
        open={isSummaryDetailOpen}
        onOpenChange={setIsSummaryDetailOpen}
      />
    </>
  );
});

PayInOverview.displayName = "PayInOverview";

export default PayInOverview;

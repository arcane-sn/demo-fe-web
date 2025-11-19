import SummaryBalanceCard from "./summary-balance-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes, BoxesIcon, RefreshCcw } from "lucide-react";
import DetailModal from "@/components/shared/modals/detail-modal";
import { KeenIcon } from "@/components/keenicons";
import {
  PROVIDER_BALANCE_DETAIL_ITEMS,
  PROVIDER_BALANCE_SUMMARY,
  PROVIDER_OPTIONS,
} from "../core/constants";
import { useSettlementHistoryStore } from "../core/store/useSettlementHistoryStore";

const ProviderBalance = () => {
  const {
    isBalanceDetailOpen,
    openBalanceDetail,
    closeBalanceDetail,
    selectedProvider,
    setSelectedProvider,
  } = useSettlementHistoryStore();

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
            <Button variant="outline" onClick={openBalanceDetail}>
              Balance Detail
            </Button>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue
                  placeholder="[Provider Name]"
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                      <BoxesIcon className="size-4" />
                    </div>
                    <span className="text-grey-900">
                      {
                        PROVIDER_OPTIONS.find((option) => option.value === selectedProvider)
                          ?.label
                      }
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PROVIDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                        <BoxesIcon className="size-4" />
                      </div>
                      <span className="text-grey-900">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryBalanceCard
            icon={
              <span className="h-7 w-7 inline-flex items-center justify-center text-success">
                <KeenIcon icon="rocket" style="outline" className="text-4xl" />
              </span>
            }
            value={PROVIDER_BALANCE_SUMMARY.active}
            title="Active Balance"
          />
          <SummaryBalanceCard
            icon={
              <span className="h-7 w-7 inline-flex items-center justify-center text-orange-500">
                <KeenIcon icon="watch" style="outline" className="text-4xl" />
              </span>
            }
            value={PROVIDER_BALANCE_SUMMARY.pending}
            title="Pending Balance"
          />
        </div>
      </CardContent>
      <DetailModal
        open={isBalanceDetailOpen}
        onClose={closeBalanceDetail}
        title="Provider Balance Detail"
        items={PROVIDER_BALANCE_DETAIL_ITEMS}
        showInfoIcon={false}
      />
    </Card>
  );
};

export default ProviderBalance;

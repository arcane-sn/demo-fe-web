"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MOCK_PAY_OUT_DETAIL_TRANSACTION } from "../core/_consts";
import {
  getTransactionDetailsData,
  getStatusCallbackData,
  getTimestampsData,
} from "./core/_helpers";
import { usePayoutStore } from "../hooks/usePayoutStore";
import {
  TransactionHeader,
  TransferDetailCard,
  StatusCallbackCard,
  TimestampsCard,
  StatusHistoryCard,
  SenderInformationCard,
  TransactionDetailsCard,
  TransferInfoCard,
  MerchantInfoCard,
  BeneficiaryInformationCard,
} from "./components";
import ModalResendCallback from "../../components/ModalResendCallback";

export default function PayOutDetailPage() {
  const router = useRouter();
  const [transaction] = useState(MOCK_PAY_OUT_DETAIL_TRANSACTION);
  const { isModal, setModal } = usePayoutStore();

  const handleBack = () => {
    router.back();
  };

  const handleAction = () => {
    console.log("Action clicked");
  };

  const handleViewResponse = () => {
    console.log("View response clicked");
  };

  return (
    <>
      <Container className="pb-7 flex flex-col items-center gap-7">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <div className="flex-1 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="p-1.5 bg-white rounded-lg border border-zinc-200"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-900 leading-tight">
              Transaction Detail
            </h1>
          </div>
        </div>

        {/* Transaction Header */}
        <TransactionHeader transaction={transaction} onAction={handleAction} />

        {/* Two Column Layout */}
        <div className="w-full flex justify-center items-start gap-7">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-7">
            {/* Transaction Details Card */}
            <TransactionDetailsCard
              title="Transaction Details"
              items={getTransactionDetailsData(transaction)}
            />

            {/* Transfer Detail Card */}
            <TransferDetailCard transaction={transaction} />

            {/* Beneficiary Information Card */}
            <BeneficiaryInformationCard transaction={transaction} />

            {/* Sender Information Card */}
            <SenderInformationCard transaction={transaction} />
          </div>

          {/* Right Column */}
          <div className="w-96 flex flex-col gap-7">
            <StatusCallbackCard
              data={getStatusCallbackData(transaction)}
              onViewResponse={handleViewResponse}
            />
            <TransferInfoCard transaction={transaction} />
            <MerchantInfoCard transaction={transaction} />
            <TimestampsCard timestamps={getTimestampsData(transaction)} />
            <StatusHistoryCard statusHistory={transaction.statusHistory} />
          </div>
        </div>
      </Container>
      <ModalResendCallback
        open={isModal.responseVendor}
        onOpenChange={(open) => setModal("responseVendor", open)}
      />
    </>
  );
}

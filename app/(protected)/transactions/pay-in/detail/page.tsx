"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { KeenIcon } from "@/components/keenicons";
import { MOCK_TRANSACTION_DETAIL } from "./core/_consts";
import {
  getStatsData,
  getTransactionDetailsData,
  getPaymentInfoData,
  getCustomerInfoData,
  getMerchantInfoData,
  getPaymentSourceData,
  getBankDetailsData,
} from "./core/_helpers";

// Import individual components
import {
  InfoCard,
  TransactionHeader,
  StatusCallbackCard,
  TimestampsCard,
  StatusHistoryCard,
  PaymentDetailCard,
} from "./components";

export default function PayInDetailPage() {
  const router = useRouter();
  const [transaction] = useState(MOCK_TRANSACTION_DETAIL);

  const handleBack = () => {
    router.back();
  };

  const handleAction = () => {
    console.log("Action clicked");
  };

  const handleResendCallback = () => {
    console.log("Resend callback");
  };

  return (
    <Container className="pb-8 flex flex-col items-center gap-8">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex-1 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="p-2 bg-light rounded-lg border border-gray-300"
          >
            <KeenIcon icon="left" className="w-4 h-4 text-gray-600" />
          </Button>
          <h1 className="text-h-20-20-600 text-dark">Transaction Detail</h1>
        </div>
      </div>

      {/* Transaction Header */}
      <TransactionHeader transaction={transaction} onAction={handleAction} />

      {/* Two Column Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Transaction Details Card */}
          <InfoCard
            title="Transaction Details"
            items={getTransactionDetailsData(transaction)}
          />

          {/* Payment Detail Card */}
          <PaymentDetailCard transaction={transaction} />

          {/* Payment Info & Customer Info Grid */}
          <InfoCard
            title="Payment Info"
            items={getPaymentInfoData(transaction)}
          />
          <InfoCard
            title="Customer Info"
            items={getCustomerInfoData(transaction)}
          />

          {/* Merchant & Company and Payment Source Grid */}
          <InfoCard
            title="Merchant & Company"
            items={getMerchantInfoData(transaction)}
          />
          <InfoCard
            title="Payment Source"
            items={getPaymentSourceData(transaction)}
          />

          {/* Bank Details Card */}
          <InfoCard
            title="Bank Details"
            items={getBankDetailsData(transaction)}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <StatusCallbackCard
            transaction={transaction}
            onResendCallback={handleResendCallback}
          />
          <TimestampsCard transaction={transaction} />
          <StatusHistoryCard statusHistory={transaction.statusHistory} />
        </div>
      </div>
      {/* <ModalResponseCode
        isOpen={true}
        onClose={() => {}}
        responseData={{
          responseCode: 200,
          responseMessage: "Transaction details retrieved successfully",
          data: {
            transactionId: "TRX123123123123-1222",
            merchantId: "UP2025091900001",
            status: "Success",
            amount: 150000,
            paymentMethod: "e-Wallet",
            paymentChannel: "DANA",
            customerName: "John Doe",
            customerEmail: "john.doe@email.com",
            createdAt: "2023-12-16T16:12:32Z",
            updatedAt: "2023-12-16T16:13:00Z",
          },
        }}
        title="API Response"
      /> */}
      {/* <ModalPaymentReceipt
        isOpen={true}
        onClose={() => {}}
        receiptData={DEFAULT_PAYMENT_RECEIPT_DATA}
        title="Payment Receipt"
      /> */}
    </Container>
  );
}

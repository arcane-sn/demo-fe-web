"use client";

import { useState, use } from "react";
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
  getPaymentDetailData,
  getStatusCallbackData,
  getTimestampsData,
} from "./core/_helpers";
import { usePayinStore } from "../hooks/usePayinStore";
import {
  ModalRefundRequest,
  ModalVoidTransaction,
  ModalChargebackRequest,
  ModalCancelTransaction,
} from "../components";
import { ModalSubmit } from "@/components/shared/modals";
import ModalResendCallback from "../../components/ModalResendCallback";
import ModalUpdateStatus from "../../components/ModalUpdateStatus";
import { ModalPaymentReceipt, ModalResponseCode } from "./components/modal";
import { DEFAULT_PAYMENT_RECEIPT_DATA, DEFAULT_RESPONSE_DATA } from "./core/_consts";
import {
  InfoCard,
  TransactionHeader,
  StatusCallbackCard,
  TimestampsCard,
  StatusHistoryCard,
} from "./components";

interface PayInDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PayInDetailPage({ params }: PayInDetailPageProps) {
  const router = useRouter();
  const [transaction] = useState(MOCK_TRANSACTION_DETAIL);
  const { isModal, setModal } = usePayinStore();
  const [isPaymentReceiptOpen, setIsPaymentReceiptOpen] = useState(false);
  const [isResponseCodeOpen, setIsResponseCodeOpen] = useState(false);
  const [isSubmittedOpen, setIsSubmittedOpen] = useState(false);
  const { id: transactionId } = use(params);

  const handleBack = () => {
    router.back();
  };

  const handleResendCallback = () => {
    console.log("Resend callback");
  };

  const handleViewPaymentReceipt = () => {
    setIsPaymentReceiptOpen(true);
  };

  const handleViewResponse = () => {
    setIsResponseCodeOpen(true);
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
      <TransactionHeader transaction={transaction} />

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
          <InfoCard
            title="Payment Detail"
            items={getPaymentDetailData(transaction)}
          />

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
            data={getStatusCallbackData(transaction)}
            onResendCallback={handleResendCallback}
            onViewPaymentReceipt={handleViewPaymentReceipt}
            onViewResponse={handleViewResponse}
          />
          <TimestampsCard timestamps={getTimestampsData(transaction)} />
          <StatusHistoryCard statusHistory={transaction.statusHistory} />
        </div>
      </div>
      
      {/* Modal Components */}
      <ModalResendCallback
        open={isModal.resendCallback}
        onOpenChange={(open: boolean) => setModal("resendCallback", open)}
      />
      <ModalUpdateStatus
        open={isModal.forceUpdateStatus}
        onOpenChange={(open: boolean) => setModal("forceUpdateStatus", open)}
        onSubmit={() => {}}
      />
      <ModalRefundRequest
        open={isModal.refundRequest}
        onOpenChange={(open: boolean) => setModal("refundRequest", open)}
        onSubmit={() => setIsSubmittedOpen(true)}
      />
      <ModalSubmit
        open={isSubmittedOpen}
        onOpenChange={setIsSubmittedOpen}
        title="Success"
        imageSrc="/media/illustrations/28.svg"
        message="Refund Request Submitted"
        description="Your submission will now be reviewed by our team."
      />
      <ModalChargebackRequest
        open={isModal.chargebackRequest}
        onOpenChange={(open: boolean) => setModal("chargebackRequest", open)}
      />
      <ModalVoidTransaction
        open={isModal.voidTransaction}
        onOpenChange={(open: boolean) => setModal("voidTransaction", open)}
        onVoid={() => {}}
      />
      <ModalCancelTransaction
        open={isModal.cancelTransaction}
        onOpenChange={(open: boolean) => setModal("cancelTransaction", open)}
        onCancel={() => {}}
      />
      
      {/* Payment Receipt Modal */}
      <ModalPaymentReceipt
        isOpen={isPaymentReceiptOpen}
        onClose={() => setIsPaymentReceiptOpen(false)}
        receiptData={DEFAULT_PAYMENT_RECEIPT_DATA}
        title="Payment Receipt"
      />
      
      {/* Response Code Modal */}
      <ModalResponseCode
        isOpen={isResponseCodeOpen}
        onClose={() => setIsResponseCodeOpen(false)}
        responseData={DEFAULT_RESPONSE_DATA as unknown as Record<string, unknown>}
        title="API Response"
      />
    </Container>
  );
}

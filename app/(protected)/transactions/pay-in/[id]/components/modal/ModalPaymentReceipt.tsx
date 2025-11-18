import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Printer } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { HexagonBadge } from "@/app/components/partials/common/hexagon-badge";
import { ModalPaymentReceiptProps } from "../../core/_models";
import {
  DEFAULT_PAYMENT_RECEIPT_DATA,
  PAYMENT_RECEIPT_MODAL_CONFIG,
} from "../../core/_consts";
import {
  getPaymentReceiptTransactionDetails,
  getPaymentReceiptMerchantDetails,
} from "../../core/_helpers";
import { InfoCard } from "../../../../components/detail";

const ModalPaymentReceipt: React.FC<ModalPaymentReceiptProps> = ({
  isOpen,
  onClose,
  receiptData,
  title = PAYMENT_RECEIPT_MODAL_CONFIG.defaultTitle,
}) => {
  const data = receiptData || DEFAULT_PAYMENT_RECEIPT_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${PAYMENT_RECEIPT_MODAL_CONFIG.maxWidth} ${PAYMENT_RECEIPT_MODAL_CONFIG.maxHeight} overflow-y-auto`}
        close={false}
      >
        {/* Header */}
        {/* <div className=" border-b border-gray-100"> */}
        <DialogTitle className="flex items-center justify-between text-sm font-semibold text-slate-900 ">
          {title}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 p-1.5"
          >
            <X className="size-4" />
          </Button>
        </DialogTitle>
        {/* </div> */}

        {/* Content */}
        <DialogBody className="py-5 flex flex-col justify-center items-center gap-5">
          {/* Success Message Section */}
          <div className="px-7 py-5 flex flex-col justify-center items-center gap-2.5">
            <div className="flex flex-col justify-center items-center gap-1.5">
              <HexagonBadge
                size="size-[50px]"
                stroke="stroke-green-200"
                fill="fill-green-50"
                badge={
                  <KeenIcon
                    icon="check-circle"
                    style="filled"
                    className="text-green-500 text-2xl leading-none"
                  />
                }
              />
              <div className="inline-flex justify-center items-center gap-1.5">
                <div className="text-center justify-start text-slate-900 text-xl font-semibold">
                  {data.successMessage}
                </div>
              </div>
              <div className="text-center justify-start text-slate-600 text-xs ">
                {data.transactionDate}
              </div>
            </div>
          </div>

          {/* Transaction Details Card */}
          <InfoCard
            title="Transaction Details"
            items={getPaymentReceiptTransactionDetails(data)}
          />

          {/* Merchant Details Card */}
          <InfoCard
            title="Merchant Detail"
            items={getPaymentReceiptMerchantDetails(data)}
          />
        </DialogBody>
        <DialogFooter className="w-full flex sm:justify-between justify-between items-center">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrint}
            className="px-3 py-2.5 bg-blue-50 border-blue-500/20 text-blue-500 text-xs font-medium"
          >
            <Printer className="size-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="px-4 py-3 bg-white border-zinc-200 text-slate-600 text-xs font-medium"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPaymentReceipt;

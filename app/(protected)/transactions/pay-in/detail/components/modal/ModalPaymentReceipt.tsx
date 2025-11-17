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
import { ModalPaymentReceiptProps } from "../../core/_models";
import {
  DEFAULT_PAYMENT_RECEIPT_DATA,
  PAYMENT_RECEIPT_MODAL_CONFIG,
} from "../../core/_consts";
import {
  getTransactionDetailRows,
  getMerchantDetailRows,
} from "../../core/_helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DetailRow from "../DetailRow";

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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-slate-900 text-base font-semibold">
                Transaction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-7 flex flex-col justify-start items-start gap-4">
              {getTransactionDetailRows(data).map((row, index) => (
                <DetailRow
                  key={index}
                  label={row.label}
                  value={row.value}
                  showCopy={row.showCopy}
                  isWebsite={row.isWebsite}
                  isMultiline={row.isMultiline}
                />
              ))}
            </CardContent>
          </Card>

          {/* Merchant Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 text-base font-semibold">
                Merchant Detail
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-7 flex flex-col justify-start items-start gap-4">
              {getMerchantDetailRows(data).map((row, index) => (
                <DetailRow
                  key={index}
                  label={row.label}
                  value={row.value}
                  showCopy={row.showCopy}
                  isWebsite={row.isWebsite}
                  isMultiline={row.isMultiline}
                />
              ))}
            </CardContent>
          </Card>
        </DialogBody>
        <DialogFooter className="w-full flex justify-between items-center">
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

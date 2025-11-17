import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ModalPaymentReceipt from "./ModalPaymentReceipt";
import { DEFAULT_PAYMENT_RECEIPT_DATA } from "../../core/_consts";

// Example usage of ModalPaymentReceipt component
const ModalPaymentReceiptExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example receipt data - using default data
  const exampleReceiptData = {
    ...DEFAULT_PAYMENT_RECEIPT_DATA,
    // You can override specific fields here if needed
    // successMessage: "Custom Success Message!",
    // transactionDetails: {
    //   ...DEFAULT_PAYMENT_RECEIPT_DATA.transactionDetails,
    //   transactionAmount: "IDR 25.000.000"
    // }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Modal Payment Receipt Example
      </h2>

      <div className="space-y-4">
        <Button onClick={() => setIsModalOpen(true)}>
          Open Payment Receipt Modal
        </Button>

        <ModalPaymentReceipt
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          receiptData={exampleReceiptData}
          title="Payment Receipt"
        />
      </div>
    </div>
  );
};

export default ModalPaymentReceiptExample;

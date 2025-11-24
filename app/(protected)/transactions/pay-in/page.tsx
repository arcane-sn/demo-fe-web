"use client";
import { useState } from "react";
import { Toolbar, ToolbarHeading } from "@/layouts/demo1/components/toolbar";
import { Container } from "@/components/common/container";
import {
  PayInContent,
  ModalRefundRequest,
  ModalVoidTransaction,
  ModalChargebackRequest,
  ModalCancelTransaction,
} from "./components";
import { ModalSubmit } from "@/components/shared/modals";
import ModalResendCallback from "../components/ModalResendCallback";
import { usePayinStore } from "./hooks/usePayinStore";
import ModalUpdateStatus from "../components/ModalUpdateStatus";
import { toast } from "sonner";

export default function PayInPage() {
  const { isModal, setModal, selectedTransactions } = usePayinStore();
  const [isSubmittedOpen, setIsSubmittedOpen] = useState(false);
  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Pay-In Summary" />
        </Toolbar>
      </Container>
      <Container>
        <PayInContent />
      </Container>
      <ModalResendCallback
        open={isModal.resendCallback}
        onOpenChange={(open) => setModal("resendCallback", open)}
      />
      <ModalUpdateStatus
        open={isModal.forceUpdateStatus}
        onOpenChange={(open) => setModal("forceUpdateStatus", open)}
        onSubmit={(status) => {
          if (selectedTransactions.length === 0) {
            toast.error("Please select at least one transaction");
            return;
          }

          // TODO: Implement API call to update transaction status
          console.log(
            "Updating status for transactions:",
            selectedTransactions
          );
          console.log("New status:", status);

          // Show success message
          toast.success(
            `Status updated to ${status} for ${selectedTransactions.length} transaction(s)`
          );

          // Close modal
          setModal("forceUpdateStatus", false);
        }}
      />
      <ModalRefundRequest
        open={isModal.refundRequest}
        onOpenChange={(open) => setModal("refundRequest", open)}
        onSubmit={() => setIsSubmittedOpen(true)}
      />
      <ModalSubmit
        open={isSubmittedOpen}
        onOpenChange={setIsSubmittedOpen}
        title="Submitted"
        imageSrc="/media/illustrations/28.svg"
        message="Refund Request Submitted"
        description="Your submission will now be reviewed by our team."
      />
      <ModalChargebackRequest
        open={isModal.chargebackRequest}
        onOpenChange={(open) => setModal("chargebackRequest", open)}
      />
      <ModalVoidTransaction
        open={isModal.voidTransaction}
        onOpenChange={(open) => setModal("voidTransaction", open)}
        onVoid={() => {}}
      />
      <ModalCancelTransaction
        open={isModal.cancelTransaction}
        onOpenChange={(open) => setModal("cancelTransaction", open)}
        onCancel={() => {}}
      />
    </>
  );
}

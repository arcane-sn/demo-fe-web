"use client";
import { useState } from "react";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "@/layouts/demo1/components/toolbar";
import { Container } from "@/components/common/container";
import { PayOutContent } from "./components";
import { usePayoutStore } from "./hooks/usePayoutStore";
import ModalResendCallback from "../components/ModalResendCallback";
import ModalUpdateStatus from "../components/ModalUpdateStatus";
import { ModalSubmit } from "@/components/shared/modals";
import { toast } from "sonner";

export default function PayOutPage() {
  const { isModal, setModal, selectedTransactions } = usePayoutStore();
  const [isSubmittedOpen, setIsSubmittedOpen] = useState(false);

  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Pay-Out Summary" />
          <ToolbarActions>
            {/* Add any toolbar actions here if needed */}
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <PayOutContent />
      </Container>
      <ModalResendCallback
        open={isModal.responseVendor}
        onOpenChange={(open) => setModal("responseVendor", open)}
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

          // Close modal and show submitted modal
          setModal("forceUpdateStatus", false);
          setIsSubmittedOpen(true);
        }}
      />
      <ModalSubmit
        open={isSubmittedOpen}
        onOpenChange={setIsSubmittedOpen}
        title="Status Updated"
        imageSrc="/media/illustrations/28.svg"
        message="Transaction Status Updated"
        description="The transaction status has been successfully updated."
      />
    </>
  );
}

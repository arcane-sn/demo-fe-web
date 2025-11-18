"use client";
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

export default function PayOutPage() {
  const { isModal, setModal } = usePayoutStore();

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
        onSubmit={() => {}}
      />
    </>
  );
}

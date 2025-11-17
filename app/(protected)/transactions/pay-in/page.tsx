"use client";
import { Toolbar, ToolbarHeading } from "@/layouts/demo1/components/toolbar";
import { Container } from "@/components/common/container";
import { PayInContent } from "./components";
import ModalResendCallback from "../components/ModalResendCallback";
import { usePayinStore } from "./hooks/usePayinStore";
import ModalUpdateStatus from "../components/ModalUpdateStatus";

export default function PayInPage() {
  const { isModal, setModal } = usePayinStore();
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
        onSubmit={() => {}}
      />
    </>
  );
}

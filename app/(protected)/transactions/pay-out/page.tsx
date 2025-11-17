"use client";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "@/layouts/demo1/components/toolbar";
import { Container } from "@/components/common/container";
import { PayOutContent } from "./components";
import ModalFilterPayout from "./components/modals/modal-filter-pay-out/ModalFilterPayout";
import { ModalExportPayout } from "./components/modals/modal-export-pay-out";
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
      <ModalFilterPayout
        open={isModal.filter}
        onOpenChange={(open) => setModal("filter", open)}
      />
      <ModalExportPayout
        open={isModal.export}
        onOpenChange={(open) => setModal("export", open)}
      />
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

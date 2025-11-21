import { Container } from "@/components/common/container";
import { Fragment } from "react";
import MerchantCallbackLogsContent from "./components/merchant-callback-logs.content";

export default function MerchantCallbackLogsPage() {
  return (
    <Fragment>
      <Container>
        <MerchantCallbackLogsContent />
      </Container>
    </Fragment>
  );
}

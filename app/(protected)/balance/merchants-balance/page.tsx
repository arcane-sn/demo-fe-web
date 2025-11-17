import { Fragment } from "react";
import { Container } from "@/components/common/container";
import { MerchantBalanceContent } from "./components/balance-content";

export default function MerchantsBalancePage() {
  return (
    <Fragment>
      <Container>
        <MerchantBalanceContent />
      </Container>
    </Fragment>
  );
}

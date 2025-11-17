import { Fragment } from "react";
import { Container } from "@/components/common/container";
import BalanceRequestContent from "./components/balance-content";

export default function BalanceRequestPage() {
  return (
    <Fragment>
      <Container>
         <BalanceRequestContent />
      </Container>
    </Fragment>
  );
}

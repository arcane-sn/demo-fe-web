import { Fragment } from "react";
import { Container } from "@/components/common/container";
import BalanceStatementContent from "./components/balance-content";

export default function BalanceStatementPage() {
  return (
    <Fragment>
      <Container>
        <BalanceStatementContent />
      </Container>
    </Fragment>
  );
}

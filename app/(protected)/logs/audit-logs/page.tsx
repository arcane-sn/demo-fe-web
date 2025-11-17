import { Container } from "@/components/common/container";
import { Fragment } from "react";
import AuditLogsContent from "./components/audit-logs.content";

export default function AuditLogsPage() {
  return (
    <Fragment>
      <Container>
        <AuditLogsContent />
      </Container>
    </Fragment>
  );
}

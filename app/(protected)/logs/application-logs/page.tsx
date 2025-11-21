import { Container } from "@/components/common/container";
import { Fragment } from "react";
import ApplicationLogsContent from "./components/application-logs.content";

export default function ApplicationLogsPage() {
  return (
    <Fragment>
      <Container>
        <ApplicationLogsContent />
      </Container>
    </Fragment>
  );
}

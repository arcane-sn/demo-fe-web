import { Container } from "@/components/common/container";
import { Fragment } from "react";
import UserManagementContent from "./components/user-management.content";

export default function TeamUserManagementPage() {
  return (
    <Fragment>
      <Container>
        <UserManagementContent />
      </Container>
    </Fragment>
  );
}

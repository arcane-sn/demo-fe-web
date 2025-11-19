import { Fragment } from "react";
import {
  Toolbar,
  ToolbarHeading,
  ToolbarActions,
} from "@/layouts/demo1/components/toolbar";
import { Container } from "@/components/common/container";
import { AccountInquiryContent } from "./components/account-inquiry-content";

export default function AccountInquiryPage() {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Account Inquiry Statement"
            description="View all account inquiry activities"
          />
          <ToolbarActions>{/* reserved for future actions */}</ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <AccountInquiryContent />
      </Container>
    </Fragment>
  );
}

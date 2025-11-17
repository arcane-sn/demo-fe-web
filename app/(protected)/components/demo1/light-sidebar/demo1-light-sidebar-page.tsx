import { Fragment } from "react";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "@/layouts/demo1/components/toolbar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Demo1LightSidebarContent } from "./";

export function Demo1LightSidebarPage() {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Hi, [Username]"
            description="Welcome to [Merchant Name] Internal Dashboard"
          />
          <ToolbarActions>
            <Button variant="outline">View Profile</Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>
  );
}

import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { DashboardContent } from './components';

export default function DashboardsPage() {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Dashboards"
            description="Overview of your system performance and key metrics"
          />
          <ToolbarActions>
            {/* Add any toolbar actions here if needed */}
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <DashboardContent />
      </Container>
    </Fragment>
  );
}

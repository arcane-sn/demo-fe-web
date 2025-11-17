import { Container } from '@/components/common/container';
import { SchedulerContent } from './components/scheduler-content';
import { Fragment } from 'react';
import { Toolbar, ToolbarHeading } from '@/layouts/demo1/components/toolbar';

/**
 * Server Component Page
 * Wrapper for Scheduler page - all interactive logic is in Client Component
 */
export default async function SchedulerPage() {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Disbursement"
            description="Send funds to recipients quickly and securely"
          />
        </Toolbar>
      </Container>
      <Container>
        <SchedulerContent />
      </Container>
    </Fragment>
  );
}

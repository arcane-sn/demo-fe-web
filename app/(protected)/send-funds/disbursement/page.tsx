import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { DisbursementContent } from './components';

export default function DisbursementPage() {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Disbursement"
            description="Send funds to recipients quickly and securely"
          />
          <ToolbarActions>
            {/* Add any toolbar actions here if needed */}
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <DisbursementContent />
      </Container>
    </Fragment>
  );
}

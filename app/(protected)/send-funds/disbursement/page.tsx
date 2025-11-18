import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { DisbursementContent } from './components/layout/disbursement-content';

export default function DisbursementPage() {
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
        <DisbursementContent />
      </Container>
    </Fragment>
  );
}

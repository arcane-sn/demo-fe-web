import { CreateMerchantContent } from './components/create-merchant-content';
import { Fragment } from 'react';
import { Toolbar, ToolbarHeading } from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';

export default function CreateMerchantPage() {
  return (
  <Fragment>
    <Container>
      <Toolbar>
        <ToolbarHeading title="Create Merchant" />
      </Toolbar>
    </Container>
    <CreateMerchantContent />
  </Fragment>
  );
}
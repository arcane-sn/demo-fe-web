import { DisbursementContent } from '../../../../components/detail/services-pricing/disbursement/disbursement-content';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function MerchantReviewDisbursementPage() {
  return (
    <TabErrorBoundary>
      <DisbursementContent />
    </TabErrorBoundary>
  );
}


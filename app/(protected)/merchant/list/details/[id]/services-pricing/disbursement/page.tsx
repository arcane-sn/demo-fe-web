import { DisbursementContent } from '../../../../../components/detail/services-pricing/disbursement/disbursement-content';
import { TabErrorBoundary } from '../../../../../components/shared/error-boundary';

export default function DisbursementPage() {
  return (
    <TabErrorBoundary>
      <DisbursementContent />
    </TabErrorBoundary>
  );
}

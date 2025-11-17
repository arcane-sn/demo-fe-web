import { DisbursementContent } from './disbursement-content';
import { TabErrorBoundary } from '../../components/shared/error-boundary';

export default function DisbursementPage() {
  return (
    <TabErrorBoundary>
      <DisbursementContent />
    </TabErrorBoundary>
  );
}

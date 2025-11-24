import { OthersTab } from '../../../components/detail/others/others-tab';
import { TabErrorBoundary } from '../../../components/shared/error-boundary';

export default function MerchantReviewOthersPage() {
  return (
    <TabErrorBoundary>
      <OthersTab />
    </TabErrorBoundary>
  );
}


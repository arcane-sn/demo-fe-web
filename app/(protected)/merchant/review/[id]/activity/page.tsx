import { ActivityTab } from '../../../components/detail/activity/components/activity-tab';
import { TabErrorBoundary } from '../../../components/shared/error-boundary';

export default function MerchantReviewActivityPage() {
  return (
    <TabErrorBoundary>
      <ActivityTab />
    </TabErrorBoundary>
  );
}


import { ActivityTab } from '../../../../components/detail/activity/components/activity-tab';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function ActivityPage() {
  return (
    <TabErrorBoundary>
      <ActivityTab />
    </TabErrorBoundary>
  );
}

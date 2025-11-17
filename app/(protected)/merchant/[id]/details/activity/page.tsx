import { ActivityTab } from './components/activity-tab';
import { TabErrorBoundary } from '../components/shared/error-boundary';

export default function ActivityPage() {
  return (
    <TabErrorBoundary>
      <ActivityTab />
    </TabErrorBoundary>
  );
}

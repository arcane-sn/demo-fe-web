import { OthersTab } from './components/others-tab';
import { TabErrorBoundary } from '../components/shared/error-boundary';

export default function OthersPage() {
  return (
    <TabErrorBoundary>
      <OthersTab />
    </TabErrorBoundary>
  );
}

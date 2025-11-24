import { OthersTab } from '../../../../components/detail/others/others-tab';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function OthersPage() {
  return (
    <TabErrorBoundary>
      <OthersTab />
    </TabErrorBoundary>
  );
}

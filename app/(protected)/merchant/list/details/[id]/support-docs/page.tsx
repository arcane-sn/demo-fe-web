import { SupportDocsTab } from '../../../../components/shared/tab-contents';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function SupportDocsPage() {
  return (
    <TabErrorBoundary>
      <SupportDocsTab />
    </TabErrorBoundary>
  );
}

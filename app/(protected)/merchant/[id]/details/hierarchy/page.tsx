import { HierarchyTab } from './components/hierarchy-tab';
import { TabErrorBoundary } from '../components/shared/error-boundary';

export default function HierarchyPage() {
  return (
    <TabErrorBoundary>
      <HierarchyTab />
    </TabErrorBoundary>
  );
}

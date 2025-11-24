import { HierarchyTab } from '../../../components/detail/hierarchy/hierarchy-tab';
import { TabErrorBoundary } from '../../../components/shared/error-boundary';

export default function MerchantReviewHierarchyPage() {
  return (
    <TabErrorBoundary>
      <HierarchyTab />
    </TabErrorBoundary>
  );
}


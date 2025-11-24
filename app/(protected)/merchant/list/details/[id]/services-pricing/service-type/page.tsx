import { ServiceTypeContent } from '../../../../../components/detail/services-pricing/service-type/service-type-content';
import { TabErrorBoundary } from '../../../../../components/shared/error-boundary';

export default function ServiceTypePage() {
  return (
    <TabErrorBoundary>
      <ServiceTypeContent />
    </TabErrorBoundary>
  );
}

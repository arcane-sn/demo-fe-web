import { ServiceTypeContent } from './service-type-content';
import { TabErrorBoundary } from '../../components/shared/error-boundary';

export default function ServiceTypePage() {
  return (
    <TabErrorBoundary>
      <ServiceTypeContent />
    </TabErrorBoundary>
  );
}

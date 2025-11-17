import { PaymentGatewayContent } from './payment-gateway-content';
import { TabErrorBoundary } from '../../components/shared/error-boundary';

export default function PaymentGatewayPage() {
  return (
    <TabErrorBoundary>
      <PaymentGatewayContent />
    </TabErrorBoundary>
  );
}

import { PaymentGatewayContent } from '../../../../components/detail/services-pricing/payment-gateway/payment-gateway-content';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function MerchantReviewPaymentGatewayPage() {
  return (
    <TabErrorBoundary>
      <PaymentGatewayContent />
    </TabErrorBoundary>
  );
}


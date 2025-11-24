import { GeneralInfoTab } from '../../../components/detail/general-info/general-info-tab';
import { TabErrorBoundary } from '../../../components/shared/error-boundary';

export default function MerchantReviewGeneralInfoPage() {
  return (
    <TabErrorBoundary>
      <GeneralInfoTab />
    </TabErrorBoundary>
  );
}


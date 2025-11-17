import { GeneralInfoTab } from './components/general-info-tab';
import { TabErrorBoundary } from '../components/shared/error-boundary';

export default function GeneralInfoPage() {
  return (
    <TabErrorBoundary>
      <GeneralInfoTab />
    </TabErrorBoundary>
  );
}

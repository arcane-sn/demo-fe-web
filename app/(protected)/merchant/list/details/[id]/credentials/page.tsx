import { CredentialsTab } from '../../../../components/detail/credentials/credentials-tab';
import { TabErrorBoundary } from '../../../../components/shared/error-boundary';

export default function CredentialsPage() {
  return (
    <TabErrorBoundary>
      <CredentialsTab />
    </TabErrorBoundary>
  );
}

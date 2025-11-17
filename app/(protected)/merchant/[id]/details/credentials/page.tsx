import { CredentialsTab } from './components/credentials-tab';
import { TabErrorBoundary } from '../components/shared/error-boundary';

export default function CredentialsPage() {
  return (
    <TabErrorBoundary>
      <CredentialsTab />
    </TabErrorBoundary>
  );
}

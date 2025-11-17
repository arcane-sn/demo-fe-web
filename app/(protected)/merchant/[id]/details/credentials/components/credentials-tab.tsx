'use client';

import { CredentialsCard } from './credentials-card';
import { IPWhitelistCard } from './ip-whitelist-card';
import { CallbackURLCard } from './callback-url-card';
import { SidebarNavigation } from '../../../../components/shared/sidebar-navigation';
import { CredentialsData } from './types';
import { MockDataService } from '../../../../core/data/mock-data';
import { useTabData } from '../../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

interface CredentialsTabProps {
  data?: CredentialsData;
}

export function CredentialsTab({ data }: CredentialsTabProps) {
  const { data: credentialsData, loading } = useTabData(
    data,
    MockDataService.getCredentialsData
  );

  if (loading) {
    return <LoadingSpinner message="Loading credentials data..." />;
  }
  const sections = [
    { id: 'credentials', title: 'Credentials' },
    { id: 'ip-whitelist', title: 'IP Whitelist' },
    { id: 'callback-url', title: 'Callback URL' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <SidebarNavigation sections={sections} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Credentials Section */}
        <CredentialsCard data={credentialsData?.credentials || { credentialId: '', clientSecret: '', publicKey: '', status: 'active' }} />
        
        {/* IP Whitelist Section */}
        <IPWhitelistCard data={credentialsData?.ipWhitelist || []} />
        
        {/* Callback URL Section */}
        <CallbackURLCard data={credentialsData?.callbackUrls || []} />
      </div>
    </div>
  );
}

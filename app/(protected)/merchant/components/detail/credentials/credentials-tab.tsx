'use client';

import { CredentialsCard } from './credentials-card';
import { IPWhitelistCard } from './ip-whitelist-card';
import { CallbackURLCard } from './callback-url-card';
import { ScrollspyMenu } from '@/app/components/partials/navbar/scrollspy-menu';
import { Scrollspy } from '@/components/ui/scrollspy';
import { CredentialsData } from './types';
import { MockDataService } from '../../../core/data/mock-data';
import { useTabData } from '../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../shared/loading-spinner';

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

  const scrollspyItems = [
    { title: 'Credentials', target: 'credentials' },
    { title: 'IP Whitelist', target: 'ip-whitelist' },
    { title: 'Callback URL', target: 'callback-url' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Scrollspy Menu */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Scrollspy
            targetRef={{ current: document }}
            offset={100}
            smooth={true}
            dataAttribute="scrollspy"
          >
            <ScrollspyMenu items={scrollspyItems} />
          </Scrollspy>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Credentials Section */}
        <div data-scrollspy-anchor="credentials">
        <CredentialsCard data={credentialsData?.credentials || { credentialId: '', clientSecret: '', publicKey: '', status: 'active' }} />
        </div>
        
        {/* IP Whitelist Section */}
        <div data-scrollspy-anchor="ip-whitelist">
        <IPWhitelistCard data={credentialsData?.ipWhitelist || []} />
        </div>
        
        {/* Callback URL Section */}
        <div data-scrollspy-anchor="callback-url">
        <CallbackURLCard data={credentialsData?.callbackUrls || []} />
        </div>
      </div>
    </div>
  );
}

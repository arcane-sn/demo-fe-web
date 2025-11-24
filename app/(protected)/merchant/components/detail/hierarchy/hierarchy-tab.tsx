'use client';

import { MerchantLevelInfoCard } from './merchant-level-info-card';
import { MerchantHierarchyTree } from './merchant-hierarchy-tree';
import { ScrollspyMenu } from '@/app/components/partials/navbar/scrollspy-menu';
import { Scrollspy } from '@/components/ui/scrollspy';
import { HierarchyData } from './types';
import { MockDataService } from '../../../core/data/mock-data';
import { useTabData } from '../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../shared/loading-spinner';

interface HierarchyTabProps {
  data?: HierarchyData;
}

export function HierarchyTab({ data }: HierarchyTabProps) {
  const { data: hierarchyData, loading } = useTabData(
    data,
    MockDataService.getHierarchyData
  );

  if (loading) {
    return <LoadingSpinner message="Loading hierarchy data..." />;
  }

  const scrollspyItems = [
    { title: 'Merchant Level', target: 'merchant-level-info' },
    { title: 'Merchant Hierarchy', target: 'merchant-hierarchy' }
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
        {/* Merchant Level Info Section */}
        <div data-scrollspy-anchor="merchant-level-info">
        <MerchantLevelInfoCard data={hierarchyData?.merchantLevelInfo || { merchantLevel: '', parentMerchantId: '', parentMerchant: '', parentMerchantLevel: '' }} />
        </div>
        
        {/* Merchant Hierarchy Section */}
        <div data-scrollspy-anchor="merchant-hierarchy">
        <MerchantHierarchyTree hierarchy={hierarchyData?.hierarchy || []} />
        </div>
      </div>
    </div>
  );
}

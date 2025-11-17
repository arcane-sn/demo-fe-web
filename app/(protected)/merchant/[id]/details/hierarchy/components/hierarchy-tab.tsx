'use client';

import { MerchantLevelInfoCard } from './merchant-level-info-card';
import { MerchantHierarchyTree } from './merchant-hierarchy-tree';
import { SidebarNavigation } from '../../../../components/shared/sidebar-navigation';
import { HierarchyData } from './types';
import { MockDataService } from '../../../../core/data/mock-data';
import { useTabData } from '../../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

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
  const sections = [
    { id: 'merchant-level-info', title: 'Merchant Level' },
    { id: 'merchant-hierarchy', title: 'Merchant Hierarchy' }
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
        {/* Merchant Level Info Section */}
        <MerchantLevelInfoCard data={hierarchyData?.merchantLevelInfo || { merchantLevel: '', parentMerchantId: '', parentMerchant: '', parentMerchantLevel: '' }} />
        
        {/* Merchant Hierarchy Section */}
        <MerchantHierarchyTree hierarchy={hierarchyData?.hierarchy || []} />
      </div>
    </div>
  );
}

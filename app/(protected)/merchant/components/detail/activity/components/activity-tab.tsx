'use client';

import { ActivityTable } from './table/activity-table';
import { ActivityData } from './types';
import { MockDataService } from '../../../../core/data/mock-data';
import { useTabData } from '../../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../../shared/loading-spinner';

interface ActivityTabProps {
  data?: ActivityData;
  loading?: boolean;
  error?: string;
}

export function ActivityTab({ data, loading = false, error }: ActivityTabProps) {
  const { data: activityData, loading: isLoading } = useTabData(
    data,
    MockDataService.getActivityData
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading activity data..." />;
  }
  
  const logs = activityData?.logs || data?.logs || [];
  
  return (
    <div className="space-y-6">
      <ActivityTable 
        data={logs} 
        loading={isLoading || loading} 
        error={error}
      />
    </div>
  );
}

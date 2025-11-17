'use client';

import { ActivityTable } from './activity-table';
import { ActivityData } from './types';
import { MockDataService } from '../../../../core/data/mock-data';
import { useTabData } from '../../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

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
  return (
    <div className="space-y-6">
      <ActivityTable 
        data={activityData || data || { logs: [], totalCount: 0, currentPage: 1, pageSize: 10 }} 
        loading={isLoading || loading} 
        error={error}
      />
    </div>
  );
}

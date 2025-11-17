'use client';

import { BrandingCard } from './branding-card';
import { AdditionalNotesCard } from './additional-notes-card';
import { SidebarNavigation } from '../../../../components/shared/sidebar-navigation';
import { OthersData } from './types';
import { MockDataService } from '../../../../core/data/mock-data';
import { useTabData } from '../../core/hooks/use-tab-data';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

interface OthersTabProps {
  data?: OthersData;
  loading?: boolean;
  error?: string;
}

export function OthersTab({ data, loading = false, error }: OthersTabProps) {
  const { data: othersData, loading: isLoading } = useTabData(
    data,
    MockDataService.getOthersData
  );
  const sections = [
    { id: 'branding', title: 'Branding' },
    { id: 'additional-notes', title: 'Additional Notes' }
  ];

  const handleEditBranding = () => {
    // TODO: Implement edit branding functionality
  };

  const handleEditNotes = () => {
    // TODO: Implement edit notes functionality
  };

  const handlePreviewBranding = () => {
    // TODO: Implement preview branding functionality
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading others data..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

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
        {/* Branding Section */}
        <BrandingCard 
          data={othersData?.branding || { companyLogo: undefined, brandColors: { primary: '', secondary: '', accent: '', background: '' } }} 
          onEdit={handleEditBranding}
          onPreview={handlePreviewBranding}
        />
        
        {/* Additional Notes Section */}
        <AdditionalNotesCard 
          data={othersData?.additionalNotes || { notes: '' }} 
          onEdit={handleEditNotes}
        />
      </div>
    </div>
  );
}

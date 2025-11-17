'use client';

import { MerchantTable } from './table';
import { SchedulerFilterModal } from './modals/filter';
import { EditSchedulerModal } from './modals/edit';
import { useSchedulerData, useSchedulerActions } from './hooks';
import { SchedulerFilterState } from './modals/filter/types';
import { SchedulerState, MerchantInfo } from './modals/edit/types';

export function SchedulerContent() {
  // Actions management
  const {
    openFilter,
    filterValues,
    openEditScheduler,
    selectedMerchant,
    setOpenFilter,
    setOpenEditScheduler,
    handleFilterApply,
    handleFilterReset,
    handleEdit,
    handleSchedulerSave,
    handleSchedulerReset,
    handleExport,
    getMockSchedulerState,
    getMockMerchantInfo,
  } = useSchedulerActions();

  // Data management
  const { merchants, loading, error, refreshData, updateMerchant } = useSchedulerData(filterValues);
  

  const handleView = (merchant: any) => {
    console.log('View merchant:', merchant);
  };

  const handleDelete = (merchant: any) => {
    console.log('Delete merchant:', merchant);
  };

  const handleCreate = () => {
    console.log('Create new merchant');
  };

  const handleRowClick = (merchant: any) => {
    console.log('Row clicked:', merchant);
  };

  const handleSelectionChange = (selectedMerchants: any[]) => {
    console.log('Selection changed:', selectedMerchants);
  };

  const handleFilterPressed = () => {
    setOpenFilter(true);
  };

  // Calculate active filter count and details
  const getActiveFilterDetails = () => {
    if (!filterValues) return { count: 0, details: [] };
    
    const details = [];
    let count = 0;
    
    // Check date filter
    if (filterValues.dateFilter.dateRange) {
      count++;
      details.push('Date Range');
    }
    
    // Check active scheduler filters
    const activeFilters = Object.entries(filterValues.activeScheduler)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    if (activeFilters.length > 0) {
      count++;
      details.push(`Active: ${activeFilters.join(', ')}`);
    }
    
    // Check inactive scheduler filters
    const inactiveFilters = Object.entries(filterValues.inactiveScheduler)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    if (inactiveFilters.length > 0) {
      count++;
      details.push(`Inactive: ${inactiveFilters.join(', ')}`);
    }
    
    return { count, details };
  };

  const { count: activeFilterCount, details: activeFilterDetails } = getActiveFilterDetails();

  return (
    <div className="space-y-6">
      {/* Filter Status Indicator */}
      {activeFilterCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <span className="text-sm font-medium text-blue-900">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
                <div className="text-xs text-blue-700 mt-1">
                  {activeFilterDetails.join(' • ')}
                </div>
              </div>
            </div>
            <button
              onClick={handleFilterReset}
              className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      <MerchantTable
        data={merchants}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onExport={handleExport}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        onFilterPressed={handleFilterPressed}
        loading={loading}
        error={error || undefined}
      />

      {/* Filter Modal */}
      <SchedulerFilterModal
        open={openFilter}
        onOpenChange={setOpenFilter}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />

      {/* Edit Scheduler Modal */}
      {selectedMerchant && (
        <EditSchedulerModal
          open={openEditScheduler}
          onOpenChange={(open: boolean) => {
            if (!open) {
              setOpenEditScheduler(false);
            }
          }}
          merchantInfo={getMockMerchantInfo(selectedMerchant)}
          schedulerState={getMockSchedulerState()}
          onSave={handleSchedulerSave}
          onReset={handleSchedulerReset}
        />
      )}
    </div>
  );
}
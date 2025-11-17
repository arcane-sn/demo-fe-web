import { useState, useEffect, useMemo } from 'react';
import { MerchantData } from '../../types/merchant-data';
import { SchedulerFilterState } from '../modals/filter/types';
import { mockMerchantData } from '../../data/mock-merchant-data';

export function useSchedulerData(filterValues?: SchedulerFilterState | null) {
  const [allMerchants, setAllMerchants] = useState<MerchantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllMerchants(mockMerchantData);
        setError(null);
      } catch (err) {
        setError('Failed to load merchant data');
        console.error('Error loading merchant data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAllMerchants(mockMerchantData);
      setError(null);
    } catch (err) {
      setError('Failed to refresh merchant data');
      console.error('Error refreshing merchant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateMerchant = (updatedMerchant: MerchantData) => {
    setAllMerchants(prev => 
      prev.map(merchant => 
        merchant.clientId === updatedMerchant.clientId 
          ? updatedMerchant 
          : merchant
      )
    );
  };

  // Filter merchants based on filter values
  const merchants = useMemo(() => {
    if (!filterValues) {
      return allMerchants;
    }

    const filteredMerchants = allMerchants.filter(merchant => {
      // Date filter
      if (filterValues.dateFilter.dateRange) {
        const merchantDate = new Date(merchant.updatedDate.date);
        const { from, to } = filterValues.dateFilter.dateRange;
        
        if (isNaN(merchantDate.getTime())) {
          return false; // Skip invalid dates
        }
        
        if (from && merchantDate < from) return false;
        if (to && merchantDate > to) return false;
      }

      // Active scheduler filter
      const activeSchedulerFilter = filterValues.activeScheduler;
      const hasActiveScheduler = Object.values(activeSchedulerFilter).some(value => value);
      
      if (hasActiveScheduler) {
        const hasMatchingActiveScheduler = 
          (activeSchedulerFilter.settlement && merchant.settlement.status === 'active') ||
          (activeSchedulerFilter.transactionReport && merchant.transactionReport.status === 'active') ||
          (activeSchedulerFilter.transactionSummary && merchant.transactionSummary.status === 'active') ||
          (activeSchedulerFilter.balanceStatement && merchant.balanceStatement.status === 'active') ||
          (activeSchedulerFilter.disbursement && merchant.disbursement.status === 'active');
        
        if (!hasMatchingActiveScheduler) return false;
      }

      // Inactive scheduler filter
      const inactiveSchedulerFilter = filterValues.inactiveScheduler;
      const hasInactiveScheduler = Object.values(inactiveSchedulerFilter).some(value => value);
      
      if (hasInactiveScheduler) {
        const hasMatchingInactiveScheduler = 
          (inactiveSchedulerFilter.settlement && merchant.settlement.status === 'inactive') ||
          (inactiveSchedulerFilter.transactionReport && merchant.transactionReport.status === 'inactive') ||
          (inactiveSchedulerFilter.transactionSummary && merchant.transactionSummary.status === 'inactive') ||
          (inactiveSchedulerFilter.balanceStatement && merchant.balanceStatement.status === 'inactive') ||
          (inactiveSchedulerFilter.disbursement && merchant.disbursement.status === 'inactive');
        
        if (!hasMatchingInactiveScheduler) return false;
      }

      return true;
    });
    
    return filteredMerchants;
  }, [allMerchants, filterValues]);

  return {
    merchants,
    loading,
    error,
    refreshData,
    updateMerchant,
  };
}


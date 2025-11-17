import { useState } from 'react';
import { MerchantData } from '../../types/merchant-data';
import { SchedulerFilterState } from '../modals/filter/types';
import { SchedulerState, MerchantInfo } from '../modals/edit/types';
import { DEFAULT_SCHEDULER_CONFIG } from '../../data/constants';

export function useSchedulerActions() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState<SchedulerFilterState | null>(null);
  const [openEditScheduler, setOpenEditScheduler] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantData | null>(null);

  const handleFilterApply = (values: SchedulerFilterState) => {
    setFilterValues(values);
    setOpenFilter(false);
    // Apply filter logic here
    console.log('Applied filters:', values);
  };

  const handleFilterReset = () => {
    setFilterValues(null);
    setOpenFilter(false);
    // Reset filter logic here
    console.log('Reset filters');
  };

  const handleEdit = (merchant: MerchantData) => {
    setSelectedMerchant(merchant);
    setOpenEditScheduler(true);
  };

  const handleSchedulerSave = (schedulerState: SchedulerState) => {
    console.log('Saving scheduler state:', schedulerState);
    // Save scheduler logic here
    setOpenEditScheduler(false);
  };

  const handleSchedulerReset = () => {
    console.log('Resetting scheduler state');
    // Reset scheduler logic here
  };

  const handleExport = (data: MerchantData[]) => {
    // Convert data to CSV
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, 'merchant-scheduler-data.csv');
  };

  // Mock data generators
  const getMockSchedulerState = (): SchedulerState => ({
    settlement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    transactionReport: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    transactionSummary: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    balanceStatement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    disbursement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
  });

  const getMockMerchantInfo = (merchant: MerchantData): MerchantInfo => ({
    clientId: merchant.clientId,
    companyName: `PT ${merchant.merchantName.toUpperCase()} TEKNOLOGI`,
    merchantName: merchant.merchantName,
  });

  return {
    // State
    openFilter,
    filterValues,
    openEditScheduler,
    selectedMerchant,
    
    // Actions
    setOpenFilter,
    setOpenEditScheduler,
    handleFilterApply,
    handleFilterReset,
    handleEdit,
    handleSchedulerSave,
    handleSchedulerReset,
    handleExport,
    
    // Mock data
    getMockSchedulerState,
    getMockMerchantInfo,
  };
}

// Helper functions
function convertToCSV(data: MerchantData[]): string {
  const headers = [
    'Merchant Name',
    'Client ID',
    'Settlement Status',
    'Transaction Report Status',
    'Transaction Summary Status',
    'Balance Statement Status',
    'Disbursement Status',
    'Updated Date',
    'Updated By',
  ];

  const rows = data.map(merchant => [
    merchant.merchantName,
    merchant.clientId,
    merchant.settlement.label,
    merchant.transactionReport.label,
    merchant.transactionSummary.label,
    merchant.balanceStatement.label,
    merchant.disbursement.label,
    merchant.updatedDate.date,
    merchant.updatedBy.name,
  ]);

  return [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
}

function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

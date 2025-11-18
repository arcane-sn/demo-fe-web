// Mock CSV processing data for disbursement module

export interface CsvProcessingData {
  totalTransferAmount: string;
  totalTransactions: number;
  totalBeneficiaryAccounts: number;
  fileName: string;
}

export function processMockCsvFile(file: File): CsvProcessingData {
  // Mock CSV data processing - in real implementation, you would parse the CSV
  return {
    totalTransferAmount: 'IDR 100.000.000',
    totalTransactions: 15,
    totalBeneficiaryAccounts: 10,
    fileName: file.name,
  };
}


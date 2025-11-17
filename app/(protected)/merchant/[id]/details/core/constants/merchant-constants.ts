
export const MERCHANT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
} as const;

export const MERCHANT_LEVELS = {
  LEVEL_1: { level: 1, label: 'Level 1', hasParent: false },
  LEVEL_2: { level: 2, label: 'Level 2', hasParent: true },
  LEVEL_3: { level: 3, label: 'Level 3', hasParent: true }
} as const;

export const BUSINESS_TYPES = [
  'PT',
  'CV',
  'UD',
  'Firma',
  'Koperasi',
  'Yayasan',
  'Perorangan'
] as const;

export const BUSINESS_INDUSTRIES = [
  'Technology',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Food & Beverage',
  'Travel',
  'Entertainment',
  'Other'
] as const;

export const PAYMENT_METHODS = {
  E_WALLET: 'eWallet',
  DANA: 'dana',
  SHOPEE_PAY: 'shopeePay',
  QR_CODE: 'qrCode',
  QRIS: 'qris',
  VIRTUAL_ACCOUNT: 'virtualAccount',
  VA_PERMATA_BANK: 'vaPermataBank',
  VA_CIMB_NIAGA: 'vaCimbNiaga',
  DIRECT_DEBIT: 'directDebit',
  DEBIT_CREDIT_CARD: 'debitCreditCard'
} as const;

export const SERVICE_TYPES = [
  'Payment Gateway',
  'Disbursement',
  'QR Code',
  'Virtual Account',
  'E-Wallet'
] as const;

export const INTEGRATION_STATUS = {
  INTEGRATED: 'Integrated',
  PENDING: 'Pending',
  FAILED: 'Failed',
  NOT_STARTED: 'Not Started'
} as const;

export const DOCUMENT_TYPES = [
  'Business License',
  'Tax Certificate',
  'Bank Statement',
  'Identity Card',
  'Power of Attorney',
  'Other'
] as const;

export const REVIEW_STATUS = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending-review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const TAB_IDS = {
  GENERAL_INFO: 'general-info',
  ACTIVITY: 'activity',
  CREDENTIALS: 'credentials',
  HIERARCHY: 'hierarchy',
  SERVICES_PRICING: 'services-pricing',
  SUPPORT_DOCS: 'support-docs',
  OTHERS: 'others'
} as const;

export const SERVICE_PRICING_TABS = {
  SERVICE_TYPE: 'service-type',
  PAYMENT_GATEWAY: 'payment-gateway',
  DISBURSEMENT: 'disbursement'
} as const;

export const MERCHANT_METRICS = {
  TOTAL_TRANSACTION_AMOUNT: 'totalTransactionAmount',
  TOTAL_TRANSACTION_VOLUME: 'totalTransactionVolume',
  TOTAL_MDR: 'totalMDR'
} as const;

export const ERROR_MESSAGES = {
  MERCHANT_NOT_FOUND: 'Merchant not found',
  NETWORK_ERROR: 'Network connection failed',
  VALIDATION_ERROR: 'Validation failed',
  PERMISSION_ERROR: 'Permission denied',
  TIMEOUT_ERROR: 'Request timeout'
} as const;

export const SUCCESS_MESSAGES = {
  MERCHANT_UPDATED: 'Merchant updated successfully',
  MERCHANT_DELETED: 'Merchant deleted successfully',
  DATA_COPIED: 'Data copied to clipboard',
  FILE_UPLOADED: 'File uploaded successfully'
} as const;

export const LOADING_MESSAGES = {
  FETCHING_MERCHANT: 'Loading merchant data...',
  UPDATING_MERCHANT: 'Updating merchant...',
  DELETING_MERCHANT: 'Deleting merchant...',
  UPLOADING_FILE: 'Uploading file...'
} as const;

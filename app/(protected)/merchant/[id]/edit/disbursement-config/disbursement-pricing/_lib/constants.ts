// Table configuration constants
export const TABLE_CONSTANTS = {
  PAGE_SIZE: 10,
  SEARCH_PLACEHOLDER: 'Search bank code, bank name, or referral ID',
  SEARCH_FIELDS: ['bankCode', 'bankName', 'salesReferralId', 'merchantReferralId'],
} as const;

// Filter options constants
export const FILTER_OPTIONS = {
  STATUS: [
    { label: 'Active', value: 'active', count: 3 },
    { label: 'Inactive', value: 'inactive', count: 0 },
  ],
};

// Table layout constants
export const TABLE_LAYOUT = {
  columnsPinnable: true,
  columnsMovable: true,
  columnsVisibility: true,
  cellBorder: true,
  defaultColumnSize: 150,
  defaultColumnMinSize: 100,
} as const;

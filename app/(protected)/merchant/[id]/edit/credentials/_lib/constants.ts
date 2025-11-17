export const CREDENTIALS_CONSTANTS = {
  DEFAULT_CLIENT_ID: 'UP12120293232',
  DEFAULT_CLIENT_SECRET: 'UP12920398747',
  DEFAULT_IP_WHITELIST: [
    { id: 1, value: '203.0.113.45' },
    { id: 2, value: '203.0.113.45' },
    { id: 3, value: 'xxx.x.xxx.xx' },
  ],
  DEFAULT_CALLBACK_URLS: {
    qrisTransaction: 'https://upay.free.test.com/pay-in-stg',
    qrisSettlement: 'https://upay.free.test.com/pay-out-stg',
    vaTransaction: 'https://upay.free.test.com/pay-in-stg',
    vaSettlement: 'https://upay.free.test.com/pay-out-stg',
    payoutInquiry: 'https://upay.free.test.com/pay-in-stg',
    payoutDisbursement: 'https://upay.free.test.com/pay-out-stg',
  },
} as const;

export const CALLBACK_URL_GROUPS = [
  {
    title: 'QRIS URL Callback',
    fields: [
      { key: 'qrisTransaction' as const, label: 'Transaction Callback' },
      { key: 'qrisSettlement' as const, label: 'Settlement Callback' },
    ],
  },
  {
    title: 'VA URL Callback',
    fields: [
      { key: 'vaTransaction' as const, label: 'Transaction Callback' },
      { key: 'vaSettlement' as const, label: 'Settlement Callback' },
    ],
  },
  {
    title: 'Pay-Out URL Callback',
    fields: [
      { key: 'payoutInquiry' as const, label: 'Account Inquiry Callback' },
      { key: 'payoutDisbursement' as const, label: 'Disbursement Callback' },
    ],
  },
] as const;

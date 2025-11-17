export const OTHERS_CONSTANTS = {
  DEFAULT_BRAND_COLORS: {
    primary: '#1B84FF',
    secondary: '#9F9F9F',
    accent: '#1B84FF',
    background: '#FFFFFF'
  },
  LOGO_ACCEPT_TYPES: ['jpg', 'jpeg', 'png', 'svg'],
  LOGO_MAX_SIZE: '800×400',
  LOGO_MAX_NUMBER: 1,
  BRAND_PREVIEW_ILLUSTRATION: '/media/illustrations/29.svg',
  BRANDING_BACKGROUND: '/media/images/2600x1200/bg-5.png',
  BRANDING_BACKGROUND_DARK: '/media/images/2600x1200/bg-5-dark.png',
} as const;

export const COLOR_PICKER_CONFIG = [
  {
    key: 'primary' as const,
    label: 'Primary Color',
    description: 'Main color that represents your brand',
    placeholder: '#1B84FF',
  },
  {
    key: 'secondary' as const,
    label: 'Secondary Color',
    description: 'Supporting color for balance and variety',
    placeholder: '#9F9F9F',
  },
  {
    key: 'accent' as const,
    label: 'Accent Color',
    description: 'Highlight color for emphasis',
    placeholder: '#1B84FF',
  },
  {
    key: 'background' as const,
    label: 'Background Color',
    description: 'Base color for layouts and surfaces',
    placeholder: '#FFFFFF',
  },
] as const;

export const REFERRAL_FIELDS = [
  {
    key: 'salesReferralId' as const,
    label: 'Sales Referral ID',
    placeholder: 'Input sales referral ID',
  },
  {
    key: 'salesReferralFee' as const,
    label: 'Sales Team Referral Fee (fixed price)',
    placeholder: 'IDR 0',
  },
  {
    key: 'merchantReferralClientId' as const,
    label: 'Referral Client ID',
    placeholder: 'Input Client ID',
  },
  {
    key: 'merchantReferralFee' as const,
    label: 'Merchant Referral Fee (percentage price)',
    placeholder: '0%',
  },
] as const;

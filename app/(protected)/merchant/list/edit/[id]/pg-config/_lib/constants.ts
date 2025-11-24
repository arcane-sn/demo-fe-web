import { ChannelData } from './types';
import { getChannelsByType } from '../../../../../components/modals/chanels/channel-data';

// Helper function to generate unique referral IDs based on channel ID
let referralIdCounter = 1;
const generateReferralIds = (channelId: string) => {
  const counter = referralIdCounter++;
  const salesReferralId = `SR110101${counter.toString().padStart(3, '0')}`;
  const merchantReferralId = `MR122221${counter.toString().padStart(3, '0')}`;
  return { salesReferralId, merchantReferralId };
};

// Helper function to convert Channel to ChannelData format
const convertChannelToChannelData = (channel: { id: string; name: string; logo: string; logoColor: string; provider: string; setupFeeRate: string }): ChannelData => {
  // Extract percentage from setupFeeRate (e.g., "1.35%" -> "1.35%")
  const mdrPercentage = channel.setupFeeRate.split('+')[0].trim();
  const fixedPrice = channel.setupFeeRate.includes('+') 
    ? channel.setupFeeRate.split('+')[1].trim() 
    : 'IDR 0';

  // Generate unique IDs for referrals
  const { salesReferralId, merchantReferralId } = generateReferralIds(channel.id);

  // Calculate rates based on MDR (simplified calculation)
  const mdrValue = parseFloat(mdrPercentage.replace('%', '')) || 0;
  const providerRateValue = (mdrValue * 0.5).toFixed(2) + '%';
  const merchantRateValue = (mdrValue * 0.2).toFixed(2) + '%';
  const flypayRateValue = (mdrValue * 0.1).toFixed(2) + '%';
  const resellerRateValue = (mdrValue * 0.3).toFixed(2) + '%';

  return {
    id: channel.id,
    name: channel.name,
    logo: channel.logo || null,
    logoColor: channel.logoColor,
    provider: channel.provider,
    mdr: {
      percentagePrice: mdrPercentage,
      fixedPrice: fixedPrice
    },
    providerRate: {
      percentagePrice: providerRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    merchantRate: {
      percentagePrice: merchantRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    flypayRate: {
      percentagePrice: flypayRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    resellerRate: {
      percentagePrice: resellerRateValue,
      fixedPrice: 'IDR 0',
      showToMerchant: true
    },
    salesReferralId,
    salesReferralFee: {
      percentagePrice: '0%',
      fixedPrice: 'IDR 500'
    },
    merchantReferralId,
    merchantReferralFee: {
      percentagePrice: '1.5%',
      fixedPrice: 'IDR 0'
    }
  };
};

// Convert base channel data to ChannelData format using centralized channel-data.ts
export const MOCK_CHANNELS: Record<string, ChannelData[]> = {
  ewallet: getChannelsByType('ewallet').map(convertChannelToChannelData),
  qr: getChannelsByType('qr').map(convertChannelToChannelData),
  'virtual-account': getChannelsByType('virtual-account').map(convertChannelToChannelData),
  'credit-card': getChannelsByType('credit-card').map(convertChannelToChannelData),
};

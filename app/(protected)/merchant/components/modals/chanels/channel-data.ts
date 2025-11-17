import { Channel, ChannelType } from './add-channel-modal';

export const channelData: Record<ChannelType, Channel[]> = {
  ewallet: [
    {
      id: 'dana',
      name: 'Dana',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: '/media/chanels/dana.png',
      logoColor: 'bg-blue-600'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      setupFeeRate: '1.7%',
      provider: 'Upay',
      logo: '/media/chanels/shopeepay.png',
      logoColor: 'bg-orange-500'
    },
    {
      id: 'ovo',
      name: 'OVO',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: 'OVO',
      logoColor: 'bg-purple-600'
    }
  ],
  qr: [
    {
      id: 'qris',
      name: 'QRIS',
      setupFeeRate: '0.7%',
      provider: 'HLA Cash',
      logo: '/media/chanels/qris.png',
      logoColor: 'bg-red-600'
    }
  ],
  'virtual-account': [
    {
      id: 'permata',
      name: 'VA Permata Bank',
      setupFeeRate: '1.3%',
      provider: 'Permata',
      logo: '/media/chanels/permata.png',
      logoColor: 'bg-green-600'
    },
    {
      id: 'cimb',
      name: 'VA CIMB Niaga',
      setupFeeRate: '1.7%',
      provider: 'User',
      logo: '/media/chanels/cimb.png',
      logoColor: 'bg-red-700'
    }
  ],
  'direct-debit': [
    // Add direct debit channels here when available
  ],
  'credit-card': [
    {
      id: 'regular',
      name: 'Regular',
      setupFeeRate: '1.7% + IDR 5,000',
      provider: 'Card Provider',
      logo: '',
      logoColor: ''
    },
    {
      id: 'recurring',
      name: 'Recurring',
      setupFeeRate: '1.7% + IDR 5,000',
      provider: 'Card Provider',
      logo: '',
      logoColor: ''
    },
    {
      id: 'installment',
      name: 'Installment',
      setupFeeRate: '1.7% + IDR 5,000',
      provider: 'Card Provider',
      logo: '',
      logoColor: ''
    }
  ]
};

export const getChannelsByType = (type: ChannelType): Channel[] => {
  return channelData[type] || [];
};

import { Channel, ChannelType } from './add-channel-modal';

export const channelData: Record<ChannelType, Channel[]> = {
  ewallet: [
    {
      id: 'dana',
      name: 'Dana',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: '/media/payment-channels/ewallet/Dana.svg',
      logoColor: 'bg-blue-600'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: '/media/payment-channels/ewallet/Gopay.svg',
      logoColor: 'bg-green-600'
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: '/media/payment-channels/ewallet/LinkAja.svg',
      logoColor: 'bg-yellow-500'
    },
    {
      id: 'ovo',
      name: 'OVO',
      setupFeeRate: '1.35%',
      provider: 'Upay',
      logo: '/media/payment-channels/ewallet/OVO.svg',
      logoColor: 'bg-purple-600'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      setupFeeRate: '1.7%',
      provider: 'Upay',
      logo: '/media/payment-channels/ewallet/Shoppepay.svg',
      logoColor: 'bg-orange-500'
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
      id: 'va-bca',
      name: 'VA BCA',
      setupFeeRate: '1.3%',
      provider: 'BCA',
      logo: '/media/payment-channels/bank/BCA.svg',
      logoColor: 'bg-blue-600'
    },
    {
      id: 'va-bni',
      name: 'VA BNI',
      setupFeeRate: '1.3%',
      provider: 'BNI',
      logo: '/media/payment-channels/bank/BNI.svg',
      logoColor: 'bg-yellow-500'
    },
    {
      id: 'va-bri',
      name: 'VA BRI',
      setupFeeRate: '1.3%',
      provider: 'BRI',
      logo: '/media/payment-channels/bank/BRI.svg',
      logoColor: 'bg-green-600'
    },
    {
      id: 'va-mandiri',
      name: 'VA Mandiri',
      setupFeeRate: '1.3%',
      provider: 'Mandiri',
      logo: '/media/payment-channels/bank/mandiri.svg',
      logoColor: 'bg-red-600'
    },
    {
      id: 'va-permata',
      name: 'VA Permata Bank',
      setupFeeRate: '1.3%',
      provider: 'Permata',
      logo: '/media/payment-channels/bank/Permata.svg',
      logoColor: 'bg-green-600'
    },
    {
      id: 'va-cimb',
      name: 'VA CIMB Niaga',
      setupFeeRate: '1.7%',
      provider: 'CIMB Niaga',
      logo: '/media/payment-channels/bank/CIMB Niaga.svg',
      logoColor: 'bg-red-700'
    },
    {
      id: 'va-danamon',
      name: 'VA Danamon',
      setupFeeRate: '1.3%',
      provider: 'Danamon',
      logo: '/media/payment-channels/bank/Danamon.svg',
      logoColor: 'bg-blue-700'
    },
    {
      id: 'va-bsi',
      name: 'VA BSI',
      setupFeeRate: '1.3%',
      provider: 'BSI',
      logo: '/media/payment-channels/bank/BSI.svg',
      logoColor: 'bg-green-700'
    },
    {
      id: 'va-btn',
      name: 'VA BTN',
      setupFeeRate: '1.3%',
      provider: 'BTN',
      logo: '/media/payment-channels/bank/BTN.svg',
      logoColor: 'bg-blue-800'
    },
    {
      id: 'va-mega',
      name: 'VA Mega',
      setupFeeRate: '1.3%',
      provider: 'Mega',
      logo: '/media/payment-channels/bank/Mega.svg',
      logoColor: 'bg-purple-600'
    },
    {
      id: 'va-panin',
      name: 'VA Panin Bank',
      setupFeeRate: '1.3%',
      provider: 'Panin',
      logo: '/media/payment-channels/bank/PaninBank.svg',
      logoColor: 'bg-blue-900'
    },
    {
      id: 'va-uob',
      name: 'VA UOB',
      setupFeeRate: '1.3%',
      provider: 'UOB',
      logo: '/media/payment-channels/bank/UOB.svg',
      logoColor: 'bg-red-800'
    },
    {
      id: 'va-jago',
      name: 'VA Jago',
      setupFeeRate: '1.3%',
      provider: 'Jago',
      logo: '/media/payment-channels/bank/Jago.svg',
      logoColor: 'bg-green-500'
    },
    {
      id: 'va-jenius',
      name: 'VA Jenius',
      setupFeeRate: '1.3%',
      provider: 'Jenius',
      logo: '/media/payment-channels/bank/Jenius.svg',
      logoColor: 'bg-purple-500'
    },
    {
      id: 'va-seabank',
      name: 'VA SeaBank',
      setupFeeRate: '1.3%',
      provider: 'SeaBank',
      logo: '/media/payment-channels/bank/SeaBank.svg',
      logoColor: 'bg-blue-500'
    },
    {
      id: 'va-superbank',
      name: 'VA Superbank',
      setupFeeRate: '1.3%',
      provider: 'Superbank',
      logo: '/media/payment-channels/bank/Superbank.svg',
      logoColor: 'bg-indigo-600'
    },
    {
      id: 'va-nobu',
      name: 'VA Nobu',
      setupFeeRate: '1.3%',
      provider: 'Nobu',
      logo: '/media/payment-channels/bank/Nobu.svg',
      logoColor: 'bg-gray-700'
    },
    {
      id: 'va-octoclick',
      name: 'VA Octoclick',
      setupFeeRate: '1.3%',
      provider: 'Octoclick',
      logo: '/media/payment-channels/bank/Octoclick.svg',
      logoColor: 'bg-orange-600'
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

import { ChannelData } from './types';

export const MOCK_CHANNELS: Record<string, ChannelData[]> = {
  ewallet: [
    { 
      id: 'dana', 
      name: 'DANA', 
      logo: '/media/chanels/dana.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'shopeepay', 
      name: 'ShopeePay', 
      logo: '/media/chanels/shopeepay.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'ovo', 
      name: 'OVO', 
      logo: '/media/chanels/ovo.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'gopay', 
      name: 'Gopay', 
      logo: '/media/chanels/gopay.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
  ],
  qr: [
    { 
      id: 'qris', 
      name: 'QRIS', 
      logo: '/media/chanels/qris.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
  ],
  'virtual-account': [
    { 
      id: 'permata', 
      name: 'Permata Bank', 
      logo: '/media/chanels/permata.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'cimb', 
      name: 'CIMB Niaga', 
      logo: '/media/chanels/cimb.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'bca', 
      name: 'BCA', 
      logo: '/media/chanels/bca.png', 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
  ],
  'credit-card': [
    { 
      id: 'regular', 
      name: 'Regular', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'recurring', 
      name: 'Recurring', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'installment-1', 
      name: '1 Month Installment', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'installment-3', 
      name: '3 Month Installment', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'installment-6', 
      name: '6 Month Installment', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
    { 
      id: 'installment-12', 
      name: '12 Month Installment', 
      logo: null, 
      logoColor: '', 
      provider: 'PIRO', 
      mdr: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      },
      providerRate: {
        percentagePrice: '0.7%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      merchantRate: {
        percentagePrice: '0.3%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      flypayRate: {
        percentagePrice: '0.1%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      resellerRate: {
        percentagePrice: '0.5%',
        fixedPrice: 'IDR 0',
        showToMerchant: true
      },
      salesReferralId: 'SR110101029292',
      salesReferralFee: {
        percentagePrice: '0%',
        fixedPrice: 'IDR 500'
      },
      merchantReferralId: 'MR122221111132',
      merchantReferralFee: {
        percentagePrice: '1.5%',
        fixedPrice: 'IDR 0'
      }
    },
  ],
};

import { ChannelData } from '../../types/channel';

// Mock channel data - replace with actual API call
export const mockChannelData: ChannelData[] = [
  {
    id: '1',
    parentId: 'FP-P2025091900001',
    merchantName: 'DigiStore',
    clientId: 'UP2025091900001',
    paymentMethod: {
      type: 'e_wallet',
      label: 'e-Wallet'
    },
    channel: {
      name: 'DANA',
      type: 'DANA'
    },
    provider: 'PIRO',
    nmid: 'UP2025091900001',
    mdr: '1.5% + IDR 0',
    providerRate: '0.7% + IDR 0',
    merchantRate: '0.3% + IDR 0',
    flypayRate: '(0.1% + IDR 0)',
    resellerRate: '0.5% + IDR 0',
    salesReferralId: 'SR110101029292',
    salesReferralFee: '(0% + IDR 500)',
    merchantReferralId: 'MR122221111132',
    merchantReferralFee: '(1.5% + IDR 0)',
    settlementDay: 2,
    sameDaySettlement: true,
    status: {
      status: 'active',
      label: 'Active'
    },
    registeredDate: {
      date: 'Thu, Dec 16, 2025',
      time: '23:12:32',
      timezone: 'GMT +7'
    },
    registeredBy: {
      name: 'Wakwaw Waw',
      email: 'wakwaw@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Wakwaw'
    },
    updatedAt: {
      date: 'Thu, Dec 16, 2025',
      time: '23:12:32',
      timezone: 'GMT +7'
    },
    updatedBy: {
      name: 'Bicaktiguling',
      email: 'bicaktiguling@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bicaktiguling'
    }
  },
  // Additional records to reach 52 total
  ...Array.from({ length: 51 }, (_, index) => {
    const baseIndex = index % 10;
    const baseData = [
      { channel: 'DANA', salesFee: 'IDR 500', merchantFee: '1.5%', settlementDay: 2 },
      { channel: 'OVO', salesFee: 'IDR 750', merchantFee: '2.0%', settlementDay: 1 },
      { channel: 'LinkAja', salesFee: 'IDR 600', merchantFee: '1.0%', settlementDay: 3 },
      { channel: 'GoPay', salesFee: 'IDR 550', merchantFee: '2.5%', settlementDay: 4 },
      { channel: 'PayPal', salesFee: 'IDR 450', merchantFee: '1.8%', settlementDay: 1 },
      { channel: 'Trash', salesFee: 'IDR 700', merchantFee: '3.0%', settlementDay: 5 },
      { channel: 'Jenius', salesFee: 'IDR 400', merchantFee: '2.2%', settlementDay: 2 },
      { channel: 'Cash', salesFee: 'IDR 300', merchantFee: '0.5%', settlementDay: 3 },
      { channel: 'Alipay', salesFee: 'IDR 1.000', merchantFee: '4.0%', settlementDay: 4 },
      { channel: 'Zelle', salesFee: 'IDR 850', merchantFee: '2.8%', settlementDay: 1 }
    ];
    
    const base = baseData[baseIndex];
    const id = 2 + index;
    
    return {
      id: `${id}`,
      parentId: `FP-P20250919000${String(id).padStart(2, '0')}`,
      merchantName: 'DigiStore',
      clientId: `UP20250919000${String(id).padStart(2, '0')}`,
      paymentMethod: {
        type: 'e_wallet' as const,
        label: 'e-Wallet'
      },
      channel: {
        name: base.channel,
        type: base.channel as any
      },
      provider: 'PIRO',
      nmid: `UP20250919000${String(id).padStart(2, '0')}`,
      mdr: '1.5% + IDR 0',
      providerRate: '0.7% + IDR 0',
      merchantRate: '0.3% + IDR 0',
      flypayRate: '(0.1% + IDR 0)',
      resellerRate: '0.5% + IDR 0',
      salesReferralId: `SR110101029${292 + id}`,
      salesReferralFee: base.salesFee,
      merchantReferralId: `MR122221111${1132 + id}`,
      merchantReferralFee: base.merchantFee,
      settlementDay: base.settlementDay,
      sameDaySettlement: true,
      status: {
        status: 'active' as const,
        label: 'Active'
      },
      registeredDate: {
        date: 'Thu, Dec 16, 2025',
        time: '23:12:32',
        timezone: 'GMT +7'
      },
      registeredBy: {
        name: `User ${id}`,
        email: `user${id}@gmail.com`,
        avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=User${id}`
      },
      updatedAt: {
        date: 'Thu, Dec 16, 2025',
        time: '23:12:32',
        timezone: 'GMT +7'
      },
      updatedBy: {
        name: `Admin ${id}`,
        email: `admin${id}@gmail.com`,
        avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=Admin${id}`
      }
    };
  })
];

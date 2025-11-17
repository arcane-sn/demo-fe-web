import {
  ScrollspyMenu,
  ScrollspyMenuItems,
} from '@/partials/navbar/scrollspy-menu';

export function EditBankPricingSidebar() {
  const items: ScrollspyMenuItems = [
    {
      title: 'Bank Status',
      target: 'bank_status',
      active: true,
    },
    {
      title: 'Fee Management',
      target: 'fee_management',
    },
    {
      title: 'Rate Details (Optional)',
      target: 'rate_details',
    },
    {
      title: 'Transfer Management',
      target: 'transfer_management',
    },
    {
      title: 'Sales Referral (Optional)',
      target: 'sales_referral',
    },
    {
      title: 'Merchant Referral (Optional)',
      target: 'merchant_referral',
    },
  ];

  return <ScrollspyMenu items={items} />;
}


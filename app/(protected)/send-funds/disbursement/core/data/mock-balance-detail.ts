// Mock balance detail data for disbursement module

import { Rocket, Clock, Wallet, XCircle } from 'lucide-react';

export interface BalanceDetailItem {
  icon: typeof Rocket | typeof Clock | typeof Wallet | typeof XCircle;
  iconColor: string;
  amount: string;
  label: string;
}

export const mockBalanceDetailData: BalanceDetailItem[] = [
  {
    icon: Rocket,
    iconColor: 'text-green-600',
    amount: 'IDR 200.000.000',
    label: 'Active Balance',
  },
  {
    icon: Clock,
    iconColor: 'text-orange-600',
    amount: 'IDR 100.000.000',
    label: 'Pending Balance',
  },
  {
    icon: Wallet,
    iconColor: 'text-blue-600',
    amount: 'IDR 300.000.000',
    label: 'Total Balance',
  },
  {
    icon: XCircle,
    iconColor: 'text-red-600',
    amount: 'IDR 1.000.000',
    label: 'Hold Balance',
  }
];


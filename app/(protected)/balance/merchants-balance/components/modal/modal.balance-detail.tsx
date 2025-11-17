"use client";

import { DetailModal, type DetailItem } from "@/components/shared/modals";
import {
  Rocket,
  Hourglass,
  Wallet,
  ShieldX,
} from "lucide-react";

interface ModalBalanceDetailProps {
  open: boolean;
  onClose: () => void;
  activeBalance?: number;
  pendingBalance?: number;
  totalBalance?: number;
  holdBalance?: number;
}

const ModalBalanceDetail = ({
  open,
  onClose,
  activeBalance = 200000000,
  pendingBalance = 100000000,
  totalBalance = 300000000,
  holdBalance = 1000000,
}: ModalBalanceDetailProps) => {
  const balanceItems: DetailItem[] = [
    {
      label: "Active Balance",
      value: activeBalance,
      IconComponent: Rocket,
      iconColor: "text-green-500",
      description: "Funds available for disbursement from all merchants",
    },
    {
      label: "Pending Balance",
      value: pendingBalance,
      IconComponent: Hourglass,
      iconColor: "text-orange-500",
      description: "Funds not yet released. Pending balances may be awaiting approval or still processing at the bank",
    },
    {
      label: "Total Balance",
      value: totalBalance,
      IconComponent: Wallet,
      iconColor: "text-blue-500",
      description: "The overall balance across all merchants",
    },
    {
      label: "Hold Balance",
      value: holdBalance,
      IconComponent: ShieldX,
      iconColor: "text-red-500",
      description: "Funds currently held by the internal team and not available for disbursement",
    },
  ];

  return (
    <DetailModal
      open={open}
      onClose={onClose}
      title="Balance Detail"
      items={balanceItems}
      currencyFormat={{
        currency: "IDR",
        locale: "id-ID",
        useDotSeparator: true,
      }}
    />
  );
};

export default ModalBalanceDetail;


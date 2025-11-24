'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { ScrollspyMenu } from '@/app/components/partials/navbar/scrollspy-menu';
import { Scrollspy } from '@/components/ui/scrollspy';
import { ReusableTable } from '@/components/table';
import { KeenIcon } from '@/components/keenicons';
import { MerchantService } from '../../../../core/services/merchant.service';
import { usePaymentGatewayTableColumns } from './table-columns';
import { ChannelData } from '@/app/(protected)/merchant/list/edit/[id]/pg-config/_lib/types';
import { channelData as baseChannelData, getChannelsByType } from '../../../../components/modals/chanels/channel-data';
import type { ChannelType } from '../../../../components/modals/chanels/add-channel-modal';

type AddedChannels = Record<ChannelType, string[]>;

// Helper function to create default rate data
const createDefaultRate = (percentage: string, fixed: string = 'IDR 0') => ({
  percentagePrice: percentage,
  fixedPrice: fixed,
});

// Helper function to create default rate with visibility
const createDefaultRateWithVisibility = (percentage: string, fixed: string = 'IDR 0', showToMerchant: boolean = true) => ({
  percentagePrice: percentage,
  fixedPrice: fixed,
  showToMerchant,
});

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
    mdr: createDefaultRate(mdrPercentage, fixedPrice),
    providerRate: createDefaultRateWithVisibility(providerRateValue),
    merchantRate: createDefaultRateWithVisibility(merchantRateValue),
    flypayRate: createDefaultRateWithVisibility(flypayRateValue),
    resellerRate: createDefaultRateWithVisibility(resellerRateValue),
    salesReferralId,
    salesReferralFee: createDefaultRate('0%', 'IDR 500'),
    merchantReferralId,
    merchantReferralFee: createDefaultRate('1.5%'),
  };
};

// Convert base channel data to ChannelData format
const channelData: Record<ChannelType, ChannelData[]> = {
  ewallet: getChannelsByType('ewallet').map(convertChannelToChannelData),
  qr: getChannelsByType('qr').map(convertChannelToChannelData),
  'virtual-account': getChannelsByType('virtual-account').map(convertChannelToChannelData),
  'direct-debit': [
    {
      id: 'direct-debit',
      name: 'Direct Debit',
      logo: null,
      logoColor: 'bg-gray-500',
      provider: '-',
      mdr: createDefaultRate('0%', 'IDR 0'),
      providerRate: createDefaultRateWithVisibility('0%', 'IDR 0'),
      merchantRate: createDefaultRateWithVisibility('0%', 'IDR 0'),
      flypayRate: createDefaultRateWithVisibility('0%', 'IDR 0'),
      resellerRate: createDefaultRateWithVisibility('0%', 'IDR 0'),
      salesReferralId: '-',
      salesReferralFee: createDefaultRate('0%', 'IDR 0'),
      merchantReferralId: '-',
      merchantReferralFee: createDefaultRate('0%', 'IDR 0'),
    }
  ],
  'credit-card': getChannelsByType('credit-card').map(channel => ({
    ...convertChannelToChannelData({
      ...channel,
      logo: channel.logo || '',
      setupFeeRate: channel.setupFeeRate || '1.7% + IDR 5,000'
    }),
    mdr: createDefaultRate('1.7%', 'IDR 5,000'),
    providerRate: createDefaultRateWithVisibility('0.8%', 'IDR 2,000'),
    merchantRate: createDefaultRateWithVisibility('0.4%', 'IDR 1,000'),
    flypayRate: createDefaultRateWithVisibility('0.2%', 'IDR 500'),
    resellerRate: createDefaultRateWithVisibility('0.6%', 'IDR 1,500'),
  })),
};

const scrollspyItems = [
  { title: 'e-Wallet', target: 'e-wallet' },
  { title: 'QR Code', target: 'qr-code' },
  { title: 'Virtual Account', target: 'virtual-account' },
  { title: 'Direct Debit', target: 'direct-debit' },
  { title: 'Debit / Credit Card', target: 'debit-credit-card' },
];

// Illustration component for empty state
const EmptyStateIllustration = () => (
  <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
    <Image
      src="/media/illustrations/33.svg"
      alt="No channels configured"
      width={128}
      height={128}
      className="w-full h-full object-contain"
      priority={false}
    />
  </div>
);

interface PaymentGatewayContentProps {
  merchantId?: string;
}

export function PaymentGatewayContent({ merchantId = '1' }: PaymentGatewayContentProps) {
  const [merchantData, setMerchantData] = useState<any>(null);

  // Load merchant data based on merchantId
  useEffect(() => {
    const loadMerchantData = async () => {
      try {
        const data = await MerchantService.fetchMerchant(merchantId);
      setMerchantData(data);
      } catch (error) {
        // Error handling is done by the service layer
      }
    };
    loadMerchantData();
  }, [merchantId]);

  // Extract active channels from merchant data
  const getActiveChannelsFromMerchant = (): AddedChannels => {
    if (!merchantData?.services?.paymentMethods) {
      return {
        ewallet: [],
        qr: [],
        'virtual-account': [],
        'direct-debit': [],
        'credit-card': []
      };
    }

    const paymentMethods = merchantData.services.paymentMethods;
    const activeChannels: AddedChannels = {
      ewallet: [],
      qr: [],
      'virtual-account': [],
      'direct-debit': [],
      'credit-card': []
    };

    // E-Wallet channels
    if (paymentMethods.eWallet) {
      if (paymentMethods.dana) activeChannels.ewallet.push('dana');
      if (paymentMethods.shopeePlay) activeChannels.ewallet.push('shopeepay');
    }

    // QR Code channels
    if (paymentMethods.qrCode) {
      if (paymentMethods.qris) activeChannels.qr.push('qris');
    }

    // Virtual Account channels
    if (paymentMethods.virtualAccount) {
      if (paymentMethods.vaPermataBank) activeChannels['virtual-account'].push('va-permata');
      if (paymentMethods.vaCimbNiaga) activeChannels['virtual-account'].push('va-cimb');
    }

    // Direct Debit channels
    if (paymentMethods.directDebit) {
      activeChannels['direct-debit'].push('direct-debit');
    }

    // Credit Card channels
    if (paymentMethods.debitCreditCard) {
      activeChannels['credit-card'].push('regular', 'recurring', 'installment');
    }

    return activeChannels;
  };

  const [addedChannels, setAddedChannels] = useState<AddedChannels>({
    ewallet: [],
    qr: [],
    'virtual-account': [],
    'direct-debit': [],
    'credit-card': []
  });

  // Update addedChannels when merchant data changes
  useEffect(() => {
    setAddedChannels(getActiveChannelsFromMerchant());
  }, [merchantData]);

  const getChannelById = (channelId: string, channelType: ChannelType): ChannelData | undefined => {
    return channelData[channelType].find(channel => channel.id === channelId);
  };

  // Get channels array for a specific type
  const getChannelsForType = (channelType: ChannelType): ChannelData[] => {
    return addedChannels[channelType]
      .map((channelId: string) => getChannelById(channelId, channelType))
      .filter((channel): channel is ChannelData => channel !== undefined);
  };

  const tableColumns = usePaymentGatewayTableColumns();

  // Show loading state while merchant data is loading
  if (!merchantData) {
    return (
      <div className="flex gap-6">
        <div className="w-48 flex-shrink-0">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Scrollspy Menu */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Scrollspy
            targetRef={{ current: document }}
            offset={100}
            smooth={true}
            dataAttribute="scrollspy"
          >
            <ScrollspyMenu items={scrollspyItems} />
          </Scrollspy>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* e-Wallet Section */}
        <div data-scrollspy-anchor="e-wallet" id="e-wallet">
          <ReusableTable
            config={{
              data: getChannelsForType('ewallet'),
              columns: tableColumns,
              enableSorting: true,
              enablePagination: false,
              enableRowSelection: false,
            }}
            headerConfig={{
              customHeader: (
                <div className="flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="wallet" style="outline" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">e-Wallet</h3>
                      <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                </div>
              ),
            }}
            emptyStateConfig={{
              title: 'No e-wallet channels configured',
              description: 'No e-wallet payment channels have been set up for this merchant.',
              illustration: <EmptyStateIllustration />,
            }}
          />
        </div>

        {/* QR Code Section */}
        <div data-scrollspy-anchor="qr-code" id="qr-code">
          <ReusableTable
            config={{
              data: getChannelsForType('qr'),
              columns: tableColumns,
              enableSorting: true,
              enablePagination: false,
              enableRowSelection: false,
            }}
            headerConfig={{
              customHeader: (
                <div className="flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="scan-barcode" style="outline" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">QR Code</h3>
                      <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                </div>
              ),
            }}
            emptyStateConfig={{
              title: 'No QR code channels configured',
              description: 'No QR code payment channels have been set up for this merchant.',
              illustration: <EmptyStateIllustration />,
            }}
          />
        </div>

        {/* Virtual Account Section */}
        <div data-scrollspy-anchor="virtual-account" id="virtual-account">
          <ReusableTable
            config={{
              data: getChannelsForType('virtual-account'),
              columns: tableColumns,
              enableSorting: true,
              enablePagination: false,
              enableRowSelection: false,
            }}
            headerConfig={{
              customHeader: (
                <div className="flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="bank" style="outline" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Virtual Account</h3>
                      <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                </div>
              ),
            }}
            emptyStateConfig={{
              title: 'No virtual account channels configured',
              description: 'No virtual account payment channels have been set up for this merchant.',
              illustration: <EmptyStateIllustration />,
            }}
          />
        </div>

        {/* Direct Debit Section */}
        <div data-scrollspy-anchor="direct-debit" id="direct-debit">
          <ReusableTable
            config={{
              data: getChannelsForType('direct-debit'),
              columns: tableColumns,
              enableSorting: true,
              enablePagination: false,
              enableRowSelection: false,
            }}
            headerConfig={{
              customHeader: (
                <div className="flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="arrow-down" style="outline" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Direct Debit</h3>
                      <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                </div>
              ),
            }}
            emptyStateConfig={{
              title: 'No direct debit channels configured',
              description: 'No direct debit payment channels have been set up for this merchant.',
              illustration: <EmptyStateIllustration />,
            }}
          />
        </div>

        {/* Debit / Credit Card Section */}
        <div data-scrollspy-anchor="debit-credit-card" id="debit-credit-card">
          <ReusableTable
            config={{
              data: getChannelsForType('credit-card').filter(ch => ch.id !== 'installment'),
              columns: tableColumns,
              enableSorting: true,
              enablePagination: false,
              enableRowSelection: false,
            }}
            headerConfig={{
              customHeader: (
                <div className="flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="two-credit-cart" style="outline" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Debit / Credit Card</h3>
                      <p className="text-sm text-gray-600">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Section
                  </Button>
                </div>
              ),
            }}
            emptyStateConfig={{
              title: 'No credit card payment types configured',
              description: 'No credit card payment types have been set up for this merchant.',
              illustration: <EmptyStateIllustration />,
            }}
          />
        </div>
      </div>
    </div>
  );
}

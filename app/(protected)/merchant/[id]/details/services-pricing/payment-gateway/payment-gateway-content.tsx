'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, QrCode, Building2, ArrowDownToLine, CreditCard } from 'lucide-react';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { cn } from '@/lib/utils';
import { MerchantService } from '../../../../core/services/merchant.service';

interface Channel {
  id: string;
  name: string;
  setupFeeRate: string;
  provider: string;
  logo: string;
  logoColor: string;
}

type ChannelType = 'ewallet' | 'qr' | 'virtual-account' | 'direct-debit' | 'credit-card';

type AddedChannels = Record<ChannelType, string[]>;

// Sample channel data - this matches the payment methods structure from mock merchants
const channelData: Record<ChannelType, Channel[]> = {
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
    }
  ],
  qr: [
    {
      id: 'qris',
      name: 'QRIS',
      setupFeeRate: '0.75%',
      provider: 'INA Cash',
      logo: '/media/chanels/qris.png',
      logoColor: 'bg-red-600'
    }
  ],
  'virtual-account': [
    {
      id: 'va-permata',
      name: 'VA Permata Bank',
      setupFeeRate: '1.35%',
      provider: 'Permata',
      logo: '/media/chanels/permata.png',
      logoColor: 'bg-green-600'
    },
    {
      id: 'va-cimb',
      name: 'VA CIMB Niaga',
      setupFeeRate: '1.7%',
      provider: 'Upay',
      logo: '/media/chanels/cimb.png',
      logoColor: 'bg-red-700'
    }
  ],
  'direct-debit': [
    {
      id: 'direct-debit',
      name: 'Direct Debit',
      setupFeeRate: 'Unregistered',
      provider: '-',
      logo: 'DD',
      logoColor: 'bg-gray-500'
    }
  ],
  'credit-card': [
    {
      id: 'regular',
      name: 'Regular',
      setupFeeRate: '1.7% + IDR 5,000',
      provider: 'Card Provider',
      logo: '',
      logoColor: 'bg-blue-600'
    },
    {
      id: 'recurring',
      name: 'Recurring',
      setupFeeRate: '1.7% + IDR 5,000',
      provider: 'Card Provider',
      logo: '',
      logoColor: 'bg-green-600'
    },
    {
      id: 'installment',
      name: 'Installment',
      setupFeeRate: '',
      provider: 'Card Provider',
      logo: '',
      logoColor: 'bg-purple-600'
    }
  ]
};

const navigationItems = [
  { id: 'e-wallet', label: 'e-Wallet', icon: Wallet },
  { id: 'qr-code', label: 'QR Code', icon: QrCode },
  { id: 'virtual-account', label: 'Virtual Account', icon: Building2 },
  { id: 'direct-debit', label: 'Direct Debit', icon: ArrowDownToLine },
  { id: 'debit-credit-card', label: 'Debit / Credit Card', icon: CreditCard },
];

// Channel Logo Component
const ChannelLogo = ({ channel }: { channel: { logo: string; logoColor?: string; name: string } }) => (
  <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden bg-white border">
    {channel.logo.startsWith('/media/') ? (
      <img 
        src={channel.logo} 
        alt={channel.name}
        className="w-8 h-8 object-contain"
      />
    ) : (
      <div className={`w-full h-full ${channel.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}>
        {channel.logo}
      </div>
    )}
  </div>
);

interface PaymentGatewayContentProps {
  merchantId?: string;
}

export function PaymentGatewayContent({ merchantId = '1' }: PaymentGatewayContentProps) {
  const [activeSection, setActiveSection] = useState('e-wallet');
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

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getChannelById = (channelId: string, channelType: ChannelType): Channel | undefined => {
    return channelData[channelType].find(channel => channel.id === channelId);
  };

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
    <div className="space-y-6">
      

      <div className="flex gap-6">
      {/* Sidebar Navigation */}
      <div className="w-48 flex-shrink-0">
        <div className="sticky top-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                  activeSection === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* e-Wallet Section */}
        <Card id="e-wallet">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={<Wallet size={20} className="text-xl text-gray-600" />}
              />
              <div>
                <CardTitle>e-Wallet</CardTitle>
                <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {addedChannels.ewallet.length > 0 ? (
              <div className="space-y-3">
                {addedChannels.ewallet.map((channelId: string) => {
                  const channel = getChannelById(channelId, 'ewallet');
                  if (!channel) return null;
                  
                  return (
                    <div key={channelId} className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                      <ChannelLogo channel={channel} />
                      <div>
                        <p className="font-medium text-sm">{channel.name}</p>
                        <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                        <p className="text-xs text-muted-foreground">Provider: {channel.provider}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No e-wallet channels configured
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <Card id="qr-code">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={<QrCode size={20} className="text-xl text-gray-600" />}
              />
              <div>
                <CardTitle>QR Code</CardTitle>
                <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {addedChannels.qr.length > 0 ? (
              <div className="space-y-3">
                {addedChannels.qr.map((channelId: string) => {
                  const channel = getChannelById(channelId, 'qr');
                  if (!channel) return null;
                  
                  return (
                    <div key={channelId} className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                      <ChannelLogo channel={channel} />
                      <div>
                        <p className="font-medium text-sm">{channel.name}</p>
                        <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                        <p className="text-xs text-muted-foreground">Provider: {channel.provider}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No QR code channels configured
              </div>
            )}
          </CardContent>
        </Card>

        {/* Virtual Account Section */}
        <Card id="virtual-account">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={<Building2 size={20} className="text-xl text-gray-600" />}
              />
              <div>
                <CardTitle>Virtual Account</CardTitle>
                <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {addedChannels['virtual-account'].length > 0 ? (
              <div className="space-y-3">
                {addedChannels['virtual-account'].map((channelId: string) => {
                  const channel = getChannelById(channelId, 'virtual-account');
                  if (!channel) return null;
                  
                  return (
                    <div key={channelId} className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                      <ChannelLogo channel={channel} />
                      <div>
                        <p className="font-medium text-sm">{channel.name}</p>
                        <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                        <p className="text-xs text-muted-foreground">Provider: {channel.provider}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No virtual account channels configured
              </div>
            )}
          </CardContent>
        </Card>

        {/* Direct Debit Section */}
        <Card id="direct-debit">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={<ArrowDownToLine size={20} className="text-xl text-gray-600" />}
              />
              <div>
                <CardTitle>Direct Debit</CardTitle>
                <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {addedChannels['direct-debit'].length > 0 ? (
              <div className="space-y-3">
                {addedChannels['direct-debit'].map((channelId: string) => {
                  const channel = getChannelById(channelId, 'direct-debit');
                  if (!channel) return null;
                  
                  return (
                    <div key={channelId} className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                      <ChannelLogo channel={channel} />
                      <div>
                        <p className="font-medium text-sm">{channel.name}</p>
                        <p className="text-xs text-destructive">{channel.setupFeeRate}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No direct debit channels configured
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debit / Credit Card Section */}
        <Card id="debit-credit-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={<CreditCard size={20} className="text-xl text-gray-600" />}
              />
              <div>
                <CardTitle>Debit / Credit Card</CardTitle>
                <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {addedChannels['credit-card'].length > 0 ? (
              <div className="space-y-3">
                {addedChannels['credit-card'].map((channelId: string) => {
                  const channel = getChannelById(channelId, 'credit-card');
                  if (!channel) return null;
                  
                  return (
                    <div key={channelId}>
                      {channelId === 'installment' ? (
                        <div className="space-y-3">
                          <div className="p-4 bg-white border rounded-lg">
                            <p className="font-medium text-sm">{channel.name}</p>
                          </div>
                          <div className="ml-6 space-y-2">
                            {[
                              { months: 1, rate: '1.7% + IDR 5,000' },
                              { months: 3, rate: '1.7% + IDR 5,000' },
                              { months: 6, rate: '1.7% + IDR 5,000' },
                              { months: 12, rate: '1.7% + IDR 5,000' }
                            ].map((installment) => (
                              <div key={installment.months} className="p-3 bg-white border rounded-lg">
                                <p className="text-xs text-muted-foreground">
                                  {installment.months} Month Installment: {installment.rate}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-white border rounded-lg">
                          <p className="font-medium text-sm">{channel.name}</p>
                          <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No credit card payment types configured
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}

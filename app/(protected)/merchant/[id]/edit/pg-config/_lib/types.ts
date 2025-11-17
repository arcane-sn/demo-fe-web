export interface RateData {
  percentagePrice: string;
  fixedPrice: string;
}

export interface RateDataWithVisibility extends RateData {
  showToMerchant: boolean;
}

export interface ChannelData {
  id: string;
  name: string;
  logo: string | null;
  logoColor: string;
  provider: string;
  mdr: RateData;
  providerRate: RateDataWithVisibility;
  merchantRate: RateDataWithVisibility;
  flypayRate: RateDataWithVisibility;
  resellerRate: RateDataWithVisibility;
  salesReferralId: string;
  salesReferralFee: RateData;
  merchantReferralId: string;
  merchantReferralFee: RateData;
}

export interface PaymentMethodSectionProps {
  title: string;
  icon: React.ReactNode;
  channels: ChannelData[];
  onAddChannel: () => void;
  addButtonText?: string;
  availableChannels?: ChannelData[];
  onChannelsSelected?: (selectedChannels: ChannelData[]) => void;
  onEditChannel?: (channelData: ChannelData) => void;
  onDeleteChannel?: (channelData: ChannelData) => void;
}

export type PaymentMethodType = 'ewallet' | 'qr' | 'virtual-account' | 'credit-card';

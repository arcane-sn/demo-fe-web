export interface ChannelDetail {
  category: string;
  channel: string;
  channelMode: string;
  channelBillDescriptor: string;
  minimumAmount: string;
  maximumAmount: string;
  channelCurrency: string;
  settlementDays: string;
}

export interface MDRData {
  mdr: {
    percentagePrice: string;
    fixedPrice: string;
  };
  providerRate: {
    percentagePrice: string;
    fixedPrice: string;
    showToMerchant: boolean;
  };
  merchantRate: {
    percentagePrice: string;
    fixedPrice: string;
    showToMerchant: boolean;
  };
  flypayRate: {
    percentagePrice: string;
    fixedPrice: string;
    showToMerchant: boolean;
  };
  resellerRate: {
    percentagePrice: string;
    fixedPrice: string;
    showToMerchant: boolean;
  };
}

export interface PaymentOption {
  openAmount: boolean;
  fixedAmount: boolean;
  recurring: boolean;
}

export interface Provider {
  provider01: string;
}

export interface SalesReferral {
  salesId: string;
  salesFee: {
    percentagePrice: string;
    fixedPrice: string;
  };
}

export interface MerchantReferral {
  merchantId: string;
  merchantFee: {
    percentagePrice: string;
    fixedPrice: string;
  };
}

export interface ChannelEditState {
  channelName: string;
  channelLogo: string;
  channelDetail: ChannelDetail;
  mdr: MDRData;
  paymentOption: PaymentOption;
  provider: Provider;
  salesReferral: SalesReferral;
  merchantReferral: MerchantReferral;
}

export interface EditChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelData: ChannelEditState;
  onSave?: (channelData: ChannelEditState) => void;
  onReset?: () => void;
}

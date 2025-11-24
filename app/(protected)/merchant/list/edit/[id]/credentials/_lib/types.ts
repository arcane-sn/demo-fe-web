export interface CredentialData {
  clientId: string;
  clientSecret: string;
  isActive: boolean;
}

export interface IpWhitelistItem {
  id: number;
  value: string;
}

export interface CallbackUrls {
  qrisTransaction: string;
  qrisSettlement: string;
  vaTransaction: string;
  vaSettlement: string;
  payoutInquiry: string;
  payoutDisbursement: string;
}

export interface CredentialsFormData {
  credentials: CredentialData;
  ipWhitelist: IpWhitelistItem[];
  callbackUrls: CallbackUrls;
}

export interface CredentialsFormHandlers {
  handleCopy: (text: string) => void;
  handleDeleteIpField: (id: number) => void;
  handleAddIpField: () => void;
  handleIpChange: (id: number, value: string) => void;
  handleCallbackUrlChange: (field: keyof CallbackUrls, value: string) => void;
  handleCredentialStatusChange: (isActive: boolean) => void;
}

export interface CredentialFieldProps {
  label: string;
  value: string;
  onCopy: (text: string) => void;
  className?: string;
}

export interface IpWhitelistItemProps {
  item: IpWhitelistItem;
  index: number;
  onDelete: (id: number) => void;
  onChange: (id: number, value: string) => void;
  canDelete: boolean;
}

export interface CallbackUrlGroupProps {
  title: string;
  fields: {
    key: keyof CallbackUrls;
    label: string;
    value: string;
    onChange: (field: keyof CallbackUrls, value: string) => void;
  }[];
}

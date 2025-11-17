export interface CredentialInfo {
  credentialId: string;
  clientSecret: string;
  publicKey: string;
  status: 'active' | 'inactive';
}

export interface IPWhitelist {
  id: string;
  ipAddress: string;
}

export interface CallbackURL {
  id: string;
  url: string;
}

export interface CallbackURLGroup {
  title: string;
  urls: CallbackURL[];
}

export interface CredentialsData {
  credentials: CredentialInfo;
  ipWhitelist: IPWhitelist[];
  callbackUrls: CallbackURLGroup[];
}

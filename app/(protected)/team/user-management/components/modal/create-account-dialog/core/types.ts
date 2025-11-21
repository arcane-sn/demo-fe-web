export interface GeneralProfileValues {
  userName: string;
  fullName: string;
  dialCode: string;
  phoneNumber: string;
  email: string;
}

export interface AccountRoleValues {
  accessLevel: string;
  role: string;
  asignToMerchant: string;
}

export interface TemporaryPasswordValues {
  passwordField: boolean;
  password: string;
  passwordConfirm: string;
}

export interface CreateAccountFormState {
  generalProfile: GeneralProfileValues;
  accountRole: AccountRoleValues;
  temporaryPassword: TemporaryPasswordValues;
}


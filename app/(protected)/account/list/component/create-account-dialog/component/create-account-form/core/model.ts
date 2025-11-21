export interface CreateAccountFormValues {
  generalProfile: {
    userName: string;
    fullName: string;
    dialCode: string;
    phoneNumber: string;
    email: string;
  };
  accountRole: {
    accessLevel: string;
    role: string;
    asignToMerchant: string;
  };
  temporaryPassword: {
    passwordField: boolean;
    password: string;
    passwordConfirm: string;
  };
}

export interface CreateAccountFormErrors {
  generalProfile?: {
    userName?: string;
    fullName?: string;
    dialCode?: string;
    phoneNumber?: string;
    email?: string;
  };
  accountRole?: {
    accessLevel?: string;
    role?: string;
    asignToMerchant?: string;
  };
  temporaryPassword?: {
    passwordField?: string;
    password?: string;
    passwordConfirm?: string;
  };
}

export interface CreateAccountFormTouched {
  generalProfile?: {
    userName?: boolean;
    fullName?: boolean;
    dialCode?: boolean;
    phoneNumber?: boolean;
    email?: boolean;
  };
  accountRole?: {
    accessLevel?: boolean;
    role?: boolean;
    asignToMerchant?: boolean;
  };
  temporaryPassword?: {
    passwordField?: boolean;
    password?: boolean;
    passwordConfirm?: boolean;
  };
}

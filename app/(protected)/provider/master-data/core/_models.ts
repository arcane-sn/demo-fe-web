export interface ProviderMasterData {
  id: string;
  providerId: string;
  providerName: string;
  providerType: string;
  status: "Active" | "Inactive";
  registeredDate: string;
  registeredTime: string;
  registeredBy: {
    name: string;
    email: string;
    avatar: string;
  };
  updatedDate: string;
  updatedTime: string;
  updatedBy: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface ProviderMasterDataTableConfig {
  showSearch?: boolean;
  showPagination?: boolean;
  showRowCount?: boolean;
  showSelectedCount?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
}

export type IsModalMasterData = {
  edit: boolean;
  create: boolean;
  filter: boolean;
  export: boolean;
  confirmationCreate: boolean;
  hasCreated: boolean;
  confirmationEdit: boolean;
  hasEdited: boolean;
};

export interface MasterDataStoreTypes {
  isModal: IsModalMasterData;
  setIsModal: (value: IsModalMasterData) => void;
  setModal: (key: keyof IsModalMasterData, value: boolean) => void;
  resetModals: () => void;
}

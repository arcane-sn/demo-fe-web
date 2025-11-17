import { ProviderMasterData, ProviderMasterDataTableConfig } from "./_models";

// Mock data for provider master data
export const MOCK_PROVIDER_MASTER_DATA: ProviderMasterData[] = [
  {
    id: "1",
    providerId: "CH-P2025091900001",
    providerName: "PIRO",
    providerType: "VA",
    status: "Active",
    registeredDate: "Thu, Dec 16, 2025",
    registeredTime: "23:12:32 (GMT +7)",
    registeredBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Thu, Dec 16, 2025",
    updatedTime: "23:12:32 (GMT +7)",
    updatedBy: {
      name: "Bicaktiguling",
      email: "bicaktiguling@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "2",
    providerId: "CH-P2025091900002",
    providerName: "TIKU",
    providerType: "BA",
    status: "Inactive",
    registeredDate: "Fri, Jan 14, 2026",
    registeredTime: "14:30:10 (GMT +7)",
    registeredBy: {
      name: "Tiki Taka",
      email: "tiki.taka@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Fri, Jan 14, 2026",
    updatedTime: "14:30:10 (GMT +7)",
    updatedBy: {
      name: "Burticus",
      email: "burticus@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "3",
    providerId: "CH-P2025091900003",
    providerName: "JUMBO",
    providerType: "CA",
    status: "Active",
    registeredDate: "Sat, Feb 20, 2026",
    registeredTime: "07:45:20 (GMT +7)",
    registeredBy: {
      name: "Jumbo Jet",
      email: "jumbo.jet@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Sat, Feb 20, 2026",
    updatedTime: "07:45:20 (GMT +7)",
    updatedBy: {
      name: "Ferrari",
      email: "ferrari@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "4",
    providerId: "CH-P2025091900004",
    providerName: "ZEBRA",
    providerType: "LA",
    status: "Active",
    registeredDate: "Sun, Mar 15, 2026",
    registeredTime: "12:00:00 (GMT +7)",
    registeredBy: {
      name: "Zebra Crossing",
      email: "zebra.crossing@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Sun, Mar 15, 2026",
    updatedTime: "12:00:00 (GMT +7)",
    updatedBy: {
      name: "Panther",
      email: "panther@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "5",
    providerId: "CH-P2025091900005",
    providerName: "EAGLE",
    providerType: "NY",
    status: "Inactive",
    registeredDate: "Mon, Apr 10, 2026",
    registeredTime: "16:20:45 (GMT +7)",
    registeredBy: {
      name: "Eagle Eye",
      email: "eagle.eye@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Mon, Apr 10, 2026",
    updatedTime: "16:20:45 (GMT +7)",
    updatedBy: {
      name: "Falcon",
      email: "falcon@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "6",
    providerId: "CH-P2025091900006",
    providerName: "TIGER",
    providerType: "TX",
    status: "Active",
    registeredDate: "Tue, May 25, 2026",
    registeredTime: "08:15:30 (GMT +7)",
    registeredBy: {
      name: "Tiger Woods",
      email: "tiger.woods@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Tue, May 25, 2026",
    updatedTime: "08:15:30 (GMT +7)",
    updatedBy: {
      name: "Puma",
      email: "puma@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "7",
    providerId: "CH-P2025091900007",
    providerName: "WHALE",
    providerType: "FL",
    status: "Inactive",
    registeredDate: "Wed, Jun 29, 2026",
    registeredTime: "10:00:00 (GMT +7)",
    registeredBy: {
      name: "Whale Song",
      email: "whale.song@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Wed, Jun 29, 2026",
    updatedTime: "10:00:00 (GMT +7)",
    updatedBy: {
      name: "Dolphin",
      email: "dolphin@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "8",
    providerId: "CH-P2025091900008",
    providerName: "LION",
    providerType: "NV",
    status: "Active",
    registeredDate: "Thu, Jul 14, 2026",
    registeredTime: "09:45:12 (GMT +7)",
    registeredBy: {
      name: "Lion Heart",
      email: "lion.heart@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Thu, Jul 14, 2026",
    updatedTime: "09:45:12 (GMT +7)",
    updatedBy: {
      name: "Cheetah",
      email: "cheetah@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "9",
    providerId: "CH-P2025091900009",
    providerName: "FALCON",
    providerType: "BC",
    status: "Inactive",
    registeredDate: "Fri, Aug 12, 2026",
    registeredTime: "18:30:22 (GMT +7)",
    registeredBy: {
      name: "Falcon Crest",
      email: "falcon.crest@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Fri, Aug 12, 2026",
    updatedTime: "18:30:22 (GMT +7)",
    updatedBy: {
      name: "Hawk",
      email: "hawk@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
  {
    id: "10",
    providerId: "CH-P2025091900010",
    providerName: "CROCODILE",
    providerType: "TX",
    status: "Active",
    registeredDate: "Sat, Sep 17, 2026",
    registeredTime: "11:50:55 (GMT +7)",
    registeredBy: {
      name: "Crocodile Rock",
      email: "crocodile.rock@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    updatedDate: "Sat, Sep 17, 2026",
    updatedTime: "11:50:55 (GMT +7)",
    updatedBy: {
      name: "Alligator",
      email: "alligator@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
  },
];

// Table configuration
export const PROVIDER_MASTER_DATA_TABLE_CONFIG: ProviderMasterDataTableConfig =
  {
    showSearch: true,
    showPagination: true,
    showRowCount: true,
    showSelectedCount: true,
    enableSorting: true,
    enableRowSelection: true,
  };

// Search fields configuration
export const PROVIDER_SEARCH_FIELDS: (keyof ProviderMasterData)[] = [
  "providerId",
  "providerName",
  "providerType",
  "status",
];

export const PROVIDER_CREATE_PROVIDER_STEPS = [
  "Provider Information",
  "Provider Credentials",
  "Default Pricing (MDR)",
  "Default Transaction Limit",
];

export const INITIAL_IS_MODAL_MASTER_DATA = {
  filter: false,
  export: false,
  edit: false,
  create: false,
  confirmationCreate: false,
  hasCreated: false,
  confirmationEdit: false,
  hasEdited: false,
};

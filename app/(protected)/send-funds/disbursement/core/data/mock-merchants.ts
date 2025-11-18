// Mock merchant data for disbursement module

export interface Merchant {
  id: string;
  name: string;
  clientId: string;
  activeBalance: string;
  pendingBalance: string;
  holdBalance: string;
  totalBalance: string;
}

// Mock data based on the image - extended for better horizontal scrolling demo
export const mockMerchants: Merchant[] = [
  {
    id: "1",
    name: "PT Teknologi Maju Sejahtera",
    clientId: "UP2025091900002",
    activeBalance: "IDR 12.500.000",
    pendingBalance: "IDR 6.000.000",
    holdBalance: "IDR 1.000.000",
    totalBalance: "IDR 18.500.000"
  },
  {
    id: "2",
    name: "PT Inovasi Digital Abadi",
    clientId: "UP2025091900003",
    activeBalance: "IDR 14.000.000",
    pendingBalance: "IDR 7.500.000",
    holdBalance: "IDR 2.000.000",
    totalBalance: "IDR 21.500.000"
  },
  {
    id: "3",
    name: "PT Solusi Digital Cemerlang",
    clientId: "UP2025091900004",
    activeBalance: "IDR 11.000.000",
    pendingBalance: "IDR 4.500.000",
    holdBalance: "IDR 3.000.000",
    totalBalance: "IDR 15.500.000"
  },
  {
    id: "4",
    name: "PT Digital Inovasi Jaya",
    clientId: "UP2025091900005",
    activeBalance: "IDR 13.000.000",
    pendingBalance: "IDR 8.000.000",
    holdBalance: "IDR 4.000.000",
    totalBalance: "IDR 21.000.000"
  },
  {
    id: "5",
    name: "PT Digital Cerdas Abadi",
    clientId: "UP2025091900006",
    activeBalance: "IDR 9.000.000",
    pendingBalance: "IDR 3.500.000",
    holdBalance: "IDR 5.000.000",
    totalBalance: "IDR 12.500.000"
  },
  {
    id: "6",
    name: "PT Digital Maju Bersama",
    clientId: "UP2025091900007",
    activeBalance: "IDR 15.500.000",
    pendingBalance: "IDR 6.500.000",
    holdBalance: "IDR 1.500.000",
    totalBalance: "IDR 22.000.000"
  },
  {
    id: "7",
    name: "PT Digital Cemerlang Abadi",
    clientId: "UP2025091900008",
    activeBalance: "IDR 10.500.000",
    pendingBalance: "IDR 4.200.000",
    holdBalance: "IDR 2.500.000",
    totalBalance: "IDR 14.700.000"
  },
  {
    id: "8",
    name: "PT Digital Inovasi Sejahtera",
    clientId: "UP2025091900009",
    activeBalance: "IDR 12.000.000",
    pendingBalance: "IDR 5.500.000",
    holdBalance: "IDR 3.500.000",
    totalBalance: "IDR 17.500.000"
  },
  {
    id: "9",
    name: "PT Teknologi Digital Indonesia",
    clientId: "UP2025091900010",
    activeBalance: "IDR 8.500.000",
    pendingBalance: "IDR 2.000.000",
    holdBalance: "IDR 1.500.000",
    totalBalance: "IDR 12.000.000"
  },
  {
    id: "10",
    name: "PT Solusi Teknologi Terdepan",
    clientId: "UP2025091900011",
    activeBalance: "IDR 16.000.000",
    pendingBalance: "IDR 9.000.000",
    holdBalance: "IDR 2.000.000",
    totalBalance: "IDR 27.000.000"
  },
  {
    id: "11",
    name: "PT Inovasi Teknologi Maju",
    clientId: "UP2025091900012",
    activeBalance: "IDR 7.500.000",
    pendingBalance: "IDR 3.000.000",
    holdBalance: "IDR 1.000.000",
    totalBalance: "IDR 11.500.000"
  },
  {
    id: "12",
    name: "PT Digital Solutions Indonesia",
    clientId: "UP2025091900013",
    activeBalance: "IDR 18.000.000",
    pendingBalance: "IDR 10.500.000",
    holdBalance: "IDR 3.500.000",
    totalBalance: "IDR 32.000.000"
  }
];


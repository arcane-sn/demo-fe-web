import { MerchantData } from "../../types/merchant";
import { MerchantReviewData } from "../../review/core/types/merchant-review";
import { BankData } from "../../[id]/edit/core/types/disbursement";

// ============================================================================
// MERCHANT DATA
// ============================================================================

// Single source of truth for all merchant mock data
export const mockMerchants: MerchantData[] = [
  {
    id: "1",
    // Basic Info
    companyName: "PT ABADI JAYA TEKNOLOGI",
    brandName: "Abdi Teh Ayena",
    clientId: "UP20230919000001",

    // Business Profile
    phoneNumber: "+6281234567890",
    email: "business@abadijaya.com",
    businessType: "Small & Micro Business",
    businessIndustry: "Retail & E-commerce",
    website: "https://abadijaya.com",

    // Business Address
    address: "Jl. Doang, Jadlan Kagak 10",
    country: "Indonesia",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    district: "Kebayoran Baru",
    subDistrict: "Senayan",
    postalCode: "123456",
    legalAddressSame: true,

    // Business Characteristics
    businessModel: "B2B (Business-to-Business)",
    corporateTaxType: "Pengusaha Kena Pajak (PKP)",
    currentMonthlySales: 3000000,
    estimatedMonthlySales: 5000000,
    averageEstimatedRevenue: 4000000,
    transferService: true,
    transferUseCase: "Regular Money Transfer",
    transferVolume: "0-500 transaction/month",

    // Bank Information
    bankName: "BCA",
    bankCode: "014",
    accountNumber: "1234567890123456",
    accountName: "WANWAN WAW",

    // PIC Information
    picOwner: {
      fullName: "Wokwaw Waw",
      position: "CEO",
      phoneNumber: "+6281234567890",
      email: "owner@abadijaya.com",
    },
    picBusiness: {
      fullName: "Bicak Tigatiga",
      position: "Head of Business",
      phoneNumber: "+6281234567891",
      email: "business@abadijaya.com",
    },
    picFinance: {
      fullName: "Bolivar Bos",
      position: "Lead of Finance",
      phoneNumber: "+6281234567892",
      email: "finance@abadijaya.com",
    },
    picTechnical: {
      fullName: "Mantab Joe Ganteng",
      position: "Head of Engineering Manager",
      phoneNumber: "+6281234567893",
      email: "technicaleingineering@abadijaya.com",
    },

    // Documents
    documents: {
      businessDocuments: [
        {
          id: "1",
          name: "Akta Pendirian Perusahaan",
          type: "PDF",
          url: "/documents/akta-pendirian.pdf",
          uploadedAt: "2025-09-19T10:30:00Z",
        },
        {
          id: "2",
          name: "NPWP Perusahaan",
          type: "PDF",
          url: "/documents/npwp-perusahaan.pdf",
          uploadedAt: "2025-09-19T10:35:00Z",
        },
      ],
    },

    // Services
    services: {
      serviceType: "Payment Gateway",
      paymentGatewayIntegration: "API Integration",
      disbursementIntegration: "Bank Transfer",
      paymentMethods: {
        eWallet: true,
        dana: true,
        shopeePlay: false,
        qrCode: true,
        qris: true,
        virtualAccount: true,
        vaPermataBank: false,
        vaCimbNiaga: true,
        directDebit: false,
        debitCreditCard: true,
      },
    },

    // Hierarchy
    merchantLevel: {
      level: 0,
      label: "Level 0",
      hasParent: false,
    },
    subMerchants: 0,

    // Others/Branding
    brandColors: {
      primary: "#3B82F6",
      secondary: "#1E40AF",
      accent: "#60A5FA",
      background: "#F8FAFC",
    },
    companyLogo: "/logos/abadijaya.png",
    referralCode: "REF001",
    additionalNotes: "Merchant dengan potensi tinggi",

    // System Info
    activePaymentChannels: 5,
    productionStatus: {
      status: "active",
      label: "Active",
    },
    sandboxStatus: {
      status: "inactive",
      label: "Inactive",
    },
    registeredDate: {
      date: "2025-09-19",
      time: "10:30:00",
      timezone: "GMT +7",
    },
    updatedDate: {
      date: "2025-12-16",
      time: "23:12:32",
      timezone: "GMT +7",
    },

    // Review Status - Key field for filtering
    reviewStatus: "approved" as const,
  },
  {
    id: "2",
    companyName: "PT DIGITAL JAYA ABAD",
    brandName: "DigiStore",
    clientId: "UP2025091900002",
    phoneNumber: "+6281234567891",
    email: "business@digitaljaya.com",
    businessType: "Medium Business",
    businessIndustry: "Technology",
    website: "https://digitaljaya.com",
    address: "Jl. Teknologi No. 123",
    country: "Indonesia",
    province: "DKI Jakarta",
    city: "Jakarta Pusat",
    district: "Menteng",
    subDistrict: "Gondangdia",
    postalCode: "10350",
    legalAddressSame: true,
    businessModel: "B2C (Business-to-Consumer)",
    corporateTaxType: "Pengusaha Kena Pajak (PKP)",
    currentMonthlySales: 15000000,
    estimatedMonthlySales: 25000000,
    averageEstimatedRevenue: 20000000,
    transferService: true,
    transferUseCase: "E-commerce Payment",
    transferVolume: "500-1000 transaction/month",
    bankName: "Mandiri",
    bankCode: "008",
    accountNumber: "9876543210987654",
    accountName: "PT DIGITAL JAYA ABAD",
    picOwner: {
      fullName: "John Doe",
      position: "CEO",
      phoneNumber: "+6281234567891",
      email: "john@digitaljaya.com",
    },
    picBusiness: {
      fullName: "Jane Smith",
      position: "Head of Business",
      phoneNumber: "+6281234567892",
      email: "jane@digitaljaya.com",
    },
    picFinance: {
      fullName: "Bob Johnson",
      position: "CFO",
      phoneNumber: "+6281234567893",
      email: "bob@digitaljaya.com",
    },
    picTechnical: {
      fullName: "Alice Brown",
      position: "CTO",
      phoneNumber: "+6281234567894",
      email: "alice@digitaljaya.com",
    },
    documents: {
      businessDocuments: [
        {
          id: "1",
          name: "Akta Pendirian",
          type: "PDF",
          url: "/documents/akta-digitaljaya.pdf",
          uploadedAt: "2025-12-15T09:00:00Z",
        },
      ],
    },
    services: {
      serviceType: "Payment Gateway",
      paymentGatewayIntegration: "SDK Integration",
      disbursementIntegration: "API Integration",
      paymentMethods: {
        eWallet: true,
        dana: true,
        shopeePlay: true,
        qrCode: true,
        qris: true,
        virtualAccount: true,
        vaPermataBank: true,
        vaCimbNiaga: true,
        directDebit: true,
        debitCreditCard: true,
      },
    },
    merchantLevel: {
      level: 1,
      label: "Level 1",
      hasParent: true,
      parentMerchantId: "1",
    },
    subMerchants: 2,
    brandColors: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#34D399",
      background: "#F0FDF4",
    },
    companyLogo: "/logos/digitaljaya.png",
    referralCode: "REF002",
    additionalNotes: "Tech startup dengan growth tinggi",
    activePaymentChannels: 8,
    productionStatus: {
      status: "active",
      label: "Active",
    },
    sandboxStatus: {
      status: "active",
      label: "Active",
    },
    registeredDate: {
      date: "2025-12-15",
      time: "09:00:00",
      timezone: "GMT +7",
    },
    updatedDate: {
      date: "2025-12-16",
      time: "14:30:00",
      timezone: "GMT +7",
    },
    reviewStatus: "pending-review" as const,
  },
  {
    id: "3",
    companyName: "PT INOVASI TEKNOLOGI",
    brandName: "InovTech",
    clientId: "UP2025091900003",
    phoneNumber: "+6281234567895",
    email: "business@inovtech.com",
    businessType: "Large Business",
    businessIndustry: "Fintech",
    website: "https://inovtech.com",
    address: "Jl. Fintech Tower 88",
    country: "Indonesia",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    district: "Kebayoran Baru",
    subDistrict: "Kramat Pela",
    postalCode: "12110",
    legalAddressSame: true,
    businessModel: "B2B2C (Business-to-Business-to-Consumer)",
    corporateTaxType: "Pengusaha Kena Pajak (PKP)",
    currentMonthlySales: 50000000,
    estimatedMonthlySales: 75000000,
    averageEstimatedRevenue: 62500000,
    transferService: true,
    transferUseCase: "Financial Services",
    transferVolume: "1000+ transaction/month",
    bankName: "BNI",
    bankCode: "009",
    accountNumber: "1111222233334444",
    accountName: "PT INOVASI TEKNOLOGI",
    picOwner: {
      fullName: "Michael Chen",
      position: "CEO",
      phoneNumber: "+6281234567895",
      email: "michael@inovtech.com",
    },
    picBusiness: {
      fullName: "Sarah Wilson",
      position: "Head of Business",
      phoneNumber: "+6281234567896",
      email: "sarah@inovtech.com",
    },
    picFinance: {
      fullName: "David Lee",
      position: "CFO",
      phoneNumber: "+6281234567897",
      email: "david@inovtech.com",
    },
    picTechnical: {
      fullName: "Lisa Zhang",
      position: "CTO",
      phoneNumber: "+6281234567898",
      email: "lisa@inovtech.com",
    },
    documents: {
      businessDocuments: [
        {
          id: "1",
          name: "Akta Pendirian",
          type: "PDF",
          url: "/documents/akta-inovtech.pdf",
          uploadedAt: "2025-12-14T11:00:00Z",
        },
      ],
    },
    services: {
      serviceType: "Payment Gateway + Disbursement",
      paymentGatewayIntegration: "White Label",
      disbursementIntegration: "White Label",
      paymentMethods: {
        eWallet: true,
        dana: true,
        shopeePlay: true,
        qrCode: true,
        qris: true,
        virtualAccount: true,
        vaPermataBank: true,
        vaCimbNiaga: true,
        directDebit: true,
        debitCreditCard: true,
      },
    },
    merchantLevel: {
      level: 2,
      label: "Level 2",
      hasParent: true,
      parentMerchantId: "2",
    },
    subMerchants: 5,
    brandColors: {
      primary: "#8B5CF6",
      secondary: "#7C3AED",
      accent: "#A78BFA",
      background: "#FAF5FF",
    },
    companyLogo: "/logos/inovtech.png",
    referralCode: "REF003",
    additionalNotes: "Fintech leader dengan teknologi terdepan",
    activePaymentChannels: 10,
    productionStatus: {
      status: "active",
      label: "Active",
    },
    sandboxStatus: {
      status: "active",
      label: "Active",
    },
    registeredDate: {
      date: "2025-12-14",
      time: "11:00:00",
      timezone: "GMT +7",
    },
    updatedDate: {
      date: "2025-12-16",
      time: "16:45:00",
      timezone: "GMT +7",
    },
    reviewStatus: "draft" as const,
  },
  {
    id: "4",
    companyName: "PT STARTUP MUDA",
    brandName: "StartupMuda",
    clientId: "UP2025091900004",
    phoneNumber: "+6281234567899",
    email: "business@startupmuda.com",
    businessType: "Small & Micro Business",
    businessIndustry: "E-commerce",
    website: "https://startupmuda.com",
    address: "Jl. Startup Hub 99",
    country: "Indonesia",
    province: "DKI Jakarta",
    city: "Jakarta Timur",
    district: "Cakung",
    subDistrict: "Cakung Timur",
    postalCode: "13910",
    legalAddressSame: true,
    businessModel: "B2C (Business-to-Consumer)",
    corporateTaxType: "Non-PKP",
    currentMonthlySales: 2000000,
    estimatedMonthlySales: 5000000,
    averageEstimatedRevenue: 3500000,
    transferService: false,
    transferUseCase: "N/A",
    transferVolume: "N/A",
    bankName: "BRI",
    bankCode: "002",
    accountNumber: "5555666677778888",
    accountName: "PT STARTUP MUDA",
    picOwner: {
      fullName: "Ahmad Rizki",
      position: "Founder",
      phoneNumber: "+6281234567899",
      email: "ahmad@startupmuda.com",
    },
    picBusiness: {
      fullName: "Siti Nurhaliza",
      position: "Co-Founder",
      phoneNumber: "+6281234567900",
      email: "siti@startupmuda.com",
    },
    picFinance: {
      fullName: "Budi Santoso",
      position: "Finance Manager",
      phoneNumber: "+6281234567901",
      email: "budi@startupmuda.com",
    },
    picTechnical: {
      fullName: "Dewi Lestari",
      position: "Tech Lead",
      phoneNumber: "+6281234567902",
      email: "dewi@startupmuda.com",
    },
    documents: {
      businessDocuments: [
        {
          id: "1",
          name: "Akta Pendirian",
          type: "PDF",
          url: "/documents/akta-startupmuda.pdf",
          uploadedAt: "2025-12-13T15:30:00Z",
        },
      ],
    },
    services: {
      serviceType: "Payment Gateway",
      paymentGatewayIntegration: "API Integration",
      disbursementIntegration: "N/A",
      paymentMethods: {
        eWallet: true,
        dana: false,
        shopeePlay: false,
        qrCode: true,
        qris: true,
        virtualAccount: false,
        vaPermataBank: false,
        vaCimbNiaga: false,
        directDebit: false,
        debitCreditCard: false,
      },
    },
    merchantLevel: {
      level: 0,
      label: "Level 0",
      hasParent: false,
    },
    subMerchants: 0,
    brandColors: {
      primary: "#F59E0B",
      secondary: "#D97706",
      accent: "#FBBF24",
      background: "#FFFBEB",
    },
    companyLogo: "/logos/startupmuda.png",
    referralCode: "REF004",
    additionalNotes: "Startup baru dengan potensi besar",
    activePaymentChannels: 3,
    productionStatus: {
      status: "inactive",
      label: "Inactive",
    },
    sandboxStatus: {
      status: "active",
      label: "Active",
    },
    registeredDate: {
      date: "2025-12-13",
      time: "15:30:00",
      timezone: "GMT +7",
    },
    updatedDate: {
      date: "2025-12-16",
      time: "10:15:00",
      timezone: "GMT +7",
    },
    reviewStatus: "rejected" as const,
  },
];

// ============================================================================
// BANK DATA
// ============================================================================

export const mockBankData: BankData[] = [
  {
    id: "1",
    status: "active",
    bankCode: "008",
    bankName: "Bank Mandiri",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "2",
    status: "active",
    bankCode: "014",
    bankName: "Bank BCA",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "3",
    status: "active",
    bankCode: "009",
    bankName: "Bank BNI",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "4",
    status: "active",
    bankCode: "002",
    bankName: "Bank BRI",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "5",
    status: "active",
    bankCode: "011",
    bankName: "Bank Danamon",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "6",
    status: "active",
    bankCode: "016",
    bankName: "Bank BII",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "7",
    status: "active",
    bankCode: "019",
    bankName: "Bank Panin",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "8",
    status: "active",
    bankCode: "022",
    bankName: "Bank CIMB Niaga",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "9",
    status: "active",
    bankCode: "023",
    bankName: "Bank UOB Indonesia",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
  {
    id: "10",
    status: "active",
    bankCode: "028",
    bankName: "Bank OCBC NISP",
    feeTransfer: "IDR 5.000",
    feeTransferToVA: "IDR 0",
    feeInquiry: "IDR 100",
    feeInquiryToVA: "IDR 0",
    feeRefund: "IDR 4.500",
    minimumTransfer: "IDR 10.000",
    maximumTransfer: "IDR 100.000.000",
    createdDate: "2025-01-15",
  },
];

// Generate more data to reach 52 banks as shown in pagination
export const generateMoreBankData = (): BankData[] => {
  const additionalBanks: BankData[] = [];
  const bankNames = [
    "Bank Permata",
    "Bank Maybank Indonesia",
    "Bank BTPN",
    "Bank Bukopin",
    "Bank Mega",
    "Bank Sinarmas",
    "Bank BCA Syariah",
    "Bank Mandiri Syariah",
    "Bank BNI Syariah",
    "Bank BRI Syariah",
    "Bank Muamalat",
    "Bank Syariah Indonesia",
    "Bank Jateng",
    "Bank Jatim",
    "Bank DKI",
    "Bank Sumut",
    "Bank Kaltim",
    "Bank Sulsel",
    "Bank Papua",
    "Bank NTB",
    "Bank NTT",
    "Bank Aceh",
    "Bank Sumsel",
    "Bank Lampung",
    "Bank Bengkulu",
    "Bank Jambi",
    "Bank Riau",
    "Bank Kepri",
    "Bank Kalbar",
    "Bank Kalteng",
    "Bank Kalsel",
    "Bank Sulut",
    "Bank Sulteng",
    "Bank Sultra",
    "Bank Gorontalo",
    "Bank Maluku",
    "Bank Malut",
    "Bank Papua Barat",
    "Bank Kalimantan Utara",
    "Bank Sulawesi Barat",
    "Bank Bali",
    "Bank Banten",
    "Bank Jawa Barat",
  ];

  bankNames.forEach((name, index) => {
    additionalBanks.push({
      id: `${11 + index}`,
      status: "active",
      bankCode: `${100 + index}`.padStart(3, "0"),
      bankName: name,
      feeTransfer: "IDR 5.000",
      feeTransferToVA: "IDR 0",
      feeInquiry: "IDR 100",
      feeInquiryToVA: "IDR 0",
      feeRefund: "IDR 4.500",
      minimumTransfer: "IDR 10.000",
      maximumTransfer: "IDR 100.000.000",
      createdDate: "2025-01-15",
    });
  });

  return additionalBanks;
};

export const allBankData = [...mockBankData, ...generateMoreBankData()];

// ============================================================================
// CHANNEL DATA
// ============================================================================

export interface Channel {
  id: string;
  name: string;
  setupFeeRate: string;
  provider: string;
  logo: string;
  logoColor: string;
}

export type ChannelType =
  | "ewallet"
  | "qr"
  | "virtual-account"
  | "direct-debit"
  | "credit-card";

export const channelData: Record<ChannelType, Channel[]> = {
  ewallet: [
    {
      id: "dana",
      name: "Dana",
      setupFeeRate: "1.35%",
      provider: "Upay",
      logo: "/media/chanels/dana.png",
      logoColor: "bg-blue-600",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      setupFeeRate: "1.7%",
      provider: "Upay",
      logo: "/media/chanels/shopeepay.png",
      logoColor: "bg-orange-500",
    },
    {
      id: "ovo",
      name: "OVO",
      setupFeeRate: "1.35%",
      provider: "Upay",
      logo: "OVO",
      logoColor: "bg-purple-600",
    },
  ],
  qr: [
    {
      id: "qris",
      name: "QRIS",
      setupFeeRate: "0.7%",
      provider: "HLA Cash",
      logo: "/media/chanels/qris.png",
      logoColor: "bg-red-600",
    },
  ],
  "virtual-account": [
    {
      id: "permata",
      name: "VA Permata Bank",
      setupFeeRate: "1.3%",
      provider: "Permata",
      logo: "/media/chanels/permata.png",
      logoColor: "bg-green-600",
    },
    {
      id: "cimb",
      name: "VA CIMB Niaga",
      setupFeeRate: "1.7%",
      provider: "User",
      logo: "/media/chanels/cimb.png",
      logoColor: "bg-red-700",
    },
  ],
  "direct-debit": [
    // Add direct debit channels here when available
  ],
  "credit-card": [
    {
      id: "regular",
      name: "Regular",
      setupFeeRate: "1.7% + IDR 5,000",
      provider: "Card Provider",
      logo: "",
      logoColor: "",
    },
    {
      id: "recurring",
      name: "Recurring",
      setupFeeRate: "1.7% + IDR 5,000",
      provider: "Card Provider",
      logo: "",
      logoColor: "",
    },
    {
      id: "installment",
      name: "Installment",
      setupFeeRate: "1.7% + IDR 5,000",
      provider: "Card Provider",
      logo: "",
      logoColor: "",
    },
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Merchant helper functions
export const getMerchantsByStatus = (status: string): MerchantData[] => {
  return mockMerchants.filter((merchant) => merchant.reviewStatus === status);
};

export const getMerchantsForReview = (): MerchantData[] => {
  return mockMerchants.filter((merchant) =>
    ["draft", "pending-review", "approved", "rejected"].includes(
      merchant.reviewStatus
    )
  );
};

export const getMerchantsForList = (): MerchantData[] => {
  return mockMerchants.filter(
    (merchant) => merchant.reviewStatus === "approved"
  );
};

export const getMerchantById = (id: string): MerchantData | undefined => {
  return mockMerchants.find((merchant) => merchant.id === id);
};

export const getMerchantsByLevel = (level: number): MerchantData[] => {
  return mockMerchants.filter(
    (merchant) => merchant.merchantLevel.level === level
  );
};

export const getSubMerchants = (parentId: string): MerchantData[] => {
  return mockMerchants.filter(
    (merchant) => merchant.merchantLevel.parentMerchantId === parentId
  );
};

export const getMerchantReviewsByTab = (tabId: string): MerchantData[] => {
  switch (tabId) {
    case "new-merchant":
      return mockMerchants.filter(
        (merchant) =>
          merchant.reviewStatus === "pending-review" ||
          merchant.reviewStatus === "draft"
      );
    case "merchant-adjustment":
      return mockMerchants.filter(
        (merchant) =>
          merchant.reviewStatus === "approved" ||
          merchant.reviewStatus === "rejected"
      );
    default:
      return mockMerchants;
  }
};

// Convert MerchantData to MerchantReviewData format
const convertToReviewData = (merchant: MerchantData): MerchantReviewData => ({
  id: merchant.id,
  companyName: merchant.companyName,
  brandName: merchant.brandName,
  clientId: merchant.clientId,
  reviewStatus: merchant.reviewStatus,
  createdDate: {
    date: merchant.registeredDate.date,
    time: merchant.registeredDate.time,
    timezone: merchant.registeredDate.timezone,
  },
  createdBy: {
    name: merchant.picOwner.fullName,
    email: merchant.picOwner.email,
    avatar: "/avatars/default.jpg",
  },
  merchantLevel: {
    level: merchant.merchantLevel.level,
    label: merchant.merchantLevel.label,
  },
  paymentChannels: merchant.activePaymentChannels,
  submittedAt:
    merchant.updatedDate.date + "T" + merchant.updatedDate.time + "Z",
});

export const getMerchantReviewsByTabForReview = (
  tabId: string
): MerchantReviewData[] => {
  const merchantData = getMerchantReviewsByTab(tabId);
  return merchantData.map(convertToReviewData);
};

// Channel helper functions
export const getChannelsByType = (type: ChannelType): Channel[] => {
  return channelData[type] || [];
};

// Bank helper functions
export const getBanksByStatus = (status: string): BankData[] => {
  return allBankData.filter((bank) => bank.status === status);
};

export const getBankById = (id: string): BankData | undefined => {
  return allBankData.find((bank) => bank.id === id);
};

export const getBanksByCode = (code: string): BankData | undefined => {
  return allBankData.find((bank) => bank.bankCode === code);
};

// ============================================================================
// MOCK DATA SERVICE - Centralized Mock Data Service
// ============================================================================

/**
 * Mock Activity Data
 */
export const getMockActivityData = () => ({
  logs: [
    {
      id: "1",
      timestamp: "2024-01-15 10:30:25",
      action: "Login",
      description: "User logged in successfully",
      user: "admin@merchant.com",
      ipAddress: "192.168.1.100",
      status: "success" as const,
    },
    {
      id: "2",
      timestamp: "2024-01-15 10:25:15",
      action: "Update Profile",
      description: "Merchant profile information updated",
      user: "admin@merchant.com",
      ipAddress: "192.168.1.100",
      status: "success" as const,
    },
    {
      id: "3",
      timestamp: "2024-01-15 10:20:45",
      action: "API Call",
      description: "Payment gateway API integration test",
      user: "system",
      ipAddress: "10.0.0.1",
      status: "failed" as const,
    },
    {
      id: "4",
      timestamp: "2024-01-15 10:15:30",
      action: "Transaction",
      description: "New payment transaction processed",
      user: "system",
      ipAddress: "10.0.0.1",
      status: "success" as const,
    },
    {
      id: "5",
      timestamp: "2024-01-15 10:10:20",
      action: "Logout",
      description: "User logged out",
      user: "admin@merchant.com",
      ipAddress: "192.168.1.100",
      status: "success" as const,
    },
  ],
  totalCount: 5,
  currentPage: 1,
  pageSize: 10,
});

/**
 * Mock Credentials Data
 */
export const getMockCredentialsData = () => ({
  credentials: {
    credentialId: "PGCRD_UUID123",
    clientSecret: "UP12920398747",
    publicKey: "skdasp123iolkc209f0sd",
    status: "active" as const,
  },
  ipWhitelist: [
    {
      id: "ip1",
      ipAddress: "203.0.113.45",
    },
    {
      id: "ip2",
      ipAddress: "203.0.113.45",
    },
  ],
  callbackUrls: [
    {
      title: "QRIS URL Callback",
      urls: [
        {
          id: "QRIS Transactions",
          url: "https://upay.free.test.com/pay-in-stg",
        },
        {
          id: "QRIS Settlement",
          url: "https://upay.free.test.com/pay-in-stg",
        },
      ],
    },
    {
      title: "VA URL Callback",
      urls: [
        {
          id: "VA Transactions",
          url: "https://upay.free.test.com/pay-in-stg",
        },
        {
          id: "VA Settlement",
          url: "https://upay.free.test.com/pay-in-stg",
        },
      ],
    },
  ],
});

/**
 * Mock Hierarchy Data
 */
export const getMockHierarchyData = () => ({
  merchantLevelInfo: {
    merchantLevel: "Level 1 (Parent Merchant)",
    parentMerchantId: "UPP12380484",
    parentMerchant: "PT KITA BERJAYA SINERGI",
    parentMerchantLevel: "Level 0 (Grand-Parent Merchant)",
  },
  hierarchy: [
    {
      id: "1",
      name: "PT ABADI JAYA TEKNOLOGI",
      clientId: "UP12920398747",
      level: 1,
      icon: {
        type: "circle" as const,
        color: "blue",
      },
      children: [
        {
          id: "1.1",
          name: "PT JAYA JAYA JAYA",
          clientId: "UP12920398747",
          level: 2,
          icon: {
            type: "circle" as const,
            color: "orange",
          },
          children: [
            {
              id: "1.1.1",
              name: "Smart Market",
              clientId: "UP12920398747",
              level: 3,
              icon: {
                type: "square" as const,
                color: "red",
                letter: "S",
              },
            },
          ],
        },
      ],
    },
  ],
});

/**
 * Mock Others Data
 */
export const getMockOthersData = () => ({
  branding: {
    companyLogo: {
      id: "1",
      name: "company-logo.svg",
      url: "/media/brand-logos/logo-1.svg",
      dataURL:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMxQjg0RkYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzE3LjUyMjg1IDIgMjIgNi40NzcxNSAyMiAxMkMyMiAxNy41MjI4IDE3LjUyMjg1IDIyIDEyIDIyQzYuNDc3MTUgMjIgMiAxNy41MjI4IDIgMTJDMiA2LjQ3NzE1IDYuNDc3MTUgMiAxMiAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=",
    },
    brandColors: {
      primary: "#1B84FF",
      secondary: "#F9F9F9",
      accent: "#1B84FF",
      background: "#FFFFFF",
    },
  },
  additionalNotes: {
    notes:
      "Lorem ipsum dolor sit amet consectetur. Cursus gravida sed dignissim cursus turpis ut. Lectus facilisis volutpat venenatis odio fusce adipiscing justo pharetra. Commodo vitae commodo sit amet commodo pellentesque molestie egestas volutpat. Id non convallis pharetra in orci elit pharetra pretium.",
  },
});

/**
 * Mock Metrics Data
 */
export const getMockMetricsData = () => ({
  totalTransactionAmount: "624.000",
  totalTransactionVolume: "IDR 369.000.000",
  totalMDR: "IDR 60.700.000",
});

/**
 * Centralized Mock Data Service
 * Single source of truth for all mock data operations
 */
export class MockDataService {
  /**
   * Get merchant by ID
   */
  static async getMerchantById(id: string): Promise<MerchantData | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getMerchantById(id) ?? null;
  }

  /**
   * Get activity data
   */
  static async getActivityData(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockActivityData();
  }

  /**
   * Get credentials data
   */
  static async getCredentialsData(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockCredentialsData();
  }

  /**
   * Get hierarchy data
   */
  static async getHierarchyData(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockHierarchyData();
  }

  /**
   * Get others data
   */
  static async getOthersData(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockOthersData();
  }

  /**
   * Get metrics data
   */
  static async getMetricsData(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getMockMetricsData();
  }
}

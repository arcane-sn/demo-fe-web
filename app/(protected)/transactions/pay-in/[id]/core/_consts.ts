import {
  TransactionDetail,
  ApiResponseData,
  PaymentReceiptData,
  StatusHistoryItem,
} from "./_models";

export const MOCK_TRANSACTION_DETAIL: TransactionDetail = {
  id: "Trx-1209123asdkj12038",
  orderId: "Or-209123asdkj12038",
  externalId: "EX-209123asdkj12038",
  receiptNo: "929329381012",
  approvalCode: "1231929",
  acquirerTransactionId: "acqu9121101212",
  activitySource: "Payment Gateway",
  billingAmount: 10054000,
  billingName: "John Doe",
  paymentMethod: "QR Code",
  status: "Paid",
  transactionDate: "Thu, Dec 16, 2025",
  transactionTime: "23:12:32 (GMT +7)",
  paidDate: "Thu, Dec 16, 2025",
  paidTime: "23:12:32 (GMT +7)",
  expirationDate: "Thu, Dec 16, 2026",
  expirationTime: "23:12:32 (GMT +7)",
  amount: 10000000,
  serviceFee: 4000,
  mdr: 50000,
  totalAmount: 10054000,
  channel: "BRICC",
  channelMid: "1203122323",
  paymentMode: "CLOSE",
  tenorMonths: "-",
  typeOfCard: "OFF US",
  clientId: "Trx-1209123asdkj12038",
  merchantName: "PT Abadi Jaya Teknologi",
  parentId: "UP-21234901239",
  channelType: "Aggregator",
  billName: "John Doe",
  email: "johndoe@gmail.com",
  phoneNumber: "081234567890",
  description: "Order 09120391823885734032",
  billingType: "Regular",
  source: "card-service",
  sourcePG: "Flypay PG",
  bankName: "ACB",
  bankCountry: "INA",
  statusHistory: [
    {
      status: "Disbursed",
      date: "10 Mar 2026, 12:49:28",
      badge: "Disbursed",
      badgeType: "primary",
      description: "Sent to beneficiary account",
      note: "description",
      hasDetail: true,
      detailText: "Disbursed Detail",
    },
    {
      status: "Paid",
      date: "8 Mar 2026, 12:49:28",
      badge: "Paid",
      badgeType: "success",
      description: "Transaction success",
      note: "description",
      hasDetail: false,
    },
    {
      status: "Request",
      date: "8 Mar 2026, 12:49:28",
      badge: "Request",
      badgeType: "warning",
      description: "Request transaction",
      note: "description",
      hasDetail: false,
    },
    {
      status: "Invoice Created",
      date: "8 Mar 2026, 12:49:28",
      badge: "Approved",
      badgeType: "info",
      description: "Invoice Created",
      note: "Inv-oasodidjwqldke",
      hasDetail: true,
      detailText: "Invoice Detail",
    },
  ],
};

export const BADGE_VARIANT_MAP = {
  success: "success",
  primary: "primary",
  warning: "warning",
  info: "info",
  secondary: "secondary",
} as const;

// Badge Styles Helper
export const getBadgeStyles = (badgeType: StatusHistoryItem["badgeType"]) => {
  switch (badgeType) {
    case "primary":
      return {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-500",
        dot: "bg-blue-500",
      };
    case "success":
      return {
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-500",
        dot: "bg-green-500",
      };
    case "warning":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        text: "text-yellow-500",
        dot: "bg-yellow-500",
      };
    case "info":
      return {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-500",
        dot: "bg-blue-500",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-500",
        text: "text-gray-500",
        dot: "bg-gray-500",
      };
  }
};

// Modal Response Code constants
export const DEFAULT_RESPONSE_DATA: ApiResponseData = {
  responseCode: 200,
  responseMessage: "Merchant profiles retrieved successfully.",
  data: [
    {
      merchantId: "UP2025091900001",
      parentMerchantId: "par12345",
      status: "Active",
      businessProfile: {
        companyName: "PT Digital Jaya Abadi",
        brandName: "DigiStore",
        merchantPhoneNumber: "+6281234567890",
        merchantEmail: "contact@digistore.com",
        merchantIndustry: "Retail & E-commerce",
        merchantWebsite: "https://www.digistore.com",
        merchantLogo: "logo.png",
        merchantAddress: "Jl. Gotham City 10 AB",
      },
      detailAddress: {
        country: "Indonesia",
        province: "DKI Jakarta",
        city: "Kota Jakarta Selatan",
        district: "Kebayoran Baru",
        village: "Senayan",
        postalCode: "12190",
      },
      merchantCharacteristics: {
        businessModel: "list",
        corporateTaxType: "list",
        currentMonthlySales: 500000000,
        estimatedMonthlySales: 1000000000,
        averageEstimatedRevenue: 300000000,
        transferService: true,
        transferUseCase: "Payroll",
        transferVolume: ">25.000",
      },
      bankInformation: {
        accountNumber: "8876543210",
        bankCode: "014",
        accountName: "Jotaro Kujo",
      },
      pic: [
        {
          fullName: "Citra Lestari",
          email: "citra.l@digistore.com",
          phoneNumber: "+6281122334455",
          role: "Business",
        },
      ],
      legalDocument: {
        sharedFolderLink: "https://folder-link.com",
        ktp: true,
        npwp: true,
        nib: true,
        aktaPendirian: true,
        aktaPerubahan: true,
        skMenkeh: true,
        siup: true,
      },
      products: {
        payIn: {
          paymentChannel: {
            ewallet: {
              dana: true,
              shopeepay: false,
            },
            qris: {
              inacash: true,
            },
          },
        },
        payOut: true,
      },
      hierarchy: {
        businessLevel: 1,
        parentClientId: "par12345",
        subClientId: ["sub12345", "sub09876"],
      },
      additionalInfo: {
        notes: "abc",
      },
      credentials: {
        credentialId: "CRD_AUTO_GEN_ID_1",
      },
      balance: {
        stage: "IDR 1,000,000,000",
        production: "IDR 0",
      },
      pricing: {
        pricingId: "PRICING_AUTO_GEN_ID_1",
      },
      createdAt: "2025-09-21T00:33:00+07:00",
      createdBy: "Super Admin",
      updatedAt: null,
      updatedBy: null,
    },
  ],
  pagination: {
    totalRecords: 100,
    currentPage: 1,
    totalPages: 5,
    nextPage: 2,
  },
};

// Modal configuration
export const MODAL_CONFIG = {
  maxWidth: "max-w-2xl",
  maxHeight: "max-h-[90vh]",
  contentHeight: "h-[60vh]",
  defaultTitle: "Response Code",
} as const;

// Payment Receipt constants
export const DEFAULT_PAYMENT_RECEIPT_DATA: PaymentReceiptData = {
  successMessage: "Thank You! Payment Success!",
  transactionDate: "Tue, Apr 29, 2025, 20:11 (GMT+7)",
  transactionDetails: {
    orderId: "OR-1209123asdkj12038",
    transactionId: "Trx-1209123asdkj12038",
    transactionAmount: "IDR 10.054.000",
    transactionDate: "Tue, Apr 29, 2025, 20:11 (GMT+7)",
    email: "johndoe@gmail.com",
    phoneNumber: "081234567890",
    approvalCode: "1231929",
    bankName: "ACB",
    bankCountry: "INA",
  },
  merchantDetails: {
    merchantName: "PT Abadi Jaya Teknologi",
    email: "abadijaya@abadi.com",
    website: "abadijaya.com",
    address:
      "Jl. Doang, Jadian Kagak 10, Senayan, Kebayoran Baru, Jakarta Selatan",
  },
};

// Payment Receipt Modal configuration
export const PAYMENT_RECEIPT_MODAL_CONFIG = {
  maxWidth: "max-w-2xl",
  maxHeight: "max-h-[90vh]",
  defaultTitle: "Payment Receipt",
} as const;


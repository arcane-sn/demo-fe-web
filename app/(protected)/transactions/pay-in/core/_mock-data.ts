import { PayInTransaction, PaymentStatus } from "./_models";

/**
 * Helper function to generate complete transaction data with all fields
 */
function createTransaction(
  id: string,
  transactionDate: string,
  transactionTime: string,
  merchantName: string,
  clientId: string,
  paymentStatus: PaymentStatus,
  paymentMethod: string,
  paymentChannel: string,
  providerName: string,
  amount: number,
  options?: {
    // VA specific fields
    vaNumber?: string;
    vaId?: string;
    vaType?: string;
    vaStatus?: string;
    bankName?: string;
    // QRIS specific fields
    channel?: string;
    issuingBank?: string;
    acquirerBank?: string;
    acquirerRefNumber?: string;
    // Common date fields
    createdDate?: string;
    expiryDate?: string;
    lastUpdatedDate?: string;
  }
): PayInTransaction {
  const baseId = id.padStart(4, "0");
  const refBase = baseId.slice(0, 3);
  
  // Generate dates if not provided
  const createdDate = options?.createdDate || transactionDate;
  const expiryDate = options?.expiryDate || transactionDate;
  const lastUpdatedDate = options?.lastUpdatedDate || transactionDate;

  // Generate VA fields if payment channel is VA
  const isVA = paymentChannel.includes("VA");
  const vaNumber = options?.vaNumber || (isVA ? `999232329911${baseId}` : undefined);
  const vaId = options?.vaId || (isVA ? `121399923232999${baseId.slice(0, 1)}` : undefined);
  const vaType = options?.vaType || (isVA ? "Open VA" : undefined);
  const vaStatus = options?.vaStatus || (isVA ? "Active" : undefined);
  const bankName = options?.bankName || (isVA ? paymentChannel : undefined);

  // Generate QRIS fields if payment channel is QRIS
  const isQRIS = paymentChannel === "QRIS";
  const channel = options?.channel || (isQRIS ? "QRIS" : undefined);
  const issuingBank = options?.issuingBank || (isQRIS ? "Nobu" : undefined);
  const acquirerBank = options?.acquirerBank || (isQRIS ? "PIYE" : undefined);
  const acquirerRefNumber = options?.acquirerRefNumber || (isQRIS ? `999232329911${baseId}` : undefined);

  return {
    id,
    transactionDate,
    transactionTime,
    merchantName,
    clientId,
    referenceNumber: `RN${refBase}${refBase}${refBase}-${baseId.slice(2, 4)}`,
    partnerReferenceNumber: `PRN${refBase}${refBase}${refBase}-${baseId.slice(2, 4)}`,
    providerRefNumber: `PRY-${refBase}-${baseId.slice(1, 4)}-${baseId.slice(2, 5)}`,
    paymentStatus,
    activity: "Payment Gateway",
    activityId: `PG-${refBase}${refBase}${refBase}-${baseId.slice(2, 4)}`,
    paymentMethod,
    paymentChannel,
    providerName,
    amount,
    mdr: {
      value: Math.round(amount * 0.015 + 5000),
      breakdown: "(1.5% + IDR 5,000)",
    },
    providerRate: {
      value: Math.round(amount * 0.005),
      breakdown: "(0.5% + IDR 0)",
    },
    merchantRate: {
      value: Math.round(amount * 0.03 + 10000),
      breakdown: "(3% + IDR 10,000)",
    },
    flypayRate: {
      value: 10000,
      breakdown: "(0% + IDR 0)",
    },
    resellerRate: {
      value: amount > 500000 ? 50000 : null,
      breakdown: amount > 500000 ? "(0% + IDR 0)" : null,
    },
    merchantReferralFee: {
      value: 5000,
      breakdown: "(0% + IDR 0)",
    },
    salesReferralFee: {
      value: 10000,
      breakdown: "(0% + IDR 0)",
    },
    customerEmail: `wakwaw@gmail.com`,
    customerPhone: `081234567890`,
    // VA specific fields
    vaNumber,
    vaId,
    vaType,
    vaStatus,
    bankName,
    // QRIS specific fields
    channel,
    issuingBank,
    acquirerBank,
    acquirerRefNumber,
    // Common date fields
    createdDate,
    expiryDate,
    lastUpdatedDate,
  };
}

/**
 * Complete mock data for Pay-In transactions
 * Includes all payment methods: e-Wallet, Credit Card, Bank Transfer, QR Code, Virtual Account
 * Includes all required fields including VA and QRIS specific fields
 */
export const MOCK_PAY_IN_TRANSACTIONS: PayInTransaction[] = [
  // ========== VA (Virtual Account) Transactions ==========
  {
    ...createTransaction(
      "1",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991111",
        vaId: "1213999232329991",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "2",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Request",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991112",
        vaId: "1213999232329992",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
    paymentStatus: "Pending" as PaymentStatus,
  },
  {
    ...createTransaction(
      "3",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991113",
        vaId: "1213999232329993",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "4",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991114",
        vaId: "1213999232329994",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "5",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991115",
        vaId: "1213999232329995",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "6",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991116",
        vaId: "1213999232329996",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "7",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991117",
        vaId: "1213999232329997",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "8",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991118",
        vaId: "1213999232329998",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "9",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "Virtual Account",
      "BCA VA",
      "RYE",
      2500000,
      {
        vaNumber: "99923232991119",
        vaId: "1213999232329999",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BCA VA",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },

  // ========== QRIS (QR Code) Transactions ==========
  {
    ...createTransaction(
      "10",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991111",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "11",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Request",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991112",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
    paymentStatus: "Pending" as PaymentStatus,
  },
  {
    ...createTransaction(
      "12",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991113",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "13",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991114",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "14",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991115",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "15",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991116",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "16",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991117",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "17",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991118",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "18",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991119",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "19",
      "Thu, Dec 16, 2025",
      "23:12:32 (GMT +7)",
      "DigiStore",
      "UP2025091900001",
      "Success",
      "QR Code",
      "QRIS",
      "RYE",
      2500000,
      {
        channel: "QRIS",
        issuingBank: "Nobu",
        acquirerBank: "PIYE",
        acquirerRefNumber: "99923232991120",
        createdDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        expiryDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
        lastUpdatedDate: "Thu, Dec 16, 2025 23:12:32 (GMT +7)",
      }
    ),
  },

  // ========== Additional Mixed Transactions ==========
  // e-Wallet transactions
  createTransaction("20", "Mon, Dec 01, 2025", "09:15:22 (GMT +7)", "DigiStore", "UP2025091900001", "Success", "e-Wallet", "DANA", "RYE", 250000),
  createTransaction("21", "Mon, Dec 01, 2025", "10:30:45 (GMT +7)", "DigiStore", "UP2025091900001", "Success", "e-Wallet", "OVO", "RYE", 500000),
  createTransaction("22", "Mon, Dec 01, 2025", "14:22:18 (GMT +7)", "DigiStore", "UP2025091900001", "Pending", "e-Wallet", "GoPay", "Midtrans", 750000),
  createTransaction("23", "Tue, Dec 02, 2025", "11:45:33 (GMT +7)", "DigiStore", "UP2025091900001", "Success", "e-Wallet", "ShopeePay", "Xendit", 300000),
  createTransaction("24", "Tue, Dec 02, 2025", "16:20:10 (GMT +7)", "DigiStore", "UP2025091900001", "Failed", "e-Wallet", "LinkAja", "Doku", 1200000),

  // Credit Card transactions
  createTransaction("25", "Wed, Dec 03, 2025", "08:30:15 (GMT +7)", "TechMart", "UP2025091900002", "Success", "Credit Card", "BRICC", "RYE", 2000000),
  createTransaction("26", "Wed, Dec 03, 2025", "13:15:42 (GMT +7)", "TechMart", "UP2025091900002", "Success", "Credit Card", "CIMBPG", "Midtrans", 1500000),
  createTransaction("27", "Wed, Dec 03, 2025", "17:50:28 (GMT +7)", "TechMart", "UP2025091900002", "Pending", "Credit Card", "BRICC", "Xendit", 3000000),
  createTransaction("28", "Thu, Dec 04, 2025", "09:25:55 (GMT +7)", "TechMart", "UP2025091900002", "Success", "Credit Card", "CIMBPG", "RYE", 1800000),
  createTransaction("29", "Thu, Dec 04, 2025", "15:40:12 (GMT +7)", "TechMart", "UP2025091900002", "Pending", "Credit Card", "BRICC", "Doku", 2200000),

  // Bank Transfer transactions
  createTransaction("30", "Fri, Dec 05, 2025", "10:10:30 (GMT +7)", "FashionHub", "UP2025091900003", "Success", "Bank Transfer", "BCA", "RYE", 800000),
  createTransaction("31", "Fri, Dec 05, 2025", "12:35:48 (GMT +7)", "FashionHub", "UP2025091900003", "Success", "Bank Transfer", "Mandiri", "Midtrans", 950000),
  createTransaction("32", "Fri, Dec 05, 2025", "18:20:15 (GMT +7)", "FashionHub", "UP2025091900003", "Pending", "Bank Transfer", "BNI", "Xendit", 1100000),
  createTransaction("33", "Sat, Dec 06, 2025", "11:55:22 (GMT +7)", "FashionHub", "UP2025091900003", "Success", "Bank Transfer", "BCA", "Doku", 650000),
  createTransaction("34", "Sat, Dec 06, 2025", "14:30:40 (GMT +7)", "FashionHub", "UP2025091900003", "Failed", "Bank Transfer", "Mandiri", "RYE", 1300000),

  // More VA transactions with different banks
  {
    ...createTransaction(
      "35",
      "Tue, Dec 09, 2025",
      "10:20:12 (GMT +7)",
      "BookStore",
      "UP2025091900005",
      "Success",
      "Virtual Account",
      "Mandiri VA",
      "Midtrans",
      550000,
      {
        vaNumber: "99923232991201",
        vaId: "1213999232329001",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "Mandiri VA",
        createdDate: "Tue, Dec 09, 2025 10:20:12 (GMT +7)",
        expiryDate: "Tue, Dec 09, 2025 10:20:12 (GMT +7)",
        lastUpdatedDate: "Tue, Dec 09, 2025 10:20:12 (GMT +7)",
      }
    ),
  },
  {
    ...createTransaction(
      "36",
      "Tue, Dec 09, 2025",
      "17:30:55 (GMT +7)",
      "BookStore",
      "UP2025091900005",
      "Pending",
      "Virtual Account",
      "BNI VA",
      "Xendit",
      600000,
      {
        vaNumber: "99923232991202",
        vaId: "1213999232329002",
        vaType: "Open VA",
        vaStatus: "Active",
        bankName: "BNI VA",
        createdDate: "Tue, Dec 09, 2025 17:30:55 (GMT +7)",
        expiryDate: "Tue, Dec 09, 2025 17:30:55 (GMT +7)",
        lastUpdatedDate: "Tue, Dec 09, 2025 17:30:55 (GMT +7)",
      }
    ),
  },
];


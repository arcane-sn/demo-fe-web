import { BalanceRequestData } from "../_model";

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "IDR ");
};

// Helper function to create currency object
const createCurrencyObject = (amount: number) => ({
  amount,
  currency: "IDR",
  formatted: formatCurrency(amount),
});

// Helper function to create user abbreviation
const createUserAbbreviation = (username: string): string => {
  return username
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Mock data for balance requests
export const mockBalanceRequestData: BalanceRequestData[] = [
  {
    id: "1",
    lastActivityDate: {
      date: "2024-01-15",
      time: "14:30:25",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "MetroMart",
    clientId: "UP12920398747",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(50000000),
    balanceBefore: createCurrencyObject(100000000),
    balanceAfter: createCurrencyObject(150000000),
    notesReason: "Monthly top up for merchant operations",
    requestedBy: {
      username: "John Doe",
      email: "john.doe@metromart.com",
      abbreviation: createUserAbbreviation("John Doe"),
    },
    reviewerUser: null,
  },
  {
    id: "2",
    lastActivityDate: {
      date: "2024-01-15",
      time: "16:45:12",
      timezone: "WIB",
    },
    status: {
      status: "approved",
      label: "Approved",
    },
    merchantName: "ShopeePay",
    clientId: "UP98765432109",
    activityType: {
      type: "hold",
      label: "Hold",
    },
    activityAmount: createCurrencyObject(25000000),
    balanceBefore: createCurrencyObject(150000000),
    balanceAfter: createCurrencyObject(125000000),
    notesReason: "Settlement withdrawal request",
    requestedBy: {
      username: "Jane Smith",
      email: "jane.smith@shopeepay.com",
      abbreviation: createUserAbbreviation("Jane Smith"),
    },
    reviewerUser: {
      username: "Admin User",
      email: "admin@flypay.com",
      abbreviation: createUserAbbreviation("Admin User"),
    },
  },
  {
    id: "3",
    lastActivityDate: {
      date: "2024-01-14",
      time: "09:15:33",
      timezone: "WIB",
    },
    status: {
      status: "rejected",
      label: "Rejected",
    },
    merchantName: "GoPay",
    clientId: "UP45678912345",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(75000000),
    balanceBefore: createCurrencyObject(200000000),
    balanceAfter: createCurrencyObject(200000000),
    notesReason: "Manual balance adjustment for reconciliation",
    requestedBy: {
      username: "Mike Johnson",
      email: "mike.johnson@gopay.com",
      abbreviation: createUserAbbreviation("Mike Johnson"),
    },
    reviewerUser: {
      username: "Reviewer Admin",
      email: "reviewer@flypay.com",
      abbreviation: createUserAbbreviation("Reviewer Admin"),
    },
  },
  {
    id: "4",
    lastActivityDate: {
      date: "2024-01-14",
      time: "11:22:45",
      timezone: "WIB",
    },
    status: {
      status: "processing",
      label: "Processing",
    },
    merchantName: "DANA",
    clientId: "UP78912345678",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(30000000),
    balanceBefore: createCurrencyObject(80000000),
    balanceAfter: createCurrencyObject(110000000),
    notesReason: "Emergency top up for merchant",
    requestedBy: {
      username: "Sarah Wilson",
      email: "sarah.wilson@dana.com",
      abbreviation: createUserAbbreviation("Sarah Wilson"),
    },
    reviewerUser: {
      username: "Processing Admin",
      email: "processing@flypay.com",
      abbreviation: createUserAbbreviation("Processing Admin"),
    },
  },
  {
    id: "5",
    lastActivityDate: {
      date: "2024-01-13",
      time: "13:55:18",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "OVO",
    clientId: "UP32165498765",
    activityType: {
      type: "release",
      label: "Release",
    },
    activityAmount: createCurrencyObject(100000000),
    balanceBefore: createCurrencyObject(250000000),
    balanceAfter: createCurrencyObject(150000000),
    notesReason: "Large withdrawal request for settlement",
    requestedBy: {
      username: "David Brown",
      email: "david.brown@ovo.com",
      abbreviation: createUserAbbreviation("David Brown"),
    },
    reviewerUser: null,
  },
  {
    id: "6",
    lastActivityDate: {
      date: "2024-01-13",
      time: "15:30:42",
      timezone: "WIB",
    },
    status: {
      status: "approved",
      label: "Approved",
    },
    merchantName: "LinkAja",
    clientId: "UP65498732109",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(50000000),
    balanceBefore: createCurrencyObject(120000000),
    balanceAfter: createCurrencyObject(170000000),
    notesReason: "Positive adjustment for merchant credit",
    requestedBy: {
      username: "Lisa Garcia",
      email: "lisa.garcia@linkaja.com",
      abbreviation: createUserAbbreviation("Lisa Garcia"),
    },
    reviewerUser: {
      username: "Approval Admin",
      email: "approval@flypay.com",
      abbreviation: createUserAbbreviation("Approval Admin"),
    },
  },
  {
    id: "7",
    lastActivityDate: {
      date: "2024-01-12",
      time: "10:18:27",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "BCA Digital",
    clientId: "UP14725836901",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(75000000),
    balanceBefore: createCurrencyObject(50000000),
    balanceAfter: createCurrencyObject(125000000),
    notesReason: "Regular top up for merchant operations",
    requestedBy: {
      username: "Robert Taylor",
      email: "robert.taylor@bcadigital.com",
      abbreviation: createUserAbbreviation("Robert Taylor"),
    },
    reviewerUser: null,
  },
  {
    id: "8",
    lastActivityDate: {
      date: "2024-01-12",
      time: "17:45:55",
      timezone: "WIB",
    },
    status: {
      status: "rejected",
      label: "Rejected",
    },
    merchantName: "Mandiri Digital",
    clientId: "UP96385274107",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(200000000),
    balanceBefore: createCurrencyObject(300000000),
    balanceAfter: createCurrencyObject(300000000),
    notesReason: "Withdrawal request exceeds limit",
    requestedBy: {
      username: "Emily Davis",
      email: "emily.davis@mandiridigital.com",
      abbreviation: createUserAbbreviation("Emily Davis"),
    },
    reviewerUser: {
      username: "Risk Admin",
      email: "risk@flypay.com",
      abbreviation: createUserAbbreviation("Risk Admin"),
    },
  },
  {
    id: "9",
    lastActivityDate: {
      date: "2024-01-11",
      time: "08:25:10",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "Tokopedia",
    clientId: "TPD001",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(35000000),
    balanceBefore: createCurrencyObject(90000000),
    balanceAfter: createCurrencyObject(125000000),
    notesReason: "Regular top up for merchant operations",
    requestedBy: {
      username: "Tom Anderson",
      email: "tom.anderson@tokopedia.com",
      abbreviation: createUserAbbreviation("Tom Anderson"),
    },
    reviewerUser: null,
  },
  {
    id: "10",
    lastActivityDate: {
      date: "2024-01-11",
      time: "12:40:33",
      timezone: "WIB",
    },
    status: {
      status: "approved",
      label: "Approved",
    },
    merchantName: "Shopee",
    clientId: "SPE002",
    activityType: {
      type: "hold",
      label: "Hold",
    },
    activityAmount: createCurrencyObject(80000000),
    balanceBefore: createCurrencyObject(200000000),
    balanceAfter: createCurrencyObject(120000000),
    notesReason: "Hold balance for pending settlement",
    requestedBy: {
      username: "Anna Martinez",
      email: "anna.martinez@shopee.com",
      abbreviation: createUserAbbreviation("Anna Martinez"),
    },
    reviewerUser: {
      username: "Approval Manager",
      email: "approval.manager@flypay.com",
      abbreviation: createUserAbbreviation("Approval Manager"),
    },
  },
  {
    id: "11",
    lastActivityDate: {
      date: "2024-01-10",
      time: "15:18:55",
      timezone: "WIB",
    },
    status: {
      status: "processing",
      label: "Processing",
    },
    merchantName: "Bukalapak",
    clientId: "BKL003",
    activityType: {
      type: "release",
      label: "Release",
    },
    activityAmount: createCurrencyObject(60000000),
    balanceBefore: createCurrencyObject(150000000),
    balanceAfter: createCurrencyObject(90000000),
    notesReason: "Release hold balance for settlement",
    requestedBy: {
      username: "Chris Lee",
      email: "chris.lee@bukalapak.com",
      abbreviation: createUserAbbreviation("Chris Lee"),
    },
    reviewerUser: {
      username: "Processing Manager",
      email: "processing.manager@flypay.com",
      abbreviation: createUserAbbreviation("Processing Manager"),
    },
  },
  {
    id: "12",
    lastActivityDate: {
      date: "2024-01-10",
      time: "17:30:22",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "Lazada",
    clientId: "LZD004",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(45000000),
    balanceBefore: createCurrencyObject(100000000),
    balanceAfter: createCurrencyObject(145000000),
    notesReason: "Positive adjustment for merchant credit",
    requestedBy: {
      username: "Patricia White",
      email: "patricia.white@lazada.com",
      abbreviation: createUserAbbreviation("Patricia White"),
    },
    reviewerUser: null,
  },
  {
    id: "13",
    lastActivityDate: {
      date: "2024-01-09",
      time: "10:05:15",
      timezone: "WIB",
    },
    status: {
      status: "approved",
      label: "Approved",
    },
    merchantName: "Blibli",
    clientId: "BLB005",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(20000000),
    balanceBefore: createCurrencyObject(80000000),
    balanceAfter: createCurrencyObject(100000000),
    notesReason: "Emergency top up for merchant operations",
    requestedBy: {
      username: "James Wilson",
      email: "james.wilson@blibli.com",
      abbreviation: createUserAbbreviation("James Wilson"),
    },
    reviewerUser: {
      username: "Senior Admin",
      email: "senior.admin@flypay.com",
      abbreviation: createUserAbbreviation("Senior Admin"),
    },
  },
  {
    id: "14",
    lastActivityDate: {
      date: "2024-01-09",
      time: "14:22:40",
      timezone: "WIB",
    },
    status: {
      status: "rejected",
      label: "Rejected",
    },
    merchantName: "JD.id",
    clientId: "JD006",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(55000000),
    balanceBefore: createCurrencyObject(50000000),
    balanceAfter: createCurrencyObject(50000000),
    notesReason: "Adjustment request rejected - insufficient documentation",
    requestedBy: {
      username: "Maria Rodriguez",
      email: "maria.rodriguez@jd.id",
      abbreviation: createUserAbbreviation("Maria Rodriguez"),
    },
    reviewerUser: {
      username: "Compliance Admin",
      email: "compliance@flypay.com",
      abbreviation: createUserAbbreviation("Compliance Admin"),
    },
  },
  {
    id: "15",
    lastActivityDate: {
      date: "2024-01-08",
      time: "09:50:28",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "Zalora",
    clientId: "ZLR007",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(70000000),
    balanceBefore: createCurrencyObject(60000000),
    balanceAfter: createCurrencyObject(130000000),
    notesReason: "Monthly top up for merchant account",
    requestedBy: {
      username: "Kevin Chen",
      email: "kevin.chen@zalora.com",
      abbreviation: createUserAbbreviation("Kevin Chen"),
    },
    reviewerUser: null,
  },
  {
    id: "16",
    lastActivityDate: {
      date: "2024-01-08",
      time: "16:35:17",
      timezone: "WIB",
    },
    status: {
      status: "processing",
      label: "Processing",
    },
    merchantName: "Matahari Mall",
    clientId: "MTH008",
    activityType: {
      type: "release",
      label: "Release",
    },
    activityAmount: createCurrencyObject(90000000),
    balanceBefore: createCurrencyObject(180000000),
    balanceAfter: createCurrencyObject(90000000),
    notesReason: "Release hold balance for large settlement",
    requestedBy: {
      username: "Rachel Kim",
      email: "rachel.kim@matahari.com",
      abbreviation: createUserAbbreviation("Rachel Kim"),
    },
    reviewerUser: {
      username: "Operations Admin",
      email: "operations@flypay.com",
      abbreviation: createUserAbbreviation("Operations Admin"),
    },
  },
  {
    id: "17",
    lastActivityDate: {
      date: "2024-01-07",
      time: "11:15:45",
      timezone: "WIB",
    },
    status: {
      status: "approved",
      label: "Approved",
    },
    merchantName: "Indomaret",
    clientId: "IDM009",
    activityType: {
      type: "adjustment",
      label: "Balance Adjustment",
    },
    activityAmount: createCurrencyObject(25000000),
    balanceBefore: createCurrencyObject(120000000),
    balanceAfter: createCurrencyObject(145000000),
    notesReason: "Credit adjustment for merchant refund",
    requestedBy: {
      username: "Daniel Park",
      email: "daniel.park@indomaret.com",
      abbreviation: createUserAbbreviation("Daniel Park"),
    },
    reviewerUser: {
      username: "Finance Admin",
      email: "finance@flypay.com",
      abbreviation: createUserAbbreviation("Finance Admin"),
    },
  },
  {
    id: "18",
    lastActivityDate: {
      date: "2024-01-07",
      time: "18:20:30",
      timezone: "WIB",
    },
    status: {
      status: "pending",
      label: "Pending",
    },
    merchantName: "Alfamart",
    clientId: "ALF010",
    activityType: {
      type: "topup",
      label: "Top Up",
    },
    activityAmount: createCurrencyObject(95000000),
    balanceBefore: createCurrencyObject(150000000),
    balanceAfter: createCurrencyObject(245000000),
    notesReason: "Large top up request for merchant expansion",
    requestedBy: {
      username: "Sophie Turner",
      email: "sophie.turner@alfamart.com",
      abbreviation: createUserAbbreviation("Sophie Turner"),
    },
    reviewerUser: null,
  },
];

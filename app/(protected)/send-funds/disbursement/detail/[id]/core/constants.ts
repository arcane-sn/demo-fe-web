export const STATUS_BADGE_STYLES = {
  uploaded: {
    container: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-800",
  },
  draft: {
    container: "bg-gray-100 text-gray-800 border-gray-200",
    dot: "bg-gray-800",
  },
  'inquiry-process': {
    container: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-800",
  },
  valid: {
    container: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-800",
  },
  issue: {
    container: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-800",
  },
  'pending-approval': {
    container: "bg-yellow-100 text-yellow-600 border-yellow-200",
    dot: "bg-yellow-600",
  },
  approved: {
    container: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-600",
  },
  scheduled: {
    container: "bg-teal-100 text-teal-700 border-teal-200",
    dot: "bg-teal-600",
  },
  processing: {
    container: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-600",
  },
  'partially-complete': {
    container: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-600",
  },
  completed: {
    container: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-600",
  },
  rejected: {
    container: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-600",
  },
} as const;

export const FIELD_LABELS = {
  CREATION_ID: "Creation ID",
  TRANSFER_AMOUNT: "Transfer Amount",
  TOTAL_TRANSACTION: "Total Transaction",
  VALID_AMOUNT: "Valid Amount",
  VALID_TRANSACTION: "Valid Trans.",
  INVALID_AMOUNT: "Invalid Amount",
  INVALID_TRANSACTION: "Invalid Trans.",
  SCHEDULED_DATE: "Scheduled Date",
  CREATED_BY: "Created by",
  CREATED_DATE: "Created Date",
  TRANSACTION_LIST: "Transaction List",
  QUICK_SEARCH: "Quick search transaction",
  STATUS: "Status",
  TRANSFER_AMOUNT_COLUMN: "Transfer Amount",
  PARTNER_REFERENCE_NUMBER: "Partner Reference Number",
  ACCOUNT_NUMBER: "Account Number",
  BANK_NAME_CODE: "Bank Name / Code",
  ACCOUNT_NAME: "Account Name",
  REMARK: "Remark",
  SEND_TO: "Send To",
  SHOW_PER_PAGE: "Show",
  PER_PAGE: "per page",
  ACCOUNT_STATUS: "Account Status",
  SELECTED: "Selected",
  DELETE: "Delete",
  SUBMIT_FOR_APPROVAL: "Submit for Approval",
} as const;


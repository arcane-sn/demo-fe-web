
export const LOADING_MESSAGE = "Loading disbursement details...";
export const ERROR_PREFIX = "Error:";
export const NO_DATA_MESSAGE = "No disbursement data available";

export const STATUS_TYPES = {
  APPROVED: "approved",
  SCHEDULED: "scheduled",
  PROCESSING: "processing",
  COMPLETED: "completed",
  REJECTED: "rejected",
} as const;

export const STATUS_BANNER_STYLES = {
  rejected: {
    container: "bg-red-50 border border-red-200",
    iconContainer: "bg-red-100",
    icon: "text-red-600",
    title: "text-red-800",
    description: "text-red-700",
  },
  processing: {
    container: "bg-yellow-50 border border-yellow-200",
    iconContainer: "bg-yellow-100",
    icon: "text-yellow-600",
    title: "text-yellow-800",
    description: "text-yellow-700",
  },
  completed: {
    container: "bg-green-50 border border-green-200",
    iconContainer: "bg-green-100",
    icon: "text-green-600",
    title: "text-green-800",
    description: "text-green-700",
  },
  scheduled: {
    container: "bg-purple-50 border border-purple-200",
    iconContainer: "bg-purple-100",
    icon: "text-purple-600",
    title: "text-purple-800",
    description: "text-purple-700",
  },
  approved: {
    container: "bg-purple-50 border border-purple-200",
    iconContainer: "bg-purple-100",
    icon: "text-purple-600",
    title: "text-purple-800",
    description: "text-purple-700",
  },
} as const;

export const STATUS_BADGE_STYLES = {
  rejected: {
    container: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-800",
  },
  processing: {
    container: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-800",
  },
  completed: {
    container: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-800",
  },
  scheduled: {
    container: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-800",
  },
  approved: {
    container: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-800",
  },
} as const;

export const SECTION_TITLES = {
  TRANSFER_DETAIL: "Transfer Detail",
  BENEFICIARY_INFORMATION: "Beneficiary Information",
  OTHER_DETAILS: "Other Details",
  REASON_OF_REJECTION: "Reason of Rejection",
  CALLBACK: "Callback",
  TIMESTAMPS_USER_INFO: "Timestamps & User Info",
} as const;

export const FIELD_LABELS = {
  TRANSFER_AMOUNT: "Transfer Amount",
  ADMIN_FEE: "Admin Fee",
  TOTAL_TRANSFER_AMOUNT: "Total Transfer Amount",
  REFERENCE_NUMBER: "Reference Number",
  BENEFICIARY_ACCOUNT_NUMBER: "Beneficiary Account Number",
  BANK_NAME: "Bank Name",
  CREATION_METHOD: "Creation Method",
  SCHEDULED_DATE: "Scheduled Date",
  BENEFICIARY_ACCOUNT_STATUS: "Beneficiary Account Status",
  BENEFICIARY_BANK_NAME_CODE: "Beneficiary Bank Name / Code",
  BENEFICIARY_ACCOUNT_NAME: "Beneficiary Account Name",
  REMARK: "Remark",
  SEND_EMAIL_TO: "Send Email to",
  REASON: "Reason",
  STATUS: "Status",
  RESPONSE: "Response",
  MESSAGE: "Message",
  SERVED_DATE: "Served Date",
  APPROVED_BY: "Approved by",
  APPROVED_DATE: "Approved Date",
  REJECTED_BY: "Rejected by",
  REJECTED_DATE: "Rejected Date",
  REQUESTED_BY: "Requested by",
  REQUESTED_DATE: "Requested Date",
} as const;

export const CREATION_METHOD_LABELS = {
  SINGLE: "Single Transfer",
  BATCH: "Batch Transfer",
} as const;

export const CREATION_METHOD_BADGE_STYLES = {
  single: {
    container: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-800",
  },
  batch: {
    container: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-800",
  },
} as const;

export const CALLBACK_STATUS = {
  SUCCESS: "Success",
  INIT: "Init",
} as const;

export const CALLBACK_STATUS_COLORS = {
  success: "bg-green-500",
  init: "bg-yellow-500",
} as const;

export const EMPTY_VALUE = "-";

export const EXPORT_BUTTON_LABEL = "Export";

export const STATUS_SUFFIX = " Status";


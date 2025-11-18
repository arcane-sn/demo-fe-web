import { DEFAULT_DATE_TYPE, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from "../../core/_constants";

export const TABLE_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const TABLE_PAGE_SIZE_OPTIONS = DEFAULT_PAGE_SIZE_OPTIONS;
export const TABLE_DEFAULT_DATE_TYPE = DEFAULT_DATE_TYPE;

export const TABLE_SEARCH_PLACEHOLDER = "Search by creation ID or creator...";

export const TOOLBAR_ACTION_IDS = {
  FILTER: "filter",
  EXPORT: "export",
} as const;

export const TOOLBAR_ACTION_LABELS = {
  FILTER: "Filter",
  EXPORT: "Export",
} as const;

export const DEFAULT_TOOLBAR_ACTIONS = [
  {
    id: TOOLBAR_ACTION_IDS.FILTER,
    label: TOOLBAR_ACTION_LABELS.FILTER,
  },
  {
    id: TOOLBAR_ACTION_IDS.EXPORT,
    label: TOOLBAR_ACTION_LABELS.EXPORT,
  },
] as const;

export const DEFAULT_DATA_GRID_OPTIONS = {
  tableLayout: {
    width: "fixed" as const,
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
} as const;

export const DEFAULT_ACTION_CONFIG = {
  showDropdown: true,
  maxVisibleActions: 3,
} as const;

export const DATE_TYPE_LAST_ACTIVITY = {
  label: "Last Activity Date",
  value: "lastActivityDate",
} as const;

export const DRAFT_DATE_TYPE_OPTIONS = [
  DATE_TYPE_LAST_ACTIVITY,
  { label: "Created Date", value: "createdDate" },
];

export const PENDING_APPROVAL_DATE_TYPE_OPTIONS = [
  DATE_TYPE_LAST_ACTIVITY,
  { label: "Submitted Date", value: "submittedDate" },
];

export const APPROVAL_LOG_DATE_TYPE_OPTIONS = [
  DATE_TYPE_LAST_ACTIVITY,
  { label: "Approved Date", value: "approvedDate" },
  { label: "Scheduled Date", value: "scheduledDate" },
];

export const TABLE_HEADER_TITLES = {
  DRAFT: "Draft Disbursements",
  PENDING_APPROVAL: "Pending Approval List",
  APPROVAL_LOG: "Approval Log",
} as const;

export const EMPTY_STATE_TITLES = {
  NO_RESULTS: "No Results Found",
  DRAFT: "No Draft Disbursements",
  PENDING_APPROVAL: "No Pending Approvals",
  APPROVAL_LOG: "No Approval Logs",
} as const;

export const EMPTY_STATE_DESCRIPTIONS = {
  FILTERED: (tableName: string) =>
    `No ${tableName.toLowerCase()} match your current filters. Try adjusting your search or filter criteria.`,
  DRAFT: "You don't have any draft disbursements yet. Create your first disbursement to get started.",
  PENDING_APPROVAL: "No pending approvals found for the selected criteria.",
  APPROVAL_LOG: "No approval logs found for the selected criteria.",
} as const;

export const DATE_FILTER_PLACEHOLDERS = {
  LAST_ACTIVITY: "Last Activity Date",
  CREATED: "Created Date",
  SUBMITTED: "Submitted Date",
  APPROVED: "Approved Date",
  SCHEDULED: "Scheduled Date",
} as const;
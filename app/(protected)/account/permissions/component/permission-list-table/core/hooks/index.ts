import { PermissionData } from "../types";

const headerConfig = {
  title: "Permissions List",
  subtitle: "",
  showRecordCount: false,
};

const footerConfig = {
  showPagination: true,
  showRowCount: true,
  showSelectedCount: true,
};

const permissionListMock: PermissionData[] = [
  {
    id: "PERM001",
    service: "Merchant Management",
    permissionName: "Create Merchant Profile",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM002",
    service: "Merchant Management",
    permissionName: "View Merchant Profile",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM003",
    service: "Merchant Management",
    permissionName: "Update Merchant Profile",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM004",
    service: "Merchant Management",
    permissionName: "Approve/Reject Merchant Profile",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM005",
    service: "Merchant Management",
    permissionName: "Hierarchy Management",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM006",
    service: "Channel Configuration",
    permissionName: "Enable/Disable Channels",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM007",
    service: "Channel Configuration",
    permissionName: "Configure Vendor Credentials",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM008",
    service: "Merchant Pricing",
    permissionName: "Create/Update Pricing",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM009",
    service: "Merchant Pricing",
    permissionName: "View Pricing",
    createdBy: {
      name: "Wakwaw Waw",
      email: "wakwaw@gmail.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-16T16:12:32Z",
    updatedDate: "2025-12-16T16:12:32Z",
  },
  {
    id: "PERM010",
    service: "Transaction Management",
    permissionName: "View Transaction History",
    createdBy: {
      name: "Admin User",
      email: "admin@flypay.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-15T10:30:00Z",
    updatedDate: "2025-12-15T10:30:00Z",
  },
  {
    id: "PERM011",
    service: "Transaction Management",
    permissionName: "Process Refunds",
    createdBy: {
      name: "Admin User",
      email: "admin@flypay.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-15T10:30:00Z",
    updatedDate: "2025-12-15T10:30:00Z",
  },
  {
    id: "PERM012",
    service: "User Management",
    permissionName: "Create User Accounts",
    createdBy: {
      name: "System Admin",
      email: "system@flypay.com",
      avatar: "https://placehold.co/36x36",
    },
    createdDate: "2025-12-14T14:20:00Z",
    updatedDate: "2025-12-14T14:20:00Z",
  },
];

export { headerConfig, footerConfig, permissionListMock };

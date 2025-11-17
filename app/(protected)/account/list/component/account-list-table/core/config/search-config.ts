import { AccountTableSearchConfig } from "../types";

// Search field options for the account table
export const accountSearchOptions: Array<{ value: string; label: string }> = [
  { value: "userID", label: "User ID" },
  { value: "userName", label: "Username" },
  { value: "name", label: "Full Name" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone Number" },
  { value: "clientID", label: "Client ID" },
];

// Default search configuration
export const defaultAccountSearchConfig: AccountTableSearchConfig = {
  searchable: true,
  searchFields: [
    "userID",
    "userName",
    "name",
    "email",
    "phoneNumber",
    "clientID",
  ],
  showSearchBar: true,
  searchBarPlaceholder: "Search by User ID...",
  searchBarOptions: accountSearchOptions,
};

// Search field placeholders mapping
export const searchPlaceholders: Record<string, string> = {
  userID: "Search User ID...",
  userName: "Search Username...",
  name: "Search Full Name...",
  email: "Search Email...",
  phoneNumber: "Search Phone Number...",
  clientID: "Search Client ID...",
};

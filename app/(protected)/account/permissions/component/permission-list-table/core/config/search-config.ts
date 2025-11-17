import { PermissionTableSearchConfig } from "../types";

// Default search configuration for permission list
export const defaultPermissionSearchConfig: PermissionTableSearchConfig = {
  searchable: true,
  searchFields: [
    "service",
    "permissionName",
    "createdBy",
    "createdDate",
    "updatedDate",
  ],
  showSearchBar: true,
  searchBarPlaceholder: "Search permissions",
  searchBarOptions: [
    { value: "service", label: "Service" },
    { value: "permissionName", label: "Permission Name" },
    { value: "createdBy", label: "Created By" },
  ],
};

// Search placeholders mapping for different search fields
export const searchPlaceholders: Record<string, string> = {
  service: "Search by service name...",
  permissionName: "Search by permission name...",
  createdBy: "Search by creator name or email...",
};

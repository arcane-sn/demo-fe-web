// Search configuration for user table
export interface UserTableSearchConfig {
  searchable: boolean;
  searchFields: string[];
  showSearchBar: boolean;
  searchBarPlaceholder: string;
  searchBarOptions: Array<{ value: string; label: string }>;
}

export const userTableSearchConfig: UserTableSearchConfig = {
  searchable: true,
  searchFields: ["name", "email", "userName", "phoneNumber", "role"],
  showSearchBar: true,
  searchBarPlaceholder: "Search users...",
  searchBarOptions: [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "userName", label: "Username" },
    { value: "phoneNumber", label: "Phone" },
    { value: "role", label: "Role" },
  ],
};

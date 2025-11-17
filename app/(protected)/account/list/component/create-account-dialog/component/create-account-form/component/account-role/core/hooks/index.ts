import { rolesListData } from "../../../../../../../../../roles/core/data/roles-list-data-mock";

const accessLevelList = [
  {
    label: "Internal",
    value: "internal",
    description: "access for internal team",
  },
  {
    label: "Parent & Sub-Merchants",
    value: "merchant",
    description: "Parent & Sub-Merchants, clients",
  },
];

// Get roles based on access level from roles-list-data-mock.ts
const getRoleList = (accessLevel: string) => {
  return rolesListData
    .filter((role) => role.type === accessLevel)
    .map((role) => ({
      label: role.name,
      value: role.id,
      description: role.description,
    }));
};

export { accessLevelList, getRoleList };

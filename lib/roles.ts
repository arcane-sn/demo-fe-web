// Role definitions and utilities
export const ROLES = {
  INTERNAL_SUPER_ADMIN: "internal-super-admin",
  INTERNAL_ADMIN: "internal-admin",
  INTERNAL_MAKER: "internal-maker",
  INTERNAL_APPROVER: "internal-approver",
  INTERNAL_VIEWER: "internal-viewer",
  INTERNAL_FINANCE: "internal-finance",
  MERCHANT_ADMIN: "merchant-admin",
  MERCHANT_MAKER: "merchant-maker",
  MERCHANT_APPROVAL: "merchant-approval",
  MERCHANT_VIEWER: "merchant-viewer",
  MERCHANT_FINANCE: "merchant-finance",
  PARENT_SUB_ADMIN: "parent-sub-admin",
  PARENT_SUB_MAKER: "parent-sub-maker",
  PARENT_SUB_APPROVAL: "parent-sub-approval",
  PARENT_SUB_VIEWER: "parent-sub-viewer",
  PARENT_SUB_FINANCE: "parent-sub-finance",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Role display names and descriptions
export const ROLE_INFO: Record<
  Role,
  { name: string; description: string; category: string }
> = {
  [ROLES.INTERNAL_SUPER_ADMIN]: {
    name: "Internal Super Admin",
    description: "Full system access with all permissions",
    category: "Internal",
  },
  [ROLES.INTERNAL_ADMIN]: {
    name: "Internal Admin",
    description: "Administrative access to internal operations",
    category: "Internal",
  },
  [ROLES.INTERNAL_MAKER]: {
    name: "Internal Maker",
    description: "Can create and modify internal records",
    category: "Internal",
  },
  [ROLES.INTERNAL_APPROVER]: {
    name: "Internal Approver",
    description: "Can approve internal operations and transactions",
    category: "Internal",
  },
  [ROLES.INTERNAL_VIEWER]: {
    name: "Internal Viewer",
    description: "Read-only access to internal data",
    category: "Internal",
  },
  [ROLES.INTERNAL_FINANCE]: {
    name: "Internal Finance",
    description: "Finance operations and transaction management",
    category: "Internal",
  },
  [ROLES.MERCHANT_ADMIN]: {
    name: "Merchant Admin",
    description: "Administrative access to merchant operations",
    category: "Merchant",
  },
  [ROLES.MERCHANT_MAKER]: {
    name: "Merchant Maker",
    description: "Can create and modify merchant records",
    category: "Merchant",
  },
  [ROLES.MERCHANT_APPROVAL]: {
    name: "Merchant Approval",
    description: "Can approve merchant operations and transactions",
    category: "Merchant",
  },
  [ROLES.MERCHANT_VIEWER]: {
    name: "Merchant Viewer",
    description: "Read-only access to merchant data",
    category: "Merchant",
  },
  [ROLES.MERCHANT_FINANCE]: {
    name: "Merchant Finance",
    description: "Finance operations for merchant accounts",
    category: "Merchant",
  },
  [ROLES.PARENT_SUB_ADMIN]: {
    name: "Parent Sub Admin",
    description: "Administrative access to parent/sub merchant operations",
    category: "Parent Sub",
  },
  [ROLES.PARENT_SUB_MAKER]: {
    name: "Parent Sub Maker",
    description: "Can create and modify parent/sub merchant records",
    category: "Parent Sub",
  },
  [ROLES.PARENT_SUB_APPROVAL]: {
    name: "Parent Sub Approval",
    description: "Can approve parent/sub merchant operations",
    category: "Parent Sub",
  },
  [ROLES.PARENT_SUB_VIEWER]: {
    name: "Parent Sub Viewer",
    description: "Read-only access to parent/sub merchant data",
    category: "Parent Sub",
  },
  [ROLES.PARENT_SUB_FINANCE]: {
    name: "Parent Sub Finance",
    description: "Finance operations for parent/sub merchant accounts",
    category: "Parent Sub",
  },
};

// Helper functions
export function getRoleInfo(role: Role) {
  return ROLE_INFO[role];
}

export function getRolesByCategory(category: string): Role[] {
  return Object.keys(ROLE_INFO).filter(
    (role) => ROLE_INFO[role as Role].category === category
  ) as Role[];
}

export function getAllRoles(): Role[] {
  return Object.keys(ROLE_INFO) as Role[];
}

export function getRoleCategories(): string[] {
  return Array.from(
    new Set(Object.values(ROLE_INFO).map((info) => info.category))
  ) as string[];
}

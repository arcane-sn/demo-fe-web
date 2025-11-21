export const ACCESS_LEVEL_OPTIONS = [
  {
    label: "Internal",
    value: "internal",
    description: "Access for internal team",
  },
  {
    label: "Parent & Sub-Merchants",
    value: "merchant",
    description: "Parent & Sub-Merchants, clients",
  },
];

export const ROLE_OPTIONS = [
  {
    label: "Admin",
    value: "admin",
    description: "Grant access to all features",
  },
  {
    label: "Finance Supervisor",
    value: "finance-supervisor",
    description:
      "Can create and approve transactions to ensure accuracy and compliance",
  },
  {
    label: "Finance Staff",
    value: "finance-staff",
    description:
      "Can create, view, and export financial transactions to support daily operations",
  },
  {
    label: "Legal Supervisor",
    value: "legal-supervisor",
    description: "Only can view and export financial transactions",
  },
  {
    label: "Legal Staff",
    value: "legal-staff",
    description: "Only can view and export financial transactions",
  },
];


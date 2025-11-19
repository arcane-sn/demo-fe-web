import { usePathname, useSearchParams } from "next/navigation";

interface BreadcrumbItem {
  title: string;
  path: string;
  isActive: boolean;
}

interface UseBreadcrumbReturn {
  breadcrumbItems: BreadcrumbItem[];
  getCurrentPageTitle: () => string;
}

// Mapping untuk mengkonversi path menjadi title yang lebih readable
const PATH_TITLE_MAPPING: Record<string, string> = {
  // Protected routes
  "": "Dashboard",
  dashboards: "Dashboards",
  merchant: "Merchant Management",
  create: "Create New Merchant",
  edit: "Edit Merchant",
  details: "Merchant Details",
  list: "Merchant List",
  review: "Merchant Review",
  account: "Account Management",
  permissions: "Permissions",
  roles: "Roles",
  "user-management": "User Management",
  "send-funds": "Send Funds",
  "account-inquiry": "Account Inquiry",
  disbursement: "Disbursement",
  "my-account": "My Account",
  security: "Security Settings",
  "public-profile": "Public Profile",
  balance: "Balance",
  transactions: "Transactions",
  "pay-in": "Pay In",
  "pay-out": "Pay Out",
  settlement: "Settlement",
  team: "Team Management",
  auth: "Authentication",

  // Auth routes
  signin: "Sign In",
  signup: "Sign Up",
  "change-password": "Change Password",
  "reset-password": "Reset Password",
  "verify-email": "Verify Email",

  // Common paths
  forms: "Forms",
  layouts: "Layouts",

  // Additional common paths
  settings: "Settings",
  profile: "Profile",
  notifications: "Notifications",
  help: "Help",
  support: "Support",
  docs: "Documentation",
  api: "API",
  reports: "Reports",
  analytics: "Analytics",
  logs: "Logs",
  audit: "Audit Trail",
  backup: "Backup",
  import: "Import",
  export: "Export",
};

const pathSegmentToTitle = (segment: string): string => {
  if (PATH_TITLE_MAPPING[segment]) {
    return PATH_TITLE_MAPPING[segment];
  }

  if (segment.startsWith("[") && segment.endsWith("]")) {
    const param = segment.slice(1, -1);
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const shouldIncludeSegment = (segment: string): boolean => {
  if (segment.startsWith("(") && segment.endsWith(")")) {
    return false;
  }

  if (!segment.trim()) {
    return false;
  }

  return true;
};

export const useBreadcrumb = (): UseBreadcrumbReturn => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const breadcrumbItems: BreadcrumbItem[] = [];

  // Special handling for root path "/"
  if (pathname === "/") {
    breadcrumbItems.push({
      title: "Home",
      path: "/",
      isActive: false,
    });
    breadcrumbItems.push({
      title: "Dashboard",
      path: "/",
      isActive: true,
    });
  } else {
    const segments = pathname.split("/").filter(shouldIncludeSegment);

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Check if this is the profile segment and we have type=security parameter
      if (
        segment === "profile" &&
        isLast &&
        searchParams.get("type") === "security"
      ) {
        breadcrumbItems.push({
          title: "Security",
          path: currentPath + "?type=security",
          isActive: true,
        });
      } else {
        breadcrumbItems.push({
          title: pathSegmentToTitle(segment),
          path: currentPath,
          isActive: isLast,
        });
      }
    });
  }

  const getCurrentPageTitle = (): string => {
    if (pathname === "/") {
      return "Dashboard";
    }

    // Check if we're on profile page with security tab
    if (
      pathname === "/my-account/profile" &&
      searchParams.get("type") === "security"
    ) {
      return "Security";
    }

    const segments = pathname.split("/").filter(shouldIncludeSegment);
    const lastSegment = segments[segments.length - 1];
    return lastSegment ? pathSegmentToTitle(lastSegment) : "Page";
  };

  return {
    breadcrumbItems,
    getCurrentPageTitle,
  };
};

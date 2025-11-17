import { NextRequest, NextResponse } from "next/server";

// Define the 16 predefined roles
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

// Define permissions for each role
const ROLE_PERMISSIONS: Record<string, string[]> = {
  // Internal Super Admin - Full access
  [ROLES.INTERNAL_SUPER_ADMIN]: [
    "admin:*", // Wildcard for all permissions
  ],

  // Internal Admin - Most internal operations
  [ROLES.INTERNAL_ADMIN]: [
    "account:read",
    "account:write",
    "merchant:read",
    "merchant:write",
    "merchant:review",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "balance:write",
    "settlement:read",
    "settlement:write",
    "user:read",
    "user:write",
    "permission:read",
    "permission:write",
    "role:read",
    "role:write",
    "activity:read",
  ],

  // Internal Maker - Create operations
  [ROLES.INTERNAL_MAKER]: [
    "account:read",
    "account:write",
    "merchant:read",
    "merchant:write",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "balance:write",
    "settlement:read",
    "settlement:write",
    "user:read",
    "user:write",
    "activity:read",
  ],

  // Internal Approver - Approval operations
  [ROLES.INTERNAL_APPROVER]: [
    "account:read",
    "account:approve",
    "merchant:read",
    "merchant:review",
    "merchant:approve",
    "transaction:read",
    "transaction:approve",
    "balance:read",
    "balance:approve",
    "settlement:read",
    "settlement:approve",
    "user:read",
    "user:approve",
    "activity:read",
  ],

  // Internal Viewer - Read only
  [ROLES.INTERNAL_VIEWER]: [
    "account:read",
    "merchant:read",
    "transaction:read",
    "balance:read",
    "settlement:read",
    "user:read",
    "activity:read",
  ],

  // Internal Finance - Finance operations
  [ROLES.INTERNAL_FINANCE]: [
    "account:read",
    "merchant:read",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "balance:write",
    "settlement:read",
    "settlement:write",
    "disbursement:read",
    "disbursement:write",
    "activity:read",
  ],

  // Merchant Admin - Merchant management
  [ROLES.MERCHANT_ADMIN]: [
    "merchant:read",
    "merchant:write",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "settlement:read",
    "user:read",
    "user:write",
    "activity:read",
  ],

  // Merchant Maker - Merchant create operations
  [ROLES.MERCHANT_MAKER]: [
    "merchant:read",
    "merchant:write",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "settlement:read",
    "activity:read",
  ],

  // Merchant Approval - Merchant approval operations
  [ROLES.MERCHANT_APPROVAL]: [
    "merchant:read",
    "merchant:review",
    "merchant:approve",
    "transaction:read",
    "transaction:approve",
    "balance:read",
    "settlement:read",
    "settlement:approve",
    "activity:read",
  ],

  // Merchant Viewer - Merchant read only
  [ROLES.MERCHANT_VIEWER]: [
    "merchant:read",
    "transaction:read",
    "balance:read",
    "settlement:read",
    "activity:read",
  ],

  // Merchant Finance - Merchant finance operations
  [ROLES.MERCHANT_FINANCE]: [
    "merchant:read",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "balance:write",
    "settlement:read",
    "settlement:write",
    "activity:read",
  ],

  // Parent Sub Admin - Parent/Sub merchant management
  [ROLES.PARENT_SUB_ADMIN]: [
    "merchant:read",
    "merchant:write",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "settlement:read",
    "user:read",
    "user:write",
    "activity:read",
  ],

  // Parent Sub Maker - Parent/Sub create operations
  [ROLES.PARENT_SUB_MAKER]: [
    "merchant:read",
    "merchant:write",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "settlement:read",
    "activity:read",
  ],

  // Parent Sub Approval - Parent/Sub approval operations
  [ROLES.PARENT_SUB_APPROVAL]: [
    "merchant:read",
    "merchant:review",
    "merchant:approve",
    "transaction:read",
    "transaction:approve",
    "balance:read",
    "settlement:read",
    "settlement:approve",
    "activity:read",
  ],

  // Parent Sub Viewer - Parent/Sub read only
  [ROLES.PARENT_SUB_VIEWER]: [
    "merchant:read",
    "transaction:read",
    "balance:read",
    "settlement:read",
    "activity:read",
  ],

  // Parent Sub Finance - Parent/Sub finance operations
  [ROLES.PARENT_SUB_FINANCE]: [
    "merchant:read",
    "transaction:read",
    "transaction:write",
    "balance:read",
    "balance:write",
    "settlement:read",
    "settlement:write",
    "activity:read",
  ],
};

// Define route permissions mapping
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  // Account Management
  "/account/list": ["account:read"],
  "/account/permissions": ["permission:read"],
  "/account/roles": ["role:read"],

  // Merchant Management
  "/merchant/list": ["merchant:read"],
  "/merchant/review": ["merchant:review"],
  "/merchant/create": ["merchant:write"],

  // Balance Management
  "/balance/merchants-balance": ["balance:read"],
  "/balance/balance-statement": ["balance:read"],
  "/balance/balance-request": ["balance:write"],

  // Settlement
  "/settlement/request": ["settlement:write"],
  "/settlement/history": ["settlement:read"],

  // Transactions
  "/transactions/pay-in": ["transaction:read"],
  "/transactions/pay-out": ["transaction:read"],

  // Send Funds
  "/send-funds/disbursement": ["disbursement:write"],
  "/send-funds/account-inquiry": ["disbursement:read"],

  // Team Management
  "/team/user-management": ["user:read"],
  "/team/activities": ["activity:read"],

  // User Management
  "/user-management": ["user:read"],
};

// Helper function to check if user has required permissions
function hasPermission(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  // Check if user has admin:* (super admin)
  if (userPermissions.includes("admin:*")) {
    return true;
  }

  // Check if user has any of the required permissions
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
}

// Helper function to get user permissions from token/cookie
async function getUserPermissions(
  request: NextRequest
): Promise<string[] | null> {
  try {
    // For now, we'll simulate getting user role from a cookie
    // In real implementation, you'd decode JWT token or get from session
    const userRole = request.cookies.get("user_role")?.value;

    if (!userRole) {
      return null;
    }

    // Get permissions for the role
    const permissions = ROLE_PERMISSIONS[userRole];

    return permissions || [];
  } catch (error) {
    console.error("Error getting user permissions:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  const publicRoutes = [
    "/signin",
    "/signup",
    "/reset-password",
    "/verify-email",
  ];
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Skip middleware for API routes (handle auth in API routes themselves)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Skip middleware for static files
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Check if user is authenticated first
  const authToken = request.cookies.get("auth_token")?.value;
  if (!authToken) {
    // No auth token, redirect to login
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Get user permissions only if authenticated
  const userPermissions = await getUserPermissions(request);
  console.log("userPermissions", userPermissions);
  if (!userPermissions) {
    // No valid role, redirect to login
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check if route requires specific permissions
  const requiredPermissions = ROUTE_PERMISSIONS[pathname];

  if (
    requiredPermissions &&
    !hasPermission(userPermissions, requiredPermissions)
  ) {
    // User doesn't have required permissions, redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Add user permissions to headers for use in components
  const response = NextResponse.next();
  response.headers.set("x-user-permissions", JSON.stringify(userPermissions));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

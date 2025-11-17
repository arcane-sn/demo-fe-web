import {
  AlertCircle,
  Badge,
  Bitcoin,
  Book,
  Building,
  Captions,
  Coffee,
  File,
  FileQuestion,
  Ghost,
  HelpCircle,
  MessageSquare,
  Monitor,
  Share2,
  Shield,
  SquareMousePointer,
  Star,
  UserCircle,
  Users,
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  Rocket,
  Store,
  UserCog,
  Compass,
  MemoryStick,
} from "lucide-react";
import { type MenuConfig } from "./types";

export const MENU_SIDEBAR: MenuConfig = [
  // Top Section - Main Navigation
  {
    title: "Home",
    icon: LayoutDashboard,
    children: [{ title: "Dashboards", path: "/" }],
  },
  {
    title: "Transactions History",
    icon: Receipt,
    children: [
      { title: "Pay-In", path: "/transactions/pay-in" },
      { title: "Pay-Out", path: "/transactions/pay-out" },
    ],
  },
  {
    title: "Balance",
    icon: Wallet,
    children: [
      { title: "Merchants Balance", path: "/balance/merchants-balance" },
      { title: "Balance Statement", path: "/balance/balance-statement" },
      { title: "Balance Request", path: "/balance/balance-request" },
    ],
  },
  {
    title: "Settlement",
    icon: BarChart3,
    children: [{ title: "Settlement History", path: "/settlement/history" }],
  },
  {
    title: "Send Funds",
    icon: Rocket,
    children: [
      { title: "Disbursement", path: "/send-funds/disbursement" },
      {
        title: "Account Inquiry Statement",
        path: "/send-funds/account-inquiry",
      },
    ],
  },

  // Management System Section
  { heading: "MANAGEMENT SYSTEM" },
  {
    title: "Merchant Management",
    icon: Store,
    children: [
      { title: "Merchant List", path: "/merchant/list" },
      { title: "Merchant Request", path: "/merchant/review" },
      { title: "Channel List", path: "/merchant/channel-list" },
      { title: "Scheduler", path: "/merchant/scheduler" },
    ],
  },
  {
    title: "Account Service",
    icon: UserCog,
    children: [
      { title: "Account List", path: "/account/list" },
      { title: "Permissions Management", path: "/account/permissions" },
      { title: "Roles Management", path: "/account/roles" },
    ],
  },

  {
    title: "Provider Management",
    icon: MemoryStick,
    children: [
      { title: "Provider Master Data", path: "/provider/master-data" },
    ],
  },

  // Account Section
  { heading: "Account" },
  {
    title: "My Account",
    icon: Shield,
    children: [
      { title: "Profile", path: "/my-account/profile" },
      { title: "Security", path: "/my-account/profile?type=security" },
    ],
  },
  {
    title: "Team Member",
    icon: Users,
    children: [{ title: "User Management", path: "/team/user-management" }],
  },
  {
    title: "Logs",
    icon: Compass,
    children: [{ title: "Audit Logs", path: "/logs/audit-logs" }],
  },
];

export const MENU_SIDEBAR_CUSTOM: MenuConfig = [
  {
    title: "User Management",
    icon: Users,
    path: "/user-management",
  },
  {
    title: "Public Profile",
    icon: UserCircle,
    children: [
      {
        title: "Profiles",
        children: [
          { title: "Default", path: "/public-profile/profiles/default" },
          { title: "Creator", path: "/public-profile/profiles/creator" },
          { title: "Company", path: "/public-profile/profiles/company" },
          { title: "NFT", path: "/public-profile/profiles/nft" },
          { title: "Blogger", path: "/public-profile/profiles/blogger" },
          { title: "CRM", path: "/public-profile/profiles/crm" },
          {
            title: "More",
            collapse: true,
            collapseTitle: "Show less",
            expandTitle: "Show 4 more",
            children: [
              { title: "Gamer", path: "/public-profile/profiles/gamer" },
              { title: "Feeds", path: "/public-profile/profiles/feeds" },
              { title: "Plain", path: "/public-profile/profiles/plain" },
              { title: "Modal", path: "/public-profile/profiles/modal" },
            ],
          },
        ],
      },
    ],
  },
];

export const MENU_SIDEBAR_COMPACT: MenuConfig = [
  {
    title: "User Management",
    icon: Users,
    path: "/user-management",
  },
  {
    title: "Public Profile",
    icon: UserCircle,
    children: [
      {
        title: "Profiles",
        children: [
          { title: "Default", path: "/public-profile/profiles/default" },
          { title: "Creator", path: "/public-profile/profiles/creator" },
          { title: "Company", path: "/public-profile/profiles/company" },
          { title: "NFT", path: "/public-profile/profiles/nft" },
          { title: "Blogger", path: "/public-profile/profiles/blogger" },
          { title: "CRM", path: "/public-profile/profiles/crm" },
          {
            title: "More",
            collapse: true,
            collapseTitle: "Show less",
            expandTitle: "Show 4 more",
            children: [
              { title: "Gamer", path: "/public-profile/profiles/gamer" },
              { title: "Feeds", path: "/public-profile/profiles/feeds" },
              { title: "Plain", path: "/public-profile/profiles/plain" },
              { title: "Modal", path: "/public-profile/profiles/modal" },
            ],
          },
        ],
      },
    ],
  },
];

export const MENU_MEGA: MenuConfig = [
  {
    title: "User Management",
    icon: Users,
    path: "/user-management",
  },
  {
    title: "Profiles",
    children: [
      {
        title: "Profiles",
        children: [
          {
            children: [
              {
                title: "Default",
                icon: Badge,
                path: "/public-profile/profiles/default",
              },
              {
                title: "Creator",
                icon: Coffee,
                path: "/public-profile/profiles/creator",
              },
              {
                title: "Company",
                icon: Building,
                path: "/public-profile/profiles/company",
              },
              {
                title: "NFT",
                icon: Bitcoin,
                path: "/public-profile/profiles/nft",
              },
              {
                title: "Blogger",
                icon: MessageSquare,
                path: "/public-profile/profiles/blogger",
              },
              {
                title: "CRM",
                icon: Monitor,
                path: "/public-profile/profiles/crm",
              },
              {
                title: "Gamer",
                icon: Ghost,
                path: "/public-profile/profiles/gamer",
              },
            ],
          },
          {
            children: [
              {
                title: "Feeds",
                icon: Book,
                path: "/public-profile/profiles/feeds",
              },
              {
                title: "Plain",
                icon: File,
                path: "/public-profile/profiles/plain",
              },
              {
                title: "Modal",
                icon: SquareMousePointer,
                path: "/public-profile/profiles/modal",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MENU_MEGA_MOBILE: MenuConfig = [
  {
    title: "User Management",
    icon: Users,
    path: "/user-management",
  },
  {
    title: "Profiles",
    children: [
      {
        title: "Profiles",
        children: [
          {
            title: "Default",
            icon: Badge,
            path: "/public-profile/profiles/default",
          },
          {
            title: "Creator",
            icon: Coffee,
            path: "/public-profile/profiles/creator",
          },
          {
            title: "Company",
            icon: Building,
            path: "/public-profile/profiles/company",
          },
          { title: "NFT", icon: Bitcoin, path: "/public-profile/profiles/nft" },
          {
            title: "Blogger",
            icon: MessageSquare,
            path: "/public-profile/profiles/blogger",
          },
          { title: "CRM", icon: Monitor, path: "/public-profile/profiles/crm" },
          {
            title: "Gamer",
            icon: Ghost,
            path: "/public-profile/profiles/gamer",
          },
          {
            title: "Feeds",
            icon: Book,
            path: "/public-profile/profiles/feeds",
          },
          {
            title: "Plain",
            icon: File,
            path: "/public-profile/profiles/plain",
          },
          {
            title: "Modal",
            icon: SquareMousePointer,
            path: "/public-profile/profiles/modal",
          },
        ],
      },
    ],
  },
];

export const MENU_HELP: MenuConfig = [
  {
    title: "Getting Started",
    icon: Coffee,
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/installation",
  },
  {
    title: "Support Forum",
    icon: AlertCircle,
    children: [
      {
        title: "All Questions",
        icon: FileQuestion,
        path: "https://devs.keenthemes.com",
      },
      {
        title: "Popular Questions",
        icon: Star,
        path: "https://devs.keenthemes.com/popular",
      },
      {
        title: "Ask Question",
        icon: HelpCircle,
        path: "https://devs.keenthemes.com/question/create",
      },
    ],
  },
  {
    title: "Licenses & FAQ",
    icon: Captions,
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/license",
  },
  {
    title: "Documentation",
    icon: FileQuestion,
    path: "https://keenthemes.com/metronic/tailwind/docs",
  },
  { separator: true },
  { title: "Contact Us", icon: Share2, path: "https://keenthemes.com/contact" },
];

export const MENU_ROOT: MenuConfig = [
  {
    title: "User Management",
    icon: Users,
    rootPath: "/user-management/",
    path: "/user-management",
    childrenIndex: 0,
  },
  {
    title: "Public Profile",
    icon: UserCircle,
    rootPath: "/public-profile/",
    path: "/public-profile/profiles/default",
    childrenIndex: 1,
  },
];

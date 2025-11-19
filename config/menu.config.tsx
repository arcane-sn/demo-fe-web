import { type MenuConfig } from "./types";

export const MENU_SIDEBAR: MenuConfig = [
  // Top Section - Main Navigation
  {
    title: "Home",
    icon: "element-11",
    children: [
      { title: "Dashboards", path: "/dashboards" },
    ],
  },
  {
    title: "Transactions History",
    icon: "cheque",
    children: [
      { title: "Pay-In", path: "/transactions/pay-in" },
      { title: "Pay-Out", path: "/transactions/pay-out" },
    ],
  },
  {
    title: "Balance",
    icon: "wallet",
    children: [
      { title: "Merchants Balance", path: "/balance/merchants-balance" },
      { title: "Balance Statement", path: "/balance/balance-statement" },
      { title: "Balance Request", path: "/balance/balance-request" },
    ],
  },
  {
    title: "Settlement",
    icon: "menu",
    children: [{ title: "Settlement History", path: "/settlement/history" }],
  },
  {
    title: "Send Funds",
    icon: "rocket",
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
    icon: "shop",
    children: [
      { title: "Merchant List", path: "/merchant/list" },
      { title: "Merchant Request", path: "/merchant/review" },
      { title: "Channel List", path: "/merchant/channel-list" },
      { title: "Scheduler", path: "/merchant/scheduler" },
    ],
  },
  {
    title: "Account Service",
    icon: "user-square",
    children: [
      { title: "Account List", path: "/account/list" },
      { title: "Permissions Management", path: "/account/permissions" },
      { title: "Roles Management", path: "/account/roles" },
    ],
  },

  {
    title: "Provider Management",
    icon: "technology-4",
    children: [
      { title: "Provider Master Data", path: "/provider/master-data" },
    ],
  },

  // Account Section
  { heading: "Account" },
  {
    title: "My Account",
    icon: "security-user",
    children: [
      { title: "Profile", path: "/my-account/profile" },
      { title: "Security", path: "/my-account/profile?type=security" },
    ],
  },
  {
    title: "Team Member",
    icon: "people",
    children: [{ title: "User Management", path: "/team/user-management" }],
  },
  {
    title: "Logs",
    icon: "compass",
    children: [{ title: "Audit Logs", path: "/logs/audit-logs" }],
  },
];

export const MENU_SIDEBAR_CUSTOM: MenuConfig = [
  {
    title: "User Management",
    icon: "people",
    path: "/user-management",
  },
  {
    title: "Public Profile",
    icon: "user",
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
    icon: "people",
    path: "/user-management",
  },
  {
    title: "Public Profile",
    icon: "user",
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
    icon: "people",
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
                icon: "badge",
                path: "/public-profile/profiles/default",
              },
              {
                title: "Creator",
                icon: "coffee",
                path: "/public-profile/profiles/creator",
              },
              {
                title: "Company",
                icon: "building",
                path: "/public-profile/profiles/company",
              },
              {
                title: "NFT",
                icon: "bitcoin",
                path: "/public-profile/profiles/nft",
              },
              {
                title: "Blogger",
                icon: "message",
                path: "/public-profile/profiles/blogger",
              },
              {
                title: "CRM",
                icon: "monitor",
                path: "/public-profile/profiles/crm",
              },
              {
                title: "Gamer",
                icon: "ghost",
                path: "/public-profile/profiles/gamer",
              },
            ],
          },
          {
            children: [
              {
                title: "Feeds",
                icon: "book",
                path: "/public-profile/profiles/feeds",
              },
              {
                title: "Plain",
                icon: "file",
                path: "/public-profile/profiles/plain",
              },
              {
                title: "Modal",
                icon: "cursor",
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
    icon: "people",
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
            icon: "badge",
            path: "/public-profile/profiles/default",
          },
          {
            title: "Creator",
            icon: "coffee",
            path: "/public-profile/profiles/creator",
          },
          {
            title: "Company",
            icon: "building",
            path: "/public-profile/profiles/company",
          },
          { title: "NFT", icon: "bitcoin", path: "/public-profile/profiles/nft" },
          {
            title: "Blogger",
            icon: "message",
            path: "/public-profile/profiles/blogger",
          },
          { title: "CRM", icon: "monitor", path: "/public-profile/profiles/crm" },
          {
            title: "Gamer",
            icon: "ghost",
            path: "/public-profile/profiles/gamer",
          },
          {
            title: "Feeds",
            icon: "book",
            path: "/public-profile/profiles/feeds",
          },
          {
            title: "Plain",
            icon: "file",
            path: "/public-profile/profiles/plain",
          },
          {
            title: "Modal",
            icon: "cursor",
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
    icon: "coffee",
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/installation",
  },
  {
    title: "Support Forum",
    icon: "information",
    children: [
      {
        title: "All Questions",
        icon: "file-question",
        path: "https://devs.keenthemes.com",
      },
      {
        title: "Popular Questions",
        icon: "star",
        path: "https://devs.keenthemes.com/popular",
      },
      {
        title: "Ask Question",
        icon: "help",
        path: "https://devs.keenthemes.com/question/create",
      },
    ],
  },
  {
    title: "Licenses & FAQ",
    icon: "document",
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/license",
  },
  {
    title: "Documentation",
    icon: "file-question",
    path: "https://keenthemes.com/metronic/tailwind/docs",
  },
  { separator: true },
  { title: "Contact Us", icon: "share", path: "https://keenthemes.com/contact" },
];

export const MENU_ROOT: MenuConfig = [
  {
    title: "User Management",
    icon: "people",
    rootPath: "/user-management/",
    path: "/user-management",
    childrenIndex: 0,
  },
  {
    title: "Public Profile",
    icon: "user",
    rootPath: "/public-profile/",
    path: "/public-profile/profiles/default",
    childrenIndex: 1,
  },
];

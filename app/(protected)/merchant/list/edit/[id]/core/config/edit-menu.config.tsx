import { type MenuConfig } from "@/config/types";

export const EDIT_MERCHANT_MENU: MenuConfig = [
  {
    title: "Business Info",
    path: "business-info",
    icon: "shop",
  },
  {
    title: "PIC Info", 
    path: "pic-info",
    icon: "user",
  },
  {
    title: "Support Docs",
    path: "support-docs", 
    icon: "document",
  },
  {
    title: "Service Type",
    path: "service-type",
    icon: "setting-2",
  },
  {
    title: "PG Config",
    path: "pg-config",
    icon: "two-credit-cart",
  },
  {
    title: "Disbursement Config",
    path: "disbursement-config",
    icon: "money",
    children: [
      {
        title: "Disbursement Pricing",
        path: "disbursement-config?tab=pricing",
      },
      {
        title: "Disbursement Routing", 
        path: "disbursement-config?tab=routing",
      },
    ],
  },
  {
    title: "Hierarchy",
    path: "hierarchy",
    icon: "users",
  },
  {
    title: "Credentials",
    path: "credentials",
    icon: "key",
  },
  {
    title: "Others",
    path: "others",
    icon: "more-horiz",
  },
];


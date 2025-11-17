import {
  Building2,
  User,
  FileText,
  Settings,
  CreditCard,
  DollarSign,
  Users,
  Key,
  MoreHorizontal,
} from "lucide-react";
import { type MenuConfig } from "@/config/types";

export const EDIT_MERCHANT_MENU: MenuConfig = [
  {
    title: "Business Info",
    path: "business-info",
    icon: Building2,
  },
  {
    title: "PIC Info", 
    path: "pic-info",
    icon: User,
  },
  {
    title: "Support Docs",
    path: "support-docs", 
    icon: FileText,
  },
  {
    title: "Service Type",
    path: "service-type",
    icon: Settings,
  },
  {
    title: "PG Config",
    path: "pg-config",
    icon: CreditCard,
  },
  {
    title: "Disbursement Config",
    path: "disbursement-config",
    icon: DollarSign,
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
    icon: Users,
  },
  {
    title: "Credentials",
    path: "credentials",
    icon: Key,
  },
  {
    title: "Others",
    path: "others",
    icon: MoreHorizontal,
  },
];


"use client";

export type AccountInquiryStatus = "valid" | "invalid" | "failed" | "init";

export interface AccountInquiryRecord {
  id: string;
  activityDate: string;
  activityTime: string;
  status: AccountInquiryStatus;
  accountNumber: string;
  bankNameCode: string;
  accountName: string;
  inquiryFee: string;
  referenceNumber: string;
  partnerReferenceNumber: string;
  merchantName: string;
  clientId: string;
  response: string;
}


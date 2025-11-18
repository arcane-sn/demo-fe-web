export type TransactionType = "pay-in" | "pay-out";
export type BasePaymentStatus = "Pending" | "Success" | "Failed" | "Expired" | "Request";

export interface BaseTransaction {
  id: string;
  transactionDate: string;
  transactionTime: string;
  merchantName: string;
  clientId: string;
  referenceNumber: string;
  partnerReferenceNumber: string;
  amount: number;
  status: string;
}


export interface MerchantCallbackLogData {
  id: string;
  createdDate: string;
  updatedDate: string;
  merchantName: string;
  clientId: string;
  referenceNumber: string;
  partnerReferenceNumber: string;
  status: "success" | "failed" | "pending" | "processing";
  url: string;
  responseCode: string | null;
  responseMessage: string;
  remainingRetry: number;
  httpStatus: number | null;
}

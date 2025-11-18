export interface ResendCallbackDataTypes {
  url: string;
  status: "Success" | "Failed" | "Pending";
  responseCode: string;
  responseMessage: string;
  retryLimit: number;
}

// Shared AmountDetail interface
export interface AmountDetail {
  value: number | null;
  breakdown?: string | null;
}

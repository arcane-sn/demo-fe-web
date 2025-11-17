export interface ResendCallbackDataTypes {
  url: string;
  status: "Success" | "Failed" | "Pending";
  responseCode: string;
  responseMessage: string;
  retryLimit: number;
}

export interface ApplicationLogData {
  id: string;
  timestamp: string;
  logId: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  serviceName: string;
  eventType: string;
  env: "development" | "staging" | "production";
  responseStatus: number | null;
  responseMessage: string;
  userId: string | null;
  clientId: string | null;
  traceId: string;
  ipAddress: string;
}

export interface AuditLogData {
  id: string;
  timestamp: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  clientId?: string; // For merchant logs
  merchantName?: string; // For merchant logs
  action: string | string[]; // Can be single action or multiple actions
  sectionType: string;
  sectionId: string;
  beforeChange: string;
  afterChange: string;
  ipAddress: string;
}


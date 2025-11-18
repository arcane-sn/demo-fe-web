import { PendingApprovalData } from '../models';
import type { BatchDetail, TransactionItem } from '../../../../../types/batch-detail';

type PendingApprovalResponseEntry = PendingApprovalData & {
  batchDetail?: BatchDetail;
  transactions?: TransactionItem[];
};

const pendingMockResponse: { data: PendingApprovalResponseEntry[] } = {
  data: [
    {
      id: "PENDING_SINGLE_001",
      creationId: "SINGLE_PENDING_DEC25",
      type: "single",
      totalTransferAmount: "IDR 8.000.000",
      totalTransaction: 1,
      totalAccount: 1,
      createdBy: {
        name: "Alice Cooper",
        email: "alice.cooper@company.com",
        avatar: "/media/avatars/300-7.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "15:30:00",
      submittedDate: "Thu, Dec 16, 2025",
      submittedTime: "15:25:00",
      beneficiaryDetails: {
        bankName: "BCA / 14",
        accountNumber: "1111 2222 3333 4444",
        accountName: "PT PENDING SINGLE"
      },
      adminFee: "IDR 0",
      description: "Single transfer awaiting approval"
    },
    {
      id: "PENDING_BATCH_020",
      creationId: "BATCH_PENDING_HIGH_VALUE",
      type: "batch",
      totalTransferAmount: "IDR 200.000.000",
      totalTransaction: 10,
      totalAccount: 10,
      createdBy: {
        name: "Clara Roberts",
        email: "clara.roberts@company.com",
        avatar: "/media/avatars/300-9.png"
      },
      lastActivityDate: "Fri, Dec 17, 2025",
      lastActivityTime: "10:15:00",
      submittedDate: "Fri, Dec 17, 2025",
      submittedTime: "10:05:00",
      adminFee: "IDR 200.000",
      description: "High value batch awaiting approval",
      batchDetail: {
        id: "PENDING_BATCH_020",
        creationId: "BATCH_PENDING_HIGH_VALUE",
        status: "pending-approval",
        totalTransferAmount: "IDR 200.000.000",
        totalTransaction: 10,
        validAmount: "IDR 200.000.000",
        validTransaction: 10,
        invalidAmount: "IDR 0",
        invalidTransaction: 0,
        createdBy: {
          name: "Clara Roberts",
          email: "clara.roberts@company.com",
          avatar: "/media/avatars/300-9.png"
        },
        createdDate: "Fri, Dec 17, 2025",
        createdTime: "10:05:00",
        scheduledDate: "Sat, Dec 18, 2025",
        scheduledTime: "09:00:00"
      },
      transactions: [
        {
          id: "PENDING_TXN_HV_001",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-001",
          accountNumber: "9011 0001 0001",
          bankName: "BCA",
          bankCode: "014",
          accountName: "PT HIGH VALUE ONE",
          remark: "Milestone 1",
          sendToEmail: "finance@hvone.com",
          sendToName: "HV One Ops"
        },
        {
          id: "PENDING_TXN_HV_002",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-002",
          accountNumber: "9011 0002 0002",
          bankName: "MANDIRI",
          bankCode: "008",
          accountName: "PT HIGH VALUE TWO",
          remark: "Milestone 2",
          sendToEmail: "finance@hvtwo.com",
          sendToName: "HV Two Ops"
        },
        {
          id: "PENDING_TXN_HV_003",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-003",
          accountNumber: "9011 0003 0003",
          bankName: "BRI",
          bankCode: "002",
          accountName: "PT HIGH VALUE THREE",
          remark: "Milestone 3",
          sendToEmail: "finance@hvthree.com",
          sendToName: "HV Three Ops"
        },
        {
          id: "PENDING_TXN_HV_004",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-004",
          accountNumber: "9011 0004 0004",
          bankName: "BNI",
          bankCode: "009",
          accountName: "PT HIGH VALUE FOUR",
          remark: "Milestone 4",
          sendToEmail: "finance@hvfour.com",
          sendToName: "HV Four Ops"
        },
        {
          id: "PENDING_TXN_HV_005",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-005",
          accountNumber: "9011 0005 0005",
          bankName: "BTPN",
          bankCode: "213",
          accountName: "PT HIGH VALUE FIVE",
          remark: "Milestone 5",
          sendToEmail: "finance@hvfive.com",
          sendToName: "HV Five Ops"
        },
        {
          id: "PENDING_TXN_HV_006",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-006",
          accountNumber: "9011 0006 0006",
          bankName: "PERMATA",
          bankCode: "013",
          accountName: "PT HIGH VALUE SIX",
          remark: "Milestone 6",
          sendToEmail: "finance@hvsix.com",
          sendToName: "HV Six Ops"
        },
        {
          id: "PENDING_TXN_HV_007",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-007",
          accountNumber: "9011 0007 0007",
          bankName: "CIMB",
          bankCode: "022",
          accountName: "PT HIGH VALUE SEVEN",
          remark: "Milestone 7",
          sendToEmail: "finance@hvseven.com",
          sendToName: "HV Seven Ops"
        },
        {
          id: "PENDING_TXN_HV_008",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-008",
          accountNumber: "9011 0008 0008",
          bankName: "OCBC",
          bankCode: "948",
          accountName: "PT HIGH VALUE EIGHT",
          remark: "Milestone 8",
          sendToEmail: "finance@hveight.com",
          sendToName: "HV Eight Ops"
        },
        {
          id: "PENDING_TXN_HV_009",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-009",
          accountNumber: "9011 0009 0009",
          bankName: "DANAMON",
          bankCode: "011",
          accountName: "PT HIGH VALUE NINE",
          remark: "Milestone 9",
          sendToEmail: "finance@hvnine.com",
          sendToName: "HV Nine Ops"
        },
        {
          id: "PENDING_TXN_HV_010",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "HV-PO-010",
          accountNumber: "9011 0010 0010",
          bankName: "BII",
          bankCode: "016",
          accountName: "PT HIGH VALUE TEN",
          remark: "Milestone 10",
          sendToEmail: "finance@hvten.com",
          sendToName: "HV Ten Ops"
        },
      ]
    },
    {
      id: "PENDING_BATCH_010",
      creationId: "BATCH_PENDING_DEC25",
      type: "batch",
      totalTransferAmount: "IDR 60.000.000",
      totalTransaction: 6,
      totalAccount: 6,
      createdBy: {
        name: "Bob Miller",
        email: "bob.miller@company.com",
        avatar: "/media/avatars/300-8.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "14:45:00",
      submittedDate: "Thu, Dec 16, 2025",
      submittedTime: "14:40:00",
      adminFee: "IDR 120.000",
      description: "Batch transfer awaiting approval",
      batchDetail: {
        id: "PENDING_BATCH_010",
        creationId: "BATCH_PENDING_DEC25",
        status: "pending-approval",
        totalTransferAmount: "IDR 60.000.000",
        totalTransaction: 6,
        validAmount: "IDR 60.000.000",
        validTransaction: 6,
        invalidAmount: "IDR 0",
        invalidTransaction: 0,
        createdBy: {
          name: "Bob Miller",
          email: "bob.miller@company.com",
          avatar: "/media/avatars/300-8.png"
        },
        createdDate: "Thu, Dec 16, 2025",
        createdTime: "14:40:00",
        scheduledDate: "Fri, Dec 17, 2025",
        scheduledTime: "09:00:00"
      },
      transactions: [
        {
          id: "PENDING_TXN_001",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "PA-PO-001",
          accountNumber: "9001 1111 2222",
          bankName: "BCA",
          bankCode: "014",
          accountName: "PT APPROVAL ONE",
          remark: "Pending approval batch",
          sendToEmail: "finance@approvalone.com",
          sendToName: "Approval One Ops"
        },
        {
          id: "PENDING_TXN_002",
          status: "valid",
          transferAmount: "IDR 8.000.000",
          partnerReferenceNumber: "PA-PO-002",
          accountNumber: "9002 2222 3333",
          bankName: "MANDIRI",
          bankCode: "008",
          accountName: "PT APPROVAL TWO",
          remark: "Invoice 2",
          sendToEmail: "finance@approvaltwo.com",
          sendToName: "Approval Two Ops"
        },
        {
          id: "PENDING_TXN_003",
          status: "valid",
          transferAmount: "IDR 12.000.000",
          partnerReferenceNumber: "PA-PO-003",
          accountNumber: "9003 3333 4444",
          bankName: "BRI",
          bankCode: "002",
          accountName: "PT APPROVAL THREE",
          remark: "Milestone 3",
          sendToEmail: "finance@approvalthree.com",
          sendToName: "Approval Three Ops"
        },
        {
          id: "PENDING_TXN_004",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "PA-PO-004",
          accountNumber: "9004 4444 5555",
          bankName: "BNI",
          bankCode: "009",
          accountName: "PT APPROVAL FOUR",
          remark: "Settlement 4",
          sendToEmail: "finance@approvalfour.com",
          sendToName: "Approval Four Ops"
        },
        {
          id: "PENDING_TXN_005",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "PA-PO-005",
          accountNumber: "9005 5555 6666",
          bankName: "BTPN",
          bankCode: "213",
          accountName: "PT APPROVAL FIVE",
          remark: "Batch entry 5",
          sendToEmail: "finance@approvalfive.com",
          sendToName: "Approval Five Ops"
        },
        {
          id: "PENDING_TXN_006",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "PA-PO-006",
          accountNumber: "9006 6666 7777",
          bankName: "PERMATA",
          bankCode: "013",
          accountName: "PT APPROVAL SIX",
          remark: "Batch entry 6",
          sendToEmail: "finance@approvalsix.com",
          sendToName: "Approval Six Ops"
        }
      ]
    }
  ]
};

export const mockPendingApprovalData: PendingApprovalData[] = pendingMockResponse.data.map(
  ({ batchDetail, transactions, ...record }) => record
);

export const mockBatchDetailData: Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }> =
  pendingMockResponse.data.reduce((acc, entry) => {
    if (entry.type === 'batch' && entry.batchDetail) {
      acc[entry.id] = {
        batchDetail: entry.batchDetail,
        transactions: entry.transactions ?? []
      };
    }
    return acc;
  }, {} as Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }>);

import { DisbursementDraft } from '../models';
import type { BatchDetail, TransactionItem } from '../../../../../types/batch-detail';

type DraftResponseEntry = DisbursementDraft & {
  batchDetail?: BatchDetail;
  transactions?: TransactionItem[];
};

const draftMockResponse: { data: DraftResponseEntry[] } = {
  data: [
    {
      id: "DRAFT_SINGLE_001",
      creationId: "SINGLE_DRAFT_DEC25",
      type: "single",
      status: "draft",
      statusDefinition: "Single transfer saved as draft before inquiry",
      actions: {
        delete: true,
        edit: true,
        submitForApproval: false
      },
      totalTransferAmount: "IDR 7.500.000",
      totalTransaction: 1,
      totalAccount: 1,
      createdBy: {
        name: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        avatar: "/media/avatars/300-6.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "09:20:00",
      createdDate: "Thu, Dec 16, 2025",
      createdTime: "09:15:00",
      scheduledDate: "Fri, Dec 17, 2025, 09:00:00",
      beneficiaryDetails: {
        bankName: "BNI / 9",
        accountNumber: "5555 6666 7777 8888",
        accountName: "PT SCHEDULED PAYMENT"
      },
      adminFee: "IDR 0",
      description: "Draft single transfer waiting for validation"
    },
    {
      id: "DRAFT_BATCH_010",
      creationId: "BATCH_VALID_DEC25",
      type: "batch",
      status: "valid",
      statusDefinition: "Batch inquiry completed, ready to submit for approval",
      actions: {
        delete: true,
        edit: true,
        submitForApproval: true
      },
      totalTransferAmount: "IDR 42.000.000",
      totalTransaction: 4,
      totalAccount: 4,
      createdBy: {
        name: "Jane Smith",
        email: "jane.smith@company.com",
        avatar: "/media/avatars/300-2.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "11:45:00",
      createdDate: "Thu, Dec 16, 2025",
      createdTime: "11:40:00",
      adminFee: "IDR 80.000",
      description: "Validated batch draft waiting for approval submission",
      batchDetail: {
        id: "DRAFT_BATCH_010",
        creationId: "BATCH_VALID_DEC25",
        status: "valid",
        totalTransferAmount: "IDR 42.000.000",
        totalTransaction: 4,
        validAmount: "IDR 42.000.000",
        validTransaction: 4,
        invalidAmount: "IDR 0",
        invalidTransaction: 0,
        createdBy: {
          name: "Jane Smith",
          email: "jane.smith@company.com",
          avatar: "/media/avatars/300-2.png"
        },
        createdDate: "Thu, Dec 16, 2025",
        createdTime: "11:40:00"
      },
      transactions: [
        {
          id: "DRAFT_TXN_001",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "DRAFT-PO-001",
          accountNumber: "1234 0001 0001",
          bankName: "BCA",
          bankCode: "014",
          accountName: "PT DRAFT ONE",
          remark: "Initial validation",
          sendToEmail: "ops@draftone.com",
          sendToName: "Draft One Ops"
        },
        {
          id: "DRAFT_TXN_002",
          status: "valid",
          transferAmount: "IDR 8.000.000",
          partnerReferenceNumber: "DRAFT-PO-002",
          accountNumber: "1234 0002 0002",
          bankName: "MANDIRI",
          bankCode: "008",
          accountName: "PT DRAFT TWO",
          remark: "Invoice 202",
          sendToEmail: "ops@drafttwo.com",
          sendToName: "Draft Two Ops"
        },
        {
          id: "DRAFT_TXN_003",
          status: "valid",
          transferAmount: "IDR 12.000.000",
          partnerReferenceNumber: "DRAFT-PO-003",
          accountNumber: "1234 0003 0003",
          bankName: "BRI",
          bankCode: "002",
          accountName: "PT DRAFT THREE",
          remark: "Milestone 3",
          sendToEmail: "ops@draftthree.com",
          sendToName: "Draft Three Ops"
        },
        {
          id: "DRAFT_TXN_004",
          status: "valid",
          transferAmount: "IDR 12.000.000",
          partnerReferenceNumber: "DRAFT-PO-004",
          accountNumber: "1234 0004 0004",
          bankName: "BNI",
          bankCode: "009",
          accountName: "PT DRAFT FOUR",
          remark: "Settlement 4",
          sendToEmail: "ops@draftfour.com",
          sendToName: "Draft Four Ops"
        }
      ]
    },
    {
      id: "DRAFT_BATCH_UPLOADED_011",
      creationId: "BATCH_UPLOADED_DEC25",
      type: "batch",
      status: "uploaded",
      statusDefinition: "Batch transfer file uploaded and queued for inquiry",
      actions: {
        delete: false,
        edit: false,
        submitForApproval: false
      },
      totalTransferAmount: "IDR 58.000.000",
      totalTransaction: 12,
      totalAccount: 12,
      createdBy: {
        name: "Robert Taylor",
        email: "robert.taylor@company.com",
        avatar: "/media/avatars/300-7.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "10:05:00",
      createdDate: "Thu, Dec 16, 2025",
      createdTime: "10:00:00",
      adminFee: "IDR 116.000",
      description: "CSV upload waiting for inquiry queue",
      batchDetail: {
        id: "DRAFT_BATCH_UPLOADED_011",
        creationId: "BATCH_UPLOADED_DEC25",
        status: "uploaded",
        totalTransferAmount: "IDR 58.000.000",
        totalTransaction: 12,
        validAmount: "IDR 0",
        validTransaction: 0,
        invalidAmount: "IDR 0",
        invalidTransaction: 0,
        createdBy: {
          name: "Robert Taylor",
          email: "robert.taylor@company.com",
          avatar: "/media/avatars/300-7.png"
        },
        createdDate: "Thu, Dec 16, 2025",
        createdTime: "10:00:00"
      },
      transactions: []
    },
    {
      id: "DRAFT_BATCH_INQUIRY_012",
      creationId: "BATCH_INQUIRY_DEC25",
      type: "batch",
      status: "inquiry-process",
      statusDefinition: "Batch currently running account inquiry",
      actions: {
        delete: false,
        edit: false,
        submitForApproval: false
      },
      totalTransferAmount: "IDR 24.000.000",
      totalTransaction: 5,
      totalAccount: 5,
      createdBy: {
        name: "David Brown",
        email: "david.brown@company.com",
        avatar: "/media/avatars/300-5.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "09:40:00",
      createdDate: "Thu, Dec 16, 2025",
      createdTime: "09:35:00",
      adminFee: "IDR 48.000",
      description: "Auto inquiry in progress",
      batchDetail: {
        id: "DRAFT_BATCH_INQUIRY_012",
        creationId: "BATCH_INQUIRY_DEC25",
        status: "inquiry-process",
        totalTransferAmount: "IDR 24.000.000",
        totalTransaction: 5,
        validAmount: "IDR 0",
        validTransaction: 0,
        invalidAmount: "IDR 0",
        invalidTransaction: 0,
        createdBy: {
          name: "David Brown",
          email: "david.brown@company.com",
          avatar: "/media/avatars/300-5.png"
        },
        createdDate: "Thu, Dec 16, 2025",
        createdTime: "09:35:00"
      },
      transactions: [
        {
          id: "DRAFT_TXN_INQ_001",
          status: "valid",
          transferAmount: "IDR 6.000.000",
          partnerReferenceNumber: "INQ-PO-001",
          accountNumber: "7001 0001 0001",
          bankName: "BCA",
          bankCode: "014",
          accountName: "PT INQUIRY ONE"
        },
        {
          id: "DRAFT_TXN_INQ_002",
          status: "valid",
          transferAmount: "IDR 5.000.000",
          partnerReferenceNumber: "INQ-PO-002",
          accountNumber: "7001 0002 0002",
          bankName: "MANDIRI",
          bankCode: "008",
          accountName: "PT INQUIRY TWO"
        },
        {
          id: "DRAFT_TXN_INQ_003",
          status: "valid",
          transferAmount: "IDR 4.000.000",
          partnerReferenceNumber: "INQ-PO-003",
          accountNumber: "7001 0003 0003",
          bankName: "BRI",
          bankCode: "002",
          accountName: "PT INQUIRY THREE"
        },
        {
          id: "DRAFT_TXN_INQ_004",
          status: "valid",
          transferAmount: "IDR 5.000.000",
          partnerReferenceNumber: "INQ-PO-004",
          accountNumber: "7001 0004 0004",
          bankName: "BNI",
          bankCode: "009",
          accountName: "PT INQUIRY FOUR"
        },
        {
          id: "DRAFT_TXN_INQ_005",
          status: "valid",
          transferAmount: "IDR 4.000.000",
          partnerReferenceNumber: "INQ-PO-005",
          accountNumber: "7001 0005 0005",
          bankName: "CIMB",
          bankCode: "022",
          accountName: "PT INQUIRY FIVE"
        }
      ]
    },
    {
      id: "DRAFT_SINGLE_ISSUE_013",
      creationId: "SINGLE_ISSUE_DEC25",
      type: "single",
      status: "issue",
      statusDefinition: "Invalid beneficiary account, needs re-inquiry",
      actions: {
        delete: true,
        edit: true,
        submitForApproval: false
      },
      totalTransferAmount: "IDR 2.200.000",
      totalTransaction: 1,
      totalAccount: 1,
      createdBy: {
        name: "Dwight Schrute",
        email: "dwight.schrute@company.com",
        avatar: "/media/avatars/300-13.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "08:10:00",
      createdDate: "Thu, Dec 16, 2025",
      createdTime: "08:05:00",
      beneficiaryDetails: {
        bankName: "BRI / 2",
        accountNumber: "3333 4444 5555 6666",
        accountName: "PT ISSUE SINGLE"
      },
      adminFee: "IDR 0",
      description: "Account name mismatch detected"
    }
  ]
};

export const mockDisbursementDraftData: DisbursementDraft[] = draftMockResponse.data.map(
  ({ batchDetail, transactions, ...draft }) => draft
);

export const mockBatchDetailData: Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }> =
  draftMockResponse.data.reduce((acc, entry) => {
    if (entry.type === 'batch' && entry.batchDetail) {
      acc[entry.id] = {
        batchDetail: entry.batchDetail,
        transactions: entry.transactions ?? []
      };
    }
    return acc;
  }, {} as Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }>);

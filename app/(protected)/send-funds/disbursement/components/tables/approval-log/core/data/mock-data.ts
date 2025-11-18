import { ApprovalLogData } from '../models';
import type { BatchDetail, TransactionItem, BatchDetailStatus } from '../../../../../types/batch-detail';

type ApprovalLogResponseEntry = ApprovalLogData & {
  batchDetail?: BatchDetail;
  transactions?: TransactionItem[];
};

const approvalMockResponse: { data: ApprovalLogResponseEntry[] } = {
  data: [
    {
      id: "LOG_SINGLE_001",
      creationId: "APPROVED_SINGLE_DEC25",
      status: "approved",
      statusDefinition: "Single transfer approved and ready for disbursement",
      creationMethod: "single",
      creationType: "single",
      canCreateBySingle: true,
      canCreateByBatch: true,
      totalTransferAmount: "IDR 6.000.000",
      totalTransaction: 1,
      totalAccount: 1,
      createdBy: {
        name: "John Doe",
        email: "john.doe@company.com",
        avatar: "/media/avatars/300-1.png"
      },
      processedBy: {
        name: "Admin User",
        email: "admin@flypay.com",
        avatar: "/media/avatars/admin.png"
      },
      reviewedBy: {
        name: "Reviewer User",
        email: "reviewer@flypay.com",
        avatar: "/media/avatars/reviewer.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "16:00:00",
      approvedDate: "Thu, Dec 16, 2025",
      approvedTime: "15:55:00",
      processedDate: "Thu, Dec 16, 2025",
      processedTime: "16:00:00",
      beneficiaryDetails: {
        bankName: "BCA / 14",
        accountNumber: "1234 5678 9012",
        accountName: "PT APPROVED SINGLE"
      },
      adminFee: "IDR 0",
      description: "Single transfer approved and queued for settlement"
    },
    {
      id: "LOG_BATCH_010",
      creationId: "BATCH_APPROVED_DEC25",
      status: "partially-complete",
      statusDefinition: "Batch transfer completed with a few failed items",
      creationMethod: "batch",
      creationType: "batch",
      canCreateBySingle: true,
      canCreateByBatch: true,
      totalTransferAmount: "IDR 120.000.000",
      totalTransaction: 6,
      totalAccount: 6,
      createdBy: {
        name: "Jane Smith",
        email: "jane.smith@company.com",
        avatar: "/media/avatars/300-2.png"
      },
      processedBy: {
        name: "Batch Processor",
        email: "batch.processor@flypay.com",
        avatar: "/media/avatars/processor.png"
      },
      reviewedBy: {
        name: "Senior Reviewer",
        email: "senior.reviewer@flypay.com",
        avatar: "/media/avatars/senior-reviewer.png"
      },
      lastActivityDate: "Thu, Dec 16, 2025",
      lastActivityTime: "15:45:00",
      approvedDate: "Thu, Dec 16, 2025",
      approvedTime: "15:30:00",
      processedDate: "Thu, Dec 16, 2025",
      processedTime: "15:40:00",
      completedDate: "Thu, Dec 16, 2025",
      completedTime: "15:45:00",
      adminFee: "IDR 120.000",
      description: "Batch disbursement with six transactions; four succeeded, two failed",
      failureDetails: {
        failedCount: 2,
        successCount: 4,
        totalCount: 6
      },
      batchDetail: {
        id: "LOG_BATCH_010",
        creationId: "BATCH_APPROVED_DEC25",
        status: "valid",
        totalTransferAmount: "IDR 120.000.000",
        totalTransaction: 6,
        validAmount: "IDR 80.000.000",
        validTransaction: 4,
        invalidAmount: "IDR 40.000.000",
        invalidTransaction: 2,
        createdBy: {
          name: "Jane Smith",
          email: "jane.smith@company.com",
          avatar: "/media/avatars/300-2.png"
        },
        createdDate: "Thu, Dec 16, 2025",
        createdTime: "13:45:00",
        scheduledDate: "Fri, Dec 17, 2025",
        scheduledTime: "09:00:00"
      },
      transactions: [
        {
          id: "BATCH_TXN_001",
          status: "valid",
          transferAmount: "IDR 25.000.000",
          partnerReferenceNumber: "PO-001",
          accountNumber: "8888 1111 2222",
          bankName: "BCA",
          bankCode: "014",
          accountName: "PT SUPPLIER ONE",
          remark: "Invoice 001",
          sendToEmail: "finance@supplierone.com",
          sendToName: "Supplier One"
        },
        {
          id: "BATCH_TXN_002",
          status: "valid",
          transferAmount: "IDR 20.000.000",
          partnerReferenceNumber: "PO-002",
          accountNumber: "7777 2222 3333",
          bankName: "MANDIRI",
          bankCode: "008",
          accountName: "PT SUPPLIER TWO",
          remark: "Invoice 002",
          sendToEmail: "finance@suppliertwo.com",
          sendToName: "Supplier Two"
        },
        {
          id: "BATCH_TXN_003",
          status: "valid",
          transferAmount: "IDR 35.000.000",
          partnerReferenceNumber: "PO-003",
          accountNumber: "6666 3333 4444",
          bankName: "BRI",
          bankCode: "002",
          accountName: "PT SUPPLIER THREE",
          remark: "Milestone 3",
          sendToEmail: "finance@supplierthree.com",
          sendToName: "Supplier Three"
        },
        {
          id: "BATCH_TXN_004",
          status: "valid",
          transferAmount: "IDR 10.000.000",
          partnerReferenceNumber: "PO-004",
          accountNumber: "5555 4444 5555",
          bankName: "BNI",
          bankCode: "009",
          accountName: "PT SUPPLIER FOUR",
          remark: "Settlement 4",
          sendToEmail: "finance@supplierfour.com",
          sendToName: "Supplier Four"
        },
        {
          id: "BATCH_TXN_005",
          status: "invalid",
          transferAmount: "IDR 15.000.000",
          partnerReferenceNumber: "PO-005",
          accountNumber: "4444 5555 6666",
          bankName: "BTPN",
          bankCode: "213",
          accountName: "PT SUPPLIER FIVE",
          remark: "Account mismatch",
          sendToEmail: "finance@supplierfive.com",
          sendToName: "Supplier Five"
        },
        {
          id: "BATCH_TXN_006",
          status: "invalid",
          transferAmount: "IDR 15.000.000",
          partnerReferenceNumber: "PO-006",
          accountNumber: "3333 6666 7777",
          bankName: "PERMATA",
          bankCode: "013",
          accountName: "PT SUPPLIER SIX",
          remark: "Bank rejected",
          sendToEmail: "finance@suppliersix.com",
          sendToName: "Supplier Six"
        }
      ]
    }
  ]
};

export const mockApprovalLogData: ApprovalLogData[] = approvalMockResponse.data.map(
  ({ batchDetail, transactions, ...log }) => log
);

export const mockBatchDetailData: Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }> =
  approvalMockResponse.data.reduce((acc, entry) => {
    if (entry.creationType === 'batch' && entry.batchDetail) {
      const status = (entry.status as BatchDetailStatus) ?? entry.batchDetail.status;
      acc[entry.id] = {
        batchDetail: {
          ...entry.batchDetail,
          status,
        },
        transactions: entry.transactions ?? []
      };
    }
    return acc;
  }, {} as Record<string, { batchDetail: BatchDetail; transactions: TransactionItem[] }>);

import {
  DetailRowData,
  PaymentReceiptData,
  TransactionDetail,
  InfoCardItem,
  StatsCardData,
} from "./_models";

export const getTransactionDetailRows = (
  data: PaymentReceiptData
): DetailRowData[] => [
  {
    label: "Order ID",
    value: data.transactionDetails.orderId,
    showCopy: true,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Transaction ID",
    value: data.transactionDetails.transactionId,
    showCopy: true,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Transaction Amount",
    value: data.transactionDetails.transactionAmount,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Transaction Date",
    value: data.transactionDetails.transactionDate,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Email",
    value: data.transactionDetails.email,
    showCopy: true,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Phone Number",
    value: data.transactionDetails.phoneNumber,
    showCopy: true,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Approval Code",
    value: data.transactionDetails.approvalCode,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Bank Name",
    value: data.transactionDetails.bankName,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Bank Country",
    value: data.transactionDetails.bankCountry,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
];

export const getMerchantDetailRows = (
  data: PaymentReceiptData
): DetailRowData[] => [
  {
    label: "Merchant Name",
    value: data.merchantDetails.merchantName,
    showCopy: false,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Email",
    value: data.merchantDetails.email,
    showCopy: true,
    isWebsite: false,
    isMultiline: false,
  },
  {
    label: "Website",
    value: data.merchantDetails.website,
    showCopy: true,
    isWebsite: true,
    isMultiline: false,
  },
  {
    label: "Address",
    value: data.merchantDetails.address,
    showCopy: false,
    isWebsite: false,
    isMultiline: true,
  },
];

// Stats Data Helper
export const getStatsData = (
  transaction: TransactionDetail
): StatsCardData[] => [
  {
    title: "Billing Amount",
    value: `IDR ${transaction.billingAmount.toLocaleString()}`,
  },
  {
    title: "Billing Name",
    value: transaction.billingName,
  },
  {
    title: "Payment Method",
    value: transaction.paymentMethod,
  },
  {
    title: "Activity Source",
    value: transaction.activitySource,
  },
];

// Transaction Details Helper
export const getTransactionDetailsData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Transaction ID",
    value: transaction.id,
    copyable: true,
  },
  {
    label: "Activity Source",
    value: transaction.activitySource,
    copyable: true,
  },
  {
    label: "Order ID",
    value: transaction.orderId,
    copyable: true,
  },
  {
    label: "External ID",
    value: transaction.externalId,
    copyable: true,
  },
  {
    label: "Receipt No.",
    value: transaction.receiptNo,
    copyable: true,
  },
  {
    label: "Approval Code",
    value: transaction.approvalCode,
    copyable: false,
  },
  {
    label: "Acquirer Transaction ID",
    value: transaction.acquirerTransactionId,
    copyable: true,
  },
];

// Payment Info Helper
export const getPaymentInfoData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Channel",
    value: transaction.channel,
    copyable: false,
  },
  {
    label: "Channel MID",
    value: transaction.channelMid,
    copyable: false,
  },
  {
    label: "Payment Mode",
    value: transaction.paymentMode,
    copyable: false,
  },
  {
    label: "Tenor (Months)",
    value: transaction.tenorMonths,
    copyable: false,
  },
  {
    label: "Type of Card",
    value: transaction.typeOfCard,
    copyable: false,
  },
];

// Customer Info Helper
export const getCustomerInfoData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Bill Name",
    value: transaction.billName,
    copyable: false,
  },
  {
    label: "Email",
    value: transaction.email,
    copyable: true,
  },
  {
    label: "Phone Number",
    value: transaction.phoneNumber,
    copyable: true,
  },
  {
    label: "Description",
    value: transaction.description,
    copyable: false,
  },
];

// Merchant Info Helper
export const getMerchantInfoData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Client ID",
    value: transaction.clientId,
    copyable: true,
  },
  {
    label: "Merchant Name",
    value: transaction.merchantName,
    copyable: true,
  },
  {
    label: "Parent ID",
    value: transaction.parentId,
    copyable: true,
  },
  {
    label: "Channel Type",
    value: transaction.channelType,
    copyable: false,
  },
];

// Payment Source Helper
export const getPaymentSourceData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Billing Type",
    value: transaction.billingType,
    copyable: false,
  },
  {
    label: "Source",
    value: transaction.source,
    copyable: false,
  },
  {
    label: "Source PG",
    value: transaction.sourcePG,
    copyable: false,
  },
];

// Bank Details Helper
export const getBankDetailsData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Bank Name",
    value: transaction.bankName,
    copyable: false,
  },
  {
    label: "Bank Country",
    value: transaction.bankCountry,
    copyable: false,
  },
];

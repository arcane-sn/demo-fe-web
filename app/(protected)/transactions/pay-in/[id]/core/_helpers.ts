import {
  PaymentReceiptData,
  TransactionDetail,
  InfoCardItem,
  StatsCardData,
} from "./_models";
import type { StatusCallbackData, TimestampItem } from "../../../components/detail";

export const getPaymentReceiptTransactionDetails = (
  data: PaymentReceiptData
): InfoCardItem[] => [
  {
    label: "Order ID",
    value: data.transactionDetails.orderId,
    copyable: true,
  },
  {
    label: "Transaction ID",
    value: data.transactionDetails.transactionId,
    copyable: true,
  },
  {
    label: "Transaction Amount",
    value: data.transactionDetails.transactionAmount,
    copyable: false,
  },
  {
    label: "Transaction Date",
    value: data.transactionDetails.transactionDate,
    copyable: false,
  },
  {
    label: "Email",
    value: data.transactionDetails.email,
    copyable: true,
  },
  {
    label: "Phone Number",
    value: data.transactionDetails.phoneNumber,
    copyable: true,
  },
  {
    label: "Approval Code",
    value: data.transactionDetails.approvalCode,
    copyable: false,
  },
  {
    label: "Bank Name",
    value: data.transactionDetails.bankName,
    copyable: false,
  },
  {
    label: "Bank Country",
    value: data.transactionDetails.bankCountry,
    copyable: false,
  },
];

export const getPaymentReceiptMerchantDetails = (
  data: PaymentReceiptData
): InfoCardItem[] => [
  {
    label: "Merchant Name",
    value: data.merchantDetails.merchantName,
    copyable: false,
  },
  {
    label: "Email",
    value: data.merchantDetails.email,
    copyable: true,
  },
  {
    label: "Website",
    value: data.merchantDetails.website,
    copyable: true,
  },
  {
    label: "Address",
    value: data.merchantDetails.address,
    copyable: false,
  },
];

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

export const getPaymentDetailData = (
  transaction: TransactionDetail
): InfoCardItem[] => [
  {
    label: "Amount",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.amount),
    copyable: false,
  },
  {
    label: "Service Fee",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.serviceFee),
    copyable: false,
  },
  {
    label: "MDR",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.mdr),
    copyable: false,
  },
  {
    label: "Total Amount",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(transaction.totalAmount),
    copyable: false,
    isHighlighted: true,
    showDivider: true,
  },
];

export const getStatusCallbackData = (
  transaction: TransactionDetail
): StatusCallbackData => {
  return {
    status: transaction.status,
    responseCode: "200",
    responseMessage: "Success Transfer to beneficiary account",
    responseReason: "00/Approved: The transaction was successful.",
    hostResponseCode: "00/Approved",
    chargebackRefundNotes: "00/Approved",
  };
};

export const getTimestampsData = (
  transaction: TransactionDetail
): TimestampItem[] => {
  return [
    {
      label: "Transaction Date",
      date: transaction.transactionDate,
      time: transaction.transactionTime,
    },
    {
      label: "Paid Date",
      date: transaction.paidDate,
      time: transaction.paidTime,
    },
    {
      label: "Expiration Date",
      date: transaction.expirationDate,
      time: transaction.expirationTime,
    },
  ];
};

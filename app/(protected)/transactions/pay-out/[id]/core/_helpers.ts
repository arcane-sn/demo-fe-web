import {
  PayOutDetailTransaction,
  PayOutDetailInfoItem,
} from "../../core/_models";
import type { StatusCallbackData, TimestampItem } from "../../../components/detail";

export const getTransactionDetailsData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Reference Number",
    value: transaction.referenceNumber,
    copyable: true,
  },
  {
    label: "Partner Ref Number",
    value: transaction.partnerReferenceNumber,
    copyable: true,
  },
  {
    label: "Transaction Type",
    value: transaction.transactionType,
  },
  {
    label: "Transaction Source",
    value: transaction.transactionSource,
    copyable: true,
  },
];

export const getBeneficiaryBankDetailsData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Benef Account Status",
    value: transaction.beneficiaryAccountStatus,
    badge: {
      variant:
        transaction.beneficiaryAccountStatus === "Active"
          ? "success"
          : "destructive",
      label: transaction.beneficiaryAccountStatus,
    },
  },
  {
    label: "Benef Bank Name / Code",
    value: `${transaction.beneficiaryBankName} / ${transaction.beneficiaryBankCode}`,
  },
  {
    label: "Benef Account Number",
    value: transaction.beneficiaryAccountNumber,
  },
  {
    label: "Benef Account Name",
    value: transaction.beneficiaryAccountName,
  },
];

export const getBeneficiaryIdentityData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Benef Country",
    value: transaction.beneficiaryCountry,
  },
  {
    label: "Benef City",
    value: transaction.beneficiaryCity,
  },
  {
    label: "Benef Email",
    value: transaction.beneficiaryEmail,
  },
];

export const getSenderIdentityDetailsData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Name",
    value: transaction.senderName,
  },
  {
    label: "Nickname",
    value: transaction.senderNickname,
  },
  {
    label: "Place of Birth",
    value: transaction.senderPlaceOfBirth,
  },
  {
    label: "Date of Birth",
    value: transaction.senderDateOfBirth,
  },
  {
    label: "Gender",
    value: transaction.senderGender,
  },
  {
    label: "Phone Number",
    value: transaction.senderPhoneNumber,
  },
  {
    label: "Sender Identity Type",
    value: transaction.senderIdentityType,
  },
  {
    label: "Sender Identity Number",
    value: transaction.senderIdentityNumber,
  },
  {
    label: "Tax Payer Registration",
    value: transaction.senderTaxPayerRegistration,
  },
];

export const getSenderLocationData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Sender Country",
    value: transaction.senderCountry,
  },
  {
    label: "Sender City",
    value: transaction.senderCity,
  },
  {
    label: "Sender Address",
    value: transaction.senderAddress,
  },
];

export const getSenderBankCodeData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Bank Code",
    value: transaction.senderBankCode,
  },
  {
    label: "Bank Name",
    value: transaction.senderBankName,
  },
];

export const getTransferInfoData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Direction",
    value: transaction.direction,
  },
  {
    label: "Currency",
    value: transaction.currency,
  },
  {
    label: "Origin Country",
    value: transaction.originCountry,
  },
  {
    label: "Source of Funds",
    value: transaction.sourceOfFunds,
  },
  {
    label: "Transact Purpose",
    value: transaction.transactionPurpose,
  },
];

export const getMerchantInfoData = (
  transaction: PayOutDetailTransaction
): PayOutDetailInfoItem[] => [
  {
    label: "Merchant Name",
    value: transaction.merchantName,
  },
  {
    label: "Client ID",
    value: transaction.clientId,
    copyable: true,
  },
];

export const getStatusCallbackData = (
  transaction: PayOutDetailTransaction
): StatusCallbackData => {
  return {
    status: transaction.responseStatus,
    responseCode: transaction.responseCode,
    responseMessage: transaction.responseMessage,
    responseReason: transaction.responseReason,
  };
};

export const getTimestampsData = (
  transaction: PayOutDetailTransaction
): TimestampItem[] => {
  return [
    {
      label: "Transaction Date",
      date: transaction.transactionDate,
      time: transaction.transactionTime,
    },
    {
      label: "Updated Date",
      date: transaction.updatedDate,
      time: transaction.updatedTime,
    },
    {
      label: "Served Date",
      date: transaction.servedDate,
      time: transaction.servedTime,
    },
  ];
};

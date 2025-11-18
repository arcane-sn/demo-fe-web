import { useState, useMemo, useCallback, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { PayInTransaction } from "../../../core/_models";
import {
  MOCK_PAY_IN_TRANSACTIONS,
  PAY_IN_PAYMENT_STATUS_OPTIONS,
  PAY_IN_ACTIVITY_OPTIONS,
  PAY_IN_PROVIDER_NAME_OPTIONS,
  PAY_IN_PAYMENT_METHOD_OPTIONS,
  PAY_IN_VA_TYPE_OPTIONS,
  PAY_IN_VA_STATUS_OPTIONS,
  PAY_IN_VA_BANKS_OPTIONS,
  PAY_IN_QRIS_ACQUIRER_OPTIONS,
} from "../../../core/_consts";
import { parse, isValid, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import { DATA_DATE_FORMAT, INITIAL_DATE_RANGE_STRING, DEFAULT_DATE_TYPE } from "../../../../core/_constants";
import { formatDateRange, parseDateRangeString, collectCheckedValues, buildSectionFromOptions } from "../../../../components/shared/utils";
import { usePayinStore } from "../../../hooks/usePayinStore";

const PAYMENT_METHOD_MAPPING: Record<string, string> = {
  all: "",
  debit_credit_card: "Credit Card",
  va: "Virtual Account",
  e_wallet: "e-Wallet",
  qr_code: "QR Code",
};

const PAYMENT_METHOD_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  "debit-credit-card": "Credit Card",
  "e-wallet": "e-Wallet",
  "virtual-account": "Virtual Account",
  "qr-code": "QR Code",
};

const PAYMENT_CHANNEL_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  "cimbpg": "CIMBPG",
  "bricc": "BRICC",
  "permatacc": "PermataCC",
  "dana": "DANA",
  "shopeepay": "ShopeePay",
  "ovo": "OVO",
  "gopay": "GoPay",
  "linkaja": "LinkAja",
  "va-bca": "BCA VA",
  "va-mandiri": "Mandiri VA",
  "va-bni": "BNI VA",
  "qris": "QRIS",
};

const STATUS_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  pending: "Pending",
  success: "Success",
  failed: "Failed",
  expired: "Expired",
};

const ACTIVITY_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  "payment-gateway": "Payment Gateway",
  "sales-invoice": "Sales Invoice",
};

const PROVIDER_NAME_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  piye: "RYE",
  piro: "Midtrans",
};

const VA_TYPE_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  "open-va": "Open VA",
  "close-va": "Close VA",
};

const VA_STATUS_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  expired: "Expired",
  deleted: "Deleted",
};

const VA_BANKS_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  "bri-va": "BRI VA",
  "mandiri-va": "Mandiri VA",
  "bca-va": "BCA VA",
};

const QRIS_ACQUIRER_FILTER_TO_DATA_MAPPING: Record<string, string> = {
  piye: "PIYE",
  nobu: "Nobu",
};

export function usePayInFilters() {
  const selectedPaymentMethodFromStore = usePayinStore(
    (state) => state.selectedPaymentMethod
  );

  const initialRange = useMemo(
    () => parseDateRangeString(INITIAL_DATE_RANGE_STRING),
    [],
  );

  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>("referenceNumber");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [dateType, setDateType] = useState(DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedProviderNames, setSelectedProviderNames] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedVATypes, setSelectedVATypes] = useState<string[]>([]);
  const [selectedVAStatuses, setSelectedVAStatuses] = useState<string[]>([]);
  const [selectedVABanks, setSelectedVABanks] = useState<string[]>([]);
  const [selectedQRISAcquirers, setSelectedQRISAcquirers] = useState<string[]>([]);
  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(dateRange);
  const [draftDateType, setDraftDateType] = useState(dateType);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(dateRange),
  );

  useEffect(() => {
    setDateRange(undefined);
    setActiveDateFilter("");
    setDateType(DEFAULT_DATE_TYPE);
    setSelectedStatuses([]);
    setSelectedMerchants([]);
    setSelectedActivities([]);
    setSelectedProviderNames([]);
    setSelectedPaymentMethods([]);
    setSelectedVATypes([]);
    setSelectedVAStatuses([]);
    setSelectedVABanks([]);
    setSelectedQRISAcquirers([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(DEFAULT_DATE_TYPE);
    setIsFilterOpen(false);
  }, [selectedPaymentMethodFromStore]);
  const allStatuses = useMemo(
    () => Array.from(new Set(MOCK_PAY_IN_TRANSACTIONS.map((item) => item.paymentStatus))),
    [],
  );
  const allMerchants = useMemo(
    () => Array.from(new Set(MOCK_PAY_IN_TRANSACTIONS.map((item) => item.merchantName))),
    [],
  );
  const allActivities = useMemo(
    () => Array.from(new Set(MOCK_PAY_IN_TRANSACTIONS.map((item) => item.activity))),
    [],
  );
  const allProviderNames = useMemo(
    () => Array.from(new Set(MOCK_PAY_IN_TRANSACTIONS.map((item) => item.providerName))),
    [],
  );
  const allPaymentMethods = useMemo(
    () => Array.from(new Set(MOCK_PAY_IN_TRANSACTIONS.map((item) => item.paymentMethod))),
    [],
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter],
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const statusesSet = selectedStatuses.length ? new Set(selectedStatuses) : null;
    const merchantsSet = selectedMerchants.length ? new Set(selectedMerchants) : null;
    const activitiesSet = selectedActivities.length ? new Set(selectedActivities) : null;
    const providerNamesSet = selectedProviderNames.length ? new Set(selectedProviderNames) : null;
    const storePaymentMethod = PAYMENT_METHOD_MAPPING[selectedPaymentMethodFromStore] || "";
    const selectedPaymentMethodsMapped = new Set<string>();
    const selectedPaymentChannels = new Set<string>();

    selectedPaymentMethods.forEach((filterId) => {
      if (PAYMENT_METHOD_FILTER_TO_DATA_MAPPING[filterId]) {
        selectedPaymentMethodsMapped.add(PAYMENT_METHOD_FILTER_TO_DATA_MAPPING[filterId]);
      } else if (PAYMENT_CHANNEL_FILTER_TO_DATA_MAPPING[filterId]) {
        selectedPaymentChannels.add(PAYMENT_CHANNEL_FILTER_TO_DATA_MAPPING[filterId]);
      }
    });

    return MOCK_PAY_IN_TRANSACTIONS.filter((row) => {
      if (normalizedSearch) {
        const target = row[searchField as keyof PayInTransaction];
        if (!target || !String(target).toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (statusesSet) {
        const mappedStatuses = Array.from(statusesSet).map(
          (filterId) => STATUS_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const statusesSetMapped = new Set(mappedStatuses);
        if (!statusesSetMapped.has(row.paymentStatus)) {
          return false;
        }
      }

      if (merchantsSet && !merchantsSet.has(row.merchantName)) {
        return false;
      }

      if (activitiesSet) {
        const mappedActivities = Array.from(activitiesSet).map(
          (filterId) => ACTIVITY_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const activitiesSetMapped = new Set(mappedActivities);
        if (!activitiesSetMapped.has(row.activity)) {
          return false;
        }
      }

      if (providerNamesSet) {
        const mappedProviderNames = Array.from(providerNamesSet).map(
          (filterId) => PROVIDER_NAME_FILTER_TO_DATA_MAPPING[filterId] || filterId
        );
        const providerNamesSetMapped = new Set(mappedProviderNames);
        if (!providerNamesSetMapped.has(row.providerName)) {
          return false;
        }
      }

      if (storePaymentMethod && row.paymentMethod !== storePaymentMethod) {
        return false;
      }

      if (!storePaymentMethod) {
        if (selectedPaymentMethodsMapped.size > 0) {
          if (!selectedPaymentMethodsMapped.has(row.paymentMethod)) {
            return false;
          }
        }
      }

      if (selectedPaymentChannels.size > 0) {
        if (!selectedPaymentChannels.has(row.paymentChannel)) {
          return false;
        }
      }

      if (storePaymentMethod === "Virtual Account") {
        if (selectedVATypes.length > 0) {
          const mappedVATypes = Array.from(selectedVATypes).map(
            (filterId) => VA_TYPE_FILTER_TO_DATA_MAPPING[filterId] || filterId
          );
          const vaTypesSet = new Set(mappedVATypes);
          if (!row.vaType || !vaTypesSet.has(row.vaType)) {
            return false;
          }
        }

        if (selectedVAStatuses.length > 0) {
          const mappedVAStatuses = Array.from(selectedVAStatuses).map(
            (filterId) => VA_STATUS_FILTER_TO_DATA_MAPPING[filterId] || filterId
          );
          const vaStatusesSet = new Set(mappedVAStatuses);
          if (!row.vaStatus || !vaStatusesSet.has(row.vaStatus)) {
            return false;
          }
        }

        if (selectedVABanks.length > 0) {
          const mappedVABanks = Array.from(selectedVABanks).map(
            (filterId) => VA_BANKS_FILTER_TO_DATA_MAPPING[filterId] || filterId
          );
          const vaBanksSet = new Set(mappedVABanks);
          if (!row.bankName || !vaBanksSet.has(row.bankName)) {
            return false;
          }
        }
      }

      if (storePaymentMethod === "QR Code") {
        if (selectedQRISAcquirers.length > 0) {
          const mappedAcquirers = Array.from(selectedQRISAcquirers).map(
            (filterId) => QRIS_ACQUIRER_FILTER_TO_DATA_MAPPING[filterId] || filterId
          );
          const acquirersSet = new Set(mappedAcquirers);
          if (!row.acquirerBank || !acquirersSet.has(row.acquirerBank)) {
            return false;
          }
        }
      }

      if (activeRange?.from) {
        const parsedDate = parse(row.transactionDate, DATA_DATE_FORMAT, new Date());
        if (isValid(parsedDate)) {
          const from = startOfDay(activeRange.from);
          const to = startOfDay(activeRange.to ?? activeRange.from);
          if (isBefore(parsedDate, from) || isAfter(parsedDate, endOfDay(to))) {
            return false;
          }
        }
      }

      return true;
    });
  }, [
    searchValue,
    searchField,
    selectedStatuses,
    selectedMerchants,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    activeRange,
    selectedPaymentMethodFromStore,
  ]);

  const filteredPaymentMethodOptions = useMemo(() => {
    if (selectedPaymentMethodFromStore === "all") {
      return PAY_IN_PAYMENT_METHOD_OPTIONS;
    }

    const dropdownToOptionId: Record<string, string> = {
      debit_credit_card: "debit-credit-card",
      e_wallet: "e-wallet",
      va: "virtual-account",
      qr_code: "qr-code",
    };

    const optionId = dropdownToOptionId[selectedPaymentMethodFromStore];
    if (!optionId) {
      return PAY_IN_PAYMENT_METHOD_OPTIONS;
    }

    return PAY_IN_PAYMENT_METHOD_OPTIONS.filter((option) => option.id === optionId);
  }, [selectedPaymentMethodFromStore]);

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    if (selectedPaymentMethodFromStore === "va") {
      return [
        buildSectionFromOptions("status", "Payment Status", PAY_IN_PAYMENT_STATUS_OPTIONS, selectedStatuses),
        buildSectionFromOptions("vaType", "VA Type", PAY_IN_VA_TYPE_OPTIONS, selectedVATypes),
        buildSectionFromOptions("vaStatus", "VA Status", PAY_IN_VA_STATUS_OPTIONS, selectedVAStatuses),
        buildSectionFromOptions("vaBanks", "Banks", PAY_IN_VA_BANKS_OPTIONS, selectedVABanks),
      ];
    }
    
    if (selectedPaymentMethodFromStore === "qr_code") {
      return [
        buildSectionFromOptions("status", "Payment Status", PAY_IN_PAYMENT_STATUS_OPTIONS, selectedStatuses),
        buildSectionFromOptions("qrisAcquirer", "Acquirer", PAY_IN_QRIS_ACQUIRER_OPTIONS, selectedQRISAcquirers),
      ];
    }
    
    return [
      buildSectionFromOptions("status", "Payment Status", PAY_IN_PAYMENT_STATUS_OPTIONS, selectedStatuses),
      buildSectionFromOptions("activity", "Activity", PAY_IN_ACTIVITY_OPTIONS, selectedActivities),
      buildSectionFromOptions("providerName", "Provider Name", PAY_IN_PROVIDER_NAME_OPTIONS, selectedProviderNames),
      buildSectionFromOptions("paymentMethod", "Payment Method", filteredPaymentMethodOptions, selectedPaymentMethods),
    ];
  }, [
    selectedPaymentMethodFromStore,
    selectedStatuses,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    filteredPaymentMethodOptions,
  ]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        selectedPaymentMethodFromStore,
        [...selectedStatuses].sort().join(","),
        [...selectedActivities].sort().join(","),
        [...selectedProviderNames].sort().join(","),
        [...selectedPaymentMethods].sort().join(","),
        [...selectedVATypes].sort().join(","),
        [...selectedVAStatuses].sort().join(","),
        [...selectedVABanks].sort().join(","),
        [...selectedQRISAcquirers].sort().join(","),
      ].join("|"),
    [
      dateType,
      activeDateFilter,
      selectedPaymentMethodFromStore,
      selectedStatuses,
      selectedActivities,
      selectedProviderNames,
      selectedPaymentMethods,
      selectedVATypes,
      selectedVAStatuses,
      selectedVABanks,
      selectedQRISAcquirers,
    ],
  );

  const handleFilterApply = useCallback((filters: FilterModalState) => {
    setActiveDateFilter(draftDateFilterString);
    setDateRange(draftDateRange);
    setDateType(draftDateType);
    setSelectedStatuses(collectCheckedValues(filters.sections?.status));
    
    if (selectedPaymentMethodFromStore === "va") {
      setSelectedVATypes(collectCheckedValues(filters.sections?.vaType));
      setSelectedVAStatuses(collectCheckedValues(filters.sections?.vaStatus));
      setSelectedVABanks(collectCheckedValues(filters.sections?.vaBanks));
    } else if (selectedPaymentMethodFromStore === "qr_code") {
      setSelectedQRISAcquirers(collectCheckedValues(filters.sections?.qrisAcquirer));
    } else {
    setSelectedActivities(collectCheckedValues(filters.sections?.activity));
    setSelectedProviderNames(collectCheckedValues(filters.sections?.providerName));
    setSelectedPaymentMethods(collectCheckedValues(filters.sections?.paymentMethod));
    }
  }, [draftDateFilterString, draftDateRange, draftDateType, selectedPaymentMethodFromStore]);

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedActivities([]);
    setSelectedProviderNames([]);
    setSelectedPaymentMethods([]);
    setSelectedVATypes([]);
    setSelectedVAStatuses([]);
    setSelectedVABanks([]);
    setSelectedQRISAcquirers([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(DEFAULT_DATE_TYPE);
  }, []);

  const openFilterModal = useCallback(() => {
    setDraftDateRange(dateRange);
    setDraftDateFilterString(formatDateRange(dateRange));
    setDraftDateType(dateType);
    setIsFilterOpen(true);
  }, [dateRange, dateType]);

  const handleRemoveDate = useCallback(() => {
    setActiveDateFilter("");
    setDateRange(undefined);
  }, []);

  const handleRemoveStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const handleRemoveActivity = useCallback(() => {
    setSelectedActivities([]);
  }, []);

  const handleRemoveProviderName = useCallback(() => {
    setSelectedProviderNames([]);
  }, []);

  const handleRemovePaymentMethod = useCallback(() => {
    setSelectedPaymentMethods([]);
  }, []);

  const handleRemoveVAType = useCallback(() => {
    setSelectedVATypes([]);
  }, []);

  const handleRemoveVAStatus = useCallback(() => {
    setSelectedVAStatuses([]);
  }, []);

  const handleRemoveVABanks = useCallback(() => {
    setSelectedVABanks([]);
  }, []);

  const handleRemoveQRISAcquirer = useCallback(() => {
    setSelectedQRISAcquirers([]);
  }, []);

  return {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
    dateType,
    activeDateFilter,
    selectedStatuses,
    selectedActivities,
    selectedProviderNames,
    selectedPaymentMethods,
    selectedVATypes,
    selectedVAStatuses,
    selectedVABanks,
    selectedQRISAcquirers,
    draftDateRange,
    setDraftDateRange,
    draftDateType,
    setDraftDateType,
    draftDateFilterString,
    setDraftDateFilterString,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveActivity,
    handleRemoveProviderName,
    handleRemovePaymentMethod,
    handleRemoveVAType,
    handleRemoveVAStatus,
    handleRemoveVABanks,
    handleRemoveQRISAcquirer,
  };
}


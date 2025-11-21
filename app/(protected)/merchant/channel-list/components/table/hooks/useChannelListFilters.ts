import { useState, useMemo, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import type {
  FilterModalState,
  FilterSectionConfig,
} from "@/components/reusable/table/components/modals";
import { startOfDay, endOfDay, isAfter, isBefore } from "date-fns";
import { ChannelData } from "../../../../types/channel";
import {
  CHANNEL_LIST_SEARCH_FIELDS,
  CHANNEL_LIST_DEFAULT_DATE_TYPE,
  CHANNEL_LIST_FILTER_LABELS,
  CHANNEL_LIST_FILTER_KEYS,
  CHANNEL_LIST_STATUS_OPTIONS,
  CHANNEL_LIST_PAYMENT_METHOD_OPTIONS,
  CHANNEL_LIST_PROVIDER_OPTIONS,
  CHANNEL_LIST_DATE_TYPE_OPTIONS,
  CHANNEL_LIST_PRICE_TYPE_OPTIONS,
  CHANNEL_LIST_PAYMENT_METHOD_DESCENDANTS,
} from "../../../core/constants";
import {
  formatDateRange,
  parseDateRangeString,
  collectCheckedValues,
  buildSectionFromOptions,
  parseRegisteredDate,
  parseUpdatedDate,
} from "../../../core/utils";

type PaymentPredicate = (row: ChannelData) => boolean;

const PAYMENT_METHOD_PREDICATES: Record<string, PaymentPredicate | undefined> = {
  "payment:qr-code": (row) => row.paymentMethod.type === "qr_code",
  "payment:qr-code:qris": (row) => row.channel.name === "QRIS",
  "payment:virtual-account": (row) => row.paymentMethod.type === "virtual_account",
  "payment:virtual-account:bca": (row) => row.channel.name === "BCA VA",
  "payment:virtual-account:mandiri": (row) => row.channel.name === "MANDIRI VA",
  "payment:virtual-account:bni": (row) => row.channel.name === "BNI VA",
  "payment:e-wallet": (row) => row.paymentMethod.type === "e_wallet",
  "payment:e-wallet:dana": (row) => row.channel.name === "DANA",
  "payment:e-wallet:ovo": (row) => row.channel.name === "OVO",
  "payment:e-wallet:linkaja": (row) => row.channel.name === "LinkAja",
  "payment:e-wallet:gopay": (row) => row.channel.name === "GoPay",
  "payment:e-wallet:paypal": (row) => row.channel.name === "PayPal",
  "payment:e-wallet:tcash": (row) => row.channel.name === "Tcash",
  "payment:e-wallet:jenius": (row) => row.channel.name === "Jenius",
  "payment:e-wallet:cash": (row) => row.channel.name === "Cash",
  "payment:e-wallet:alipay": (row) => row.channel.name === "Alipay",
  "payment:e-wallet:zelle": (row) => row.channel.name === "Zelle",
  "payment:debit-credit": (row) =>
    row.paymentMethod.type === "credit_card" || row.paymentMethod.type === "debit_card",
  "payment:debit-credit:debit": (row) => row.paymentMethod.type === "debit_card",
  "payment:debit-credit:credit": (row) => row.paymentMethod.type === "credit_card",
};

const determinePriceType = (value?: string): "mixed" | "fixed" | "percentage" => {
  if (!value) return "mixed";
  const normalized = value.toLowerCase();
  const hasPercent = normalized.includes("%");
  const hasCurrency =
    normalized.includes("idr") || normalized.includes("rp") || normalized.includes("id");
  if (hasPercent && hasCurrency) return "mixed";
  if (hasPercent) return "percentage";
  return "fixed";
};

const normalizePaymentSelections = (values: string[]): string[] => {
  const normalized = new Set(values);
  values.forEach((id) => {
    const descendants = CHANNEL_LIST_PAYMENT_METHOD_DESCENDANTS[id];
    if (!descendants || descendants.length === 0) {
      return;
    }
    const hasSelectedChild = descendants.some((childId) => normalized.has(childId));
    if (hasSelectedChild) {
      normalized.delete(id);
    }
  });
  return Array.from(normalized);
};

export function useChannelListFilters(data: ChannelData[]) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<string>(
    CHANNEL_LIST_SEARCH_FIELDS[0].value,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateType, setDateType] = useState<string>(CHANNEL_LIST_DEFAULT_DATE_TYPE);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("");

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedMdrPriceTypes, setSelectedMdrPriceTypes] = useState<string[]>([]);
  const [selectedSalesPriceTypes, setSelectedSalesPriceTypes] = useState<string[]>([]);
  const [selectedMerchantPriceTypes, setSelectedMerchantPriceTypes] = useState<string[]>(
    [],
  );

  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>(undefined);
  const [draftDateType, setDraftDateType] = useState<string>(CHANNEL_LIST_DEFAULT_DATE_TYPE);
  const [draftDateFilterString, setDraftDateFilterString] = useState<string>(
    formatDateRange(undefined),
  );

  const activeRange = useMemo(
    () => dateRange ?? parseDateRangeString(activeDateFilter),
    [dateRange, activeDateFilter],
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const statusSet = selectedStatuses.length ? new Set(selectedStatuses) : null;
    const providerSet = selectedProviders.length ? new Set(selectedProviders) : null;
    const mdrPriceSet = selectedMdrPriceTypes.length
      ? new Set(selectedMdrPriceTypes)
      : null;
    const salesPriceSet = selectedSalesPriceTypes.length
      ? new Set(selectedSalesPriceTypes)
      : null;
    const merchantPriceSet = selectedMerchantPriceTypes.length
      ? new Set(selectedMerchantPriceTypes)
      : null;

    const paymentPredicates =
      selectedPaymentMethods.length > 0
        ? selectedPaymentMethods
            .map((id) => PAYMENT_METHOD_PREDICATES[id])
            .filter((predicate): predicate is PaymentPredicate => Boolean(predicate))
        : null;

    return data.filter((row) => {
      if (normalizedSearch) {
        let fieldValue = "";
        switch (searchField) {
          case "clientId":
            fieldValue = row.clientId;
            break;
          case "provider":
            fieldValue = row.provider;
            break;
          default:
            fieldValue = row.merchantName;
        }

        if (!fieldValue?.toLowerCase().includes(normalizedSearch)) {
          return false;
        }
      }

      if (statusSet && !statusSet.has(row.status.status)) {
        return false;
      }

      if (paymentPredicates && paymentPredicates.length > 0) {
        const matchesPayment = paymentPredicates.some((predicate) => predicate(row));
        if (!matchesPayment) {
          return false;
        }
      }

      if (providerSet && !providerSet.has(row.provider)) {
        return false;
      }

      const mdrPriceType = determinePriceType(row.mdr);
      if (mdrPriceSet && !mdrPriceSet.has(mdrPriceType)) {
        return false;
      }

      const salesPriceType = determinePriceType(row.salesReferralFee);
      if (salesPriceSet && !salesPriceSet.has(salesPriceType)) {
        return false;
      }

      const merchantPriceType = determinePriceType(row.merchantReferralFee);
      if (merchantPriceSet && !merchantPriceSet.has(merchantPriceType)) {
        return false;
      }

      if (activeRange?.from) {
        const parsedDate =
          dateType === "updatedAt"
            ? parseUpdatedDate(row.updatedAt)
            : parseRegisteredDate(row.registeredDate);
        if (parsedDate) {
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
    data,
    searchValue,
    searchField,
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    activeRange,
    dateType,
  ]);

  const filterSections = useMemo<FilterSectionConfig[]>(() => {
    return [
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.STATUS,
        CHANNEL_LIST_FILTER_LABELS.STATUS,
        CHANNEL_LIST_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedStatuses,
      ),
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.PAYMENT_METHOD,
        CHANNEL_LIST_FILTER_LABELS.PAYMENT_METHOD,
        CHANNEL_LIST_PAYMENT_METHOD_OPTIONS,
        selectedPaymentMethods,
      ),
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.PROVIDER,
        CHANNEL_LIST_FILTER_LABELS.PROVIDER,
        CHANNEL_LIST_PROVIDER_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedProviders,
      ),
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.MDR_PRICE_TYPE,
        CHANNEL_LIST_FILTER_LABELS.MDR_PRICE_TYPE,
        CHANNEL_LIST_PRICE_TYPE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedMdrPriceTypes,
      ),
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.SALES_PRICE_TYPE,
        CHANNEL_LIST_FILTER_LABELS.SALES_PRICE_TYPE,
        CHANNEL_LIST_PRICE_TYPE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedSalesPriceTypes,
      ),
      buildSectionFromOptions(
        CHANNEL_LIST_FILTER_KEYS.MERCHANT_PRICE_TYPE,
        CHANNEL_LIST_FILTER_LABELS.MERCHANT_PRICE_TYPE,
        CHANNEL_LIST_PRICE_TYPE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
        selectedMerchantPriceTypes,
      ),
    ];
  }, [
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    selectedMdrPriceTypes,
    selectedSalesPriceTypes,
    selectedMerchantPriceTypes,
  ]);

  const filterModalKey = useMemo(
    () =>
      [
        dateType,
        activeDateFilter,
        [...selectedStatuses].sort().join(","),
        [...selectedPaymentMethods].sort().join(","),
        [...selectedProviders].sort().join(","),
        [...selectedMdrPriceTypes].sort().join(","),
        [...selectedSalesPriceTypes].sort().join(","),
        [...selectedMerchantPriceTypes].sort().join(","),
      ].join("|"),
    [
      dateType,
      activeDateFilter,
      selectedStatuses,
      selectedPaymentMethods,
      selectedProviders,
      selectedMdrPriceTypes,
      selectedSalesPriceTypes,
      selectedMerchantPriceTypes,
    ],
  );

  const handleFilterApply = useCallback(
    (filters: FilterModalState) => {
      setActiveDateFilter(draftDateFilterString);
      setDateRange(draftDateRange);
      setDateType(draftDateType);
      setSelectedStatuses(
        collectCheckedValues(filters.sections?.[CHANNEL_LIST_FILTER_KEYS.STATUS]),
      );
      setSelectedPaymentMethods(
        normalizePaymentSelections(
          collectCheckedValues(
            filters.sections?.[CHANNEL_LIST_FILTER_KEYS.PAYMENT_METHOD],
          ),
        ),
      );
      setSelectedProviders(
        collectCheckedValues(filters.sections?.[CHANNEL_LIST_FILTER_KEYS.PROVIDER]),
      );
      setSelectedMdrPriceTypes(
        collectCheckedValues(
          filters.sections?.[CHANNEL_LIST_FILTER_KEYS.MDR_PRICE_TYPE],
        ),
      );
      setSelectedSalesPriceTypes(
        collectCheckedValues(
          filters.sections?.[CHANNEL_LIST_FILTER_KEYS.SALES_PRICE_TYPE],
        ),
      );
      setSelectedMerchantPriceTypes(
        collectCheckedValues(
          filters.sections?.[CHANNEL_LIST_FILTER_KEYS.MERCHANT_PRICE_TYPE],
        ),
      );
    },
    [draftDateFilterString, draftDateRange, draftDateType],
  );

  const handleResetFilters = useCallback(() => {
    setDateRange(undefined);
    setDateType(CHANNEL_LIST_DEFAULT_DATE_TYPE);
    setActiveDateFilter("");
    setSelectedStatuses([]);
    setSelectedPaymentMethods([]);
    setSelectedProviders([]);
    setSelectedMdrPriceTypes([]);
    setSelectedSalesPriceTypes([]);
    setSelectedMerchantPriceTypes([]);
    setDraftDateRange(undefined);
    setDraftDateFilterString("");
    setDraftDateType(CHANNEL_LIST_DEFAULT_DATE_TYPE);
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

  const handleRemovePaymentMethod = useCallback(() => {
    setSelectedPaymentMethods([]);
  }, []);

  const handleRemoveProvider = useCallback(() => {
    setSelectedProviders([]);
  }, []);

  const handleRemoveMdrPriceType = useCallback(() => {
    setSelectedMdrPriceTypes([]);
  }, []);

  const handleRemoveSalesPriceType = useCallback(() => {
    setSelectedSalesPriceTypes([]);
  }, []);

  const handleRemoveMerchantPriceType = useCallback(() => {
    setSelectedMerchantPriceTypes([]);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeDateFilter) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedPaymentMethods.length > 0) count++;
    if (selectedProviders.length > 0) count++;
    if (selectedMdrPriceTypes.length > 0) count++;
    if (selectedSalesPriceTypes.length > 0) count++;
    if (selectedMerchantPriceTypes.length > 0) count++;
    return count;
  }, [
    activeDateFilter,
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    selectedMdrPriceTypes,
    selectedSalesPriceTypes,
    selectedMerchantPriceTypes,
  ]);

  return {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    isFilterOpen,
    setIsFilterOpen,
    isExportOpen,
    setIsExportOpen,
    draftDateFilterString,
    setDraftDateFilterString,
    draftDateType,
    setDraftDateType,
    draftDateRange,
    setDraftDateRange,
    filteredData,
    filterSections,
    filterModalKey,
    handleFilterApply,
    handleResetFilters,
    openFilterModal,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemovePaymentMethod,
    handleRemoveProvider,
    handleRemoveMdrPriceType,
    handleRemoveSalesPriceType,
    handleRemoveMerchantPriceType,
    activeDateFilter,
    selectedStatuses,
    selectedPaymentMethods,
    selectedProviders,
    selectedMdrPriceTypes,
    selectedSalesPriceTypes,
    selectedMerchantPriceTypes,
    dateType,
    activeFilterCount,
  };
}


"use client";

import { useMemo, useCallback, useState } from "react";
import { DataTable } from "@/components/reusable/table";
import { KeenIcon } from "@/components/keenicons";
import {
  FilterModal,
  ExportModal,
} from "@/components/reusable/table/components/modals";
import { ModalApproval } from "@/components/shared/modals/modal-approved";
import { ModalSubmit } from "@/components/shared/modals/modal-submit";
import { ModalReject } from "@/components/shared/modals/modal-reject";
import { MerchantReviewData } from "../../core";
import { useMerchantReviewTableColumns } from "./merchant-review-table-columns";
import { useMerchantReviewTableFilters } from "./hooks/useMerchantReviewTableFilters";
import {
  MERCHANT_REVIEW_SEARCH_FIELDS,
  MERCHANT_REVIEW_SEARCH_PLACEHOLDER,
  MERCHANT_REVIEW_TOOLBAR_ACTIONS,
  MERCHANT_REVIEW_EMPTY_STATE,
  MERCHANT_REVIEW_PAGE_SIZE,
  MERCHANT_REVIEW_PAGE_SIZE_OPTIONS,
  MERCHANT_REVIEW_DATA_GRID_OPTIONS,
  MERCHANT_REVIEW_DATE_TYPE_OPTIONS,
  MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
  MERCHANT_REVIEW_FILTER_LABELS,
  MERCHANT_REVIEW_STATUS_OPTIONS,
  MERCHANT_REVIEW_LEVEL_OPTIONS,
} from "../../core/constants";

interface MerchantReviewTableProps {
  data: MerchantReviewData[];
  onView?: (merchant: MerchantReviewData) => void;
  onApprove?: (merchant: MerchantReviewData) => void;
  onReject?: (merchant: MerchantReviewData) => void;
  onContinueDraft?: (merchant: MerchantReviewData) => void;
  onSelectionChange?: (selectedMerchants: MerchantReviewData[]) => void;
  loading?: boolean;
  error?: string;
  activeTab?: string;
}

export function MerchantReviewTable({
  data,
  onView,
  onApprove,
  onReject,
  onContinueDraft,
  onSelectionChange,
  loading = false,
  error,
  activeTab = 'new-merchant',
}: MerchantReviewTableProps) {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedMerchantForApproval, setSelectedMerchantForApproval] = useState<MerchantReviewData | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedMerchantForReject, setSelectedMerchantForReject] = useState<MerchantReviewData | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isRejectSuccessModalOpen, setIsRejectSuccessModalOpen] = useState(false);

  const {
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
    handleRemoveLevel,
    activeDateFilter,
    selectedReviewStatuses,
    selectedLevels,
    dateType,
    activeFilterCount,
  } = useMerchantReviewTableFilters(data);

  const columns = useMerchantReviewTableColumns(activeTab);

  const handleOpenApprovalModal = useCallback((merchant: MerchantReviewData) => {
    setSelectedMerchantForApproval(merchant);
    setIsApprovalModalOpen(true);
  }, []);

  const handleConfirmApprove = useCallback(async () => {
    if (!selectedMerchantForApproval) return;
    
    setIsApproving(true);
    try {
      await onApprove?.(selectedMerchantForApproval);
      setIsApprovalModalOpen(false);
      setSelectedMerchantForApproval(null);
      // Show success modal after approval
      setIsSuccessModalOpen(true);
    } catch (err) {
      // Error handling is done by parent component
    } finally {
      setIsApproving(false);
    }
  }, [selectedMerchantForApproval, onApprove]);

  const handleCancelApproval = useCallback(() => {
    setIsApprovalModalOpen(false);
    setSelectedMerchantForApproval(null);
  }, []);

  const handleOpenRejectModal = useCallback((merchant: MerchantReviewData) => {
    setSelectedMerchantForReject(merchant);
    setIsRejectModalOpen(true);
  }, []);

  const handleConfirmReject = useCallback(async (reason: string) => {
    if (!selectedMerchantForReject) return;
    
    setIsRejecting(true);
    try {
      // Call onReject with merchant and reason
      // Note: onReject might need to be updated to accept reason parameter
      await onReject?.(selectedMerchantForReject);
      setIsRejectModalOpen(false);
      setSelectedMerchantForReject(null);
      // Show success modal after rejection
      setIsRejectSuccessModalOpen(true);
    } catch (err) {
      // Error handling is done by parent component
    } finally {
      setIsRejecting(false);
    }
  }, [selectedMerchantForReject, onReject]);

  const handleCancelReject = useCallback(() => {
    setIsRejectModalOpen(false);
    setSelectedMerchantForReject(null);
  }, []);

  const actionConfig = useMemo(
    () => ({
      showDropdown: true,
      actions: [
        {
          label: "See Detail",
          icon: <KeenIcon icon="eye" style="outline" className="h-4 w-4 text-gray-600" />,
          onClick: (row: { original: MerchantReviewData }) => onView?.(row.original),
        },
        {
          label: "Continue Draft",
          icon: <KeenIcon icon="notepad-edit" style="outline" className="h-4 w-4 text-gray-600" />,
          onClick: (row: { original: MerchantReviewData }) => onContinueDraft?.(row.original),
          separatorAfter: true,
        },
        {
          label: "Approve Merchant",
          icon: <KeenIcon icon="check-circle" style="outline" className="h-4 w-4 text-green-600" />,
          onClick: (row: { original: MerchantReviewData }) => handleOpenApprovalModal(row.original),
          show: (row: { original: MerchantReviewData }) =>
            row.original.reviewStatus === "pending-review",
          className: "text-green-600",
        },
        {
          label: "Reject Merchant",
          icon: <KeenIcon icon="cross-circle" style="outline" className="h-4 w-4 text-red-600" />,
          onClick: (row: { original: MerchantReviewData }) => handleOpenRejectModal(row.original),
          show: (row: { original: MerchantReviewData }) =>
            row.original.reviewStatus === "pending-review",
          variant: "destructive" as const,
          className: "text-red-600",
        },
      ],
    }),
    [onView, onContinueDraft, handleOpenApprovalModal, handleOpenRejectModal],
  );

  const toolbarActions = useMemo(
    () =>
      MERCHANT_REVIEW_TOOLBAR_ACTIONS.map((action) => ({
        ...action,
        onClick:
          action.id === "filter"
            ? openFilterModal
            : () => {
                setIsExportOpen(true);
              },
      })),
    [openFilterModal, setIsExportOpen],
  );

  const headerTags = useMemo(() => {
    const tags = [];
    if (activeDateFilter) {
      const label =
        MERCHANT_REVIEW_DATE_TYPE_OPTIONS.find((option) => option.value === dateType)
          ?.label ?? MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER;
      tags.push({
        id: "date-filter",
        label,
        value: activeDateFilter,
        onRemove: handleRemoveDate,
      });
    }
    if (selectedReviewStatuses.length > 0) {
      const labels = MERCHANT_REVIEW_STATUS_OPTIONS.filter((option) =>
        selectedReviewStatuses.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "review-status-filter",
        label: MERCHANT_REVIEW_FILTER_LABELS.REVIEW_STATUS,
        value: labels.join(", "),
        onRemove: handleRemoveStatus,
      });
    }
    if (selectedLevels.length > 0) {
      const labels = MERCHANT_REVIEW_LEVEL_OPTIONS.filter((option) =>
        selectedLevels.includes(option.value),
      ).map((option) => option.label);
      tags.push({
        id: "merchant-level-filter",
        label: MERCHANT_REVIEW_FILTER_LABELS.MERCHANT_LEVEL,
        value: labels.join(", "),
        onRemove: handleRemoveLevel,
      });
    }
    return tags;
  }, [
    activeDateFilter,
    dateType,
    handleRemoveDate,
    handleRemoveStatus,
    handleRemoveLevel,
    selectedReviewStatuses,
    selectedLevels,
  ]);

  const handleExport = useCallback((format: string, email: string) => {
    console.log("Export merchant review table", { format, email });
  }, []);

  return (
    <>
      <DataTable<MerchantReviewData>
        data={filteredData}
        columns={columns}
        header={{
          title: "Merchant Review",
          description: "Monitor and manage merchant review progress",
          tags: headerTags,
        }}
        toolbar={{
          search: {
            placeholder: MERCHANT_REVIEW_SEARCH_PLACEHOLDER,
            value: searchValue,
            onChange: setSearchValue,
            fields: [...MERCHANT_REVIEW_SEARCH_FIELDS],
            selectedField: searchField,
            onFieldChange: setSearchField,
          },
          actions: toolbarActions,
          showColumnVisibility: true,
          activeFilterCount,
          onClearFilters: handleResetFilters,
        }}
        emptyState={{
          title:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_REVIEW_EMPTY_STATE.filteredTitle
              : MERCHANT_REVIEW_EMPTY_STATE.defaultTitle,
          description:
            activeFilterCount > 0 || searchValue.trim()
              ? MERCHANT_REVIEW_EMPTY_STATE.filteredDescription
              : MERCHANT_REVIEW_EMPTY_STATE.defaultDescription,
          hasActiveFilters: activeFilterCount > 0 || searchValue.trim().length > 0,
        }}
        pagination={{
          totalItems: filteredData.length,
          page: 1,
          pageSize: MERCHANT_REVIEW_PAGE_SIZE,
          pageSizeOptions: [...MERCHANT_REVIEW_PAGE_SIZE_OPTIONS],
        }}
        enableRowSelection={Boolean(onSelectionChange)}
        onSelectionChange={onSelectionChange}
        onRowClick={onView}
        loading={loading}
        error={error}
        actionConfig={actionConfig}
        dataGridOptions={MERCHANT_REVIEW_DATA_GRID_OPTIONS}
      />

      <FilterModal
        key={filterModalKey}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dateFilter={{
          value: draftDateFilterString,
          dateType: draftDateType,
          dateRange: draftDateRange,
          onDateChange: setDraftDateFilterString,
          onDateTypeChange: setDraftDateType,
          onDateRangeChange: setDraftDateRange,
          onClear: () => {
            setDraftDateFilterString("");
            setDraftDateRange(undefined);
          },
          placeholder: MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
          presetDisplayValue:
            draftDateFilterString || MERCHANT_REVIEW_DATE_FILTER_PLACEHOLDER,
          dateTypeOptions: MERCHANT_REVIEW_DATE_TYPE_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          })),
        }}
        sections={filterSections}
        onReset={handleResetFilters}
        onApply={handleFilterApply}
      />

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export Merchant Review"
        description="Download the merchant review table data"
        onExport={handleExport}
      />

      {/* Approval Confirmation Modal */}
      <ModalApproval
        open={isApprovalModalOpen}
        onOpenChange={setIsApprovalModalOpen}
        headerTitle="Approve Confirmation"
        title="Approve Merchant Request?"
        description="Please review the details before proceeding."
        onApprove={handleConfirmApprove}
        onCancel={handleCancelApproval}
        isLoading={isApproving}
      />

      {/* Success Modal */}
      <ModalSubmit
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        title="Merchant Approved"
        imageSrc="/media/illustrations/32.svg"
        imageAlt="Merchant approved successfully"
        imageWidth={200}
        imageHeight={188}
        message="Merchant Approved Successfully!"
        description="This merchant has been successfully approved and is now active"
        buttonText="Okay!"
      />

      {/* Reject Confirmation Modal */}
      <ModalReject
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        headerTitle="Reject Confirmation"
        title="Are You Sure You Want to Reject This Merchant?"
        description="Once rejected, this merchant will be deleted."
        onReject={handleConfirmReject}
        onCancel={handleCancelReject}
        isLoading={isRejecting}
      />

      {/* Reject Success Modal */}
      <ModalSubmit
        open={isRejectSuccessModalOpen}
        onOpenChange={setIsRejectSuccessModalOpen}
        title="Merchant Rejected"
        imageSrc="/media/illustrations/10.svg"
        imageAlt="Merchant rejected successfully"
        imageWidth={200}
        imageHeight={188}
        message="Merchant Rejected!"
        description="This merchant has been rejected and deleted."
        buttonText="Okay!"
      />
    </>
  );
}

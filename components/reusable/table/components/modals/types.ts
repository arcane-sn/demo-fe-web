"use client";

import { ReactNode } from "react";
import type { DateRange } from "react-day-picker";

/**
 * Checkbox option structure for filter sections
 */
export interface FilterCheckboxOption {
  id: string;
  label: string;
  checked?: boolean;
  children?: FilterCheckboxOption[];
}

/**
 * Date filter configuration
 */
export interface FilterDateConfig {
  label?: string;
  placeholder?: string;
  presetDisplayValue?: string;
  value?: string;
  dateType?: string;
  dateTypeOptions?: Array<{ label: string; value: string }>;
  onClear?: () => void;
  onDateChange?: (date: string) => void;
  onDateTypeChange?: (dateType: string) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range?: DateRange) => void;
}

/**
 * Filter section configuration
 */
export interface FilterSectionConfig {
  id: string;
  title: string;
  options: FilterCheckboxOption[];
  onOptionChange: (optionId: string, checked: boolean) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  defaultExpanded?: string[];
}

/**
 * Filter modal props
 */
export interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  dateFilter?: FilterDateConfig;
  sections: FilterSectionConfig[];
  onReset?: () => void;
  onApply?: (filters: FilterModalState) => void;
  showResetButton?: boolean;
  resetButtonText?: string;
  applyButtonText?: string;
}

/**
 * Filter modal state
 */
export interface FilterModalState {
  dateFilter?: string;
  sections: Record<string, FilterCheckboxOption[]>;
}

/**
 * Export file format option
 */
export interface ExportFileFormat {
  id: string;
  label: string;
  icon: ReactNode;
}

/**
 * Export modal props
 */
export interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  formats?: ExportFileFormat[];
  defaultFormat?: string;
  defaultEmail?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  description?: string;
  onExport?: (format: string, email: string) => void;
  cancelButtonText?: string;
  exportButtonText?: string;
}


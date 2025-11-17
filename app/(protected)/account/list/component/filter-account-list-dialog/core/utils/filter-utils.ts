import { FilterFormData, FilterOption } from "../types";

// Handle select all functionality
export const handleSelectAll = (
  fieldName: keyof FilterFormData,
  setFieldValue: (field: string, value: any) => void,
  initialValues: FilterFormData
) => {
  const field = initialValues[fieldName] as FilterOption[];
  const updatedField = field.map((item) => ({ ...item, value: true }));
  setFieldValue(fieldName, updatedField);
};

// Handle clear functionality
export const handleClear = (
  fieldName: keyof FilterFormData,
  setFieldValue: (field: string, value: any) => void,
  initialValues: FilterFormData
) => {
  const field = initialValues[fieldName] as FilterOption[];
  const updatedField = field.map((item) => ({ ...item, value: false }));
  setFieldValue(fieldName, updatedField);
};

// Check if any items are selected in a field
export const hasAnySelected = (field: FilterOption[]) => {
  return field.some((item) => item.value);
};

// Check if all items are selected in a field
export const hasAllSelected = (field: FilterOption[]) => {
  return field.every((item) => item.value);
};

// Get selected count for a field
export const getSelectedCount = (field: FilterOption[]) => {
  return field.filter((item) => item.value).length;
};

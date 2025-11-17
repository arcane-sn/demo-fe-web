// Filter option interface
export interface FilterOption {
  label: string;
  id: string;
  value: boolean;
}

// Main filter form data interface
export interface FilterFormData {
  dateFilterMode: "created_date" | "updated_date" | "last_login_date";
  dateStart: string;
  dateEnd: string;
  accessLevel: FilterOption[];
  role: FilterOption[];
  accountStatus: FilterOption[];
  additionalStatus: FilterOption[];
}

// Dialog props interface
export interface FilterAccountListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilter: (filters: FilterFormData) => void;
  onReset: () => void;
}

// Section component props interface
export interface FilterSectionProps {
  values: FilterFormData;
  setFieldValue: (field: string, value: any) => void;
}

// Checkbox group props interface
export interface CheckboxGroupProps {
  fieldName: keyof FilterFormData;
  title: string;
  options: FilterOption[];
  values: FilterFormData;
  setFieldValue: (field: string, value: any) => void;
}

// Date filter props interface
export interface DateFilterProps {
  values: FilterFormData;
  setFieldValue: (field: string, value: any) => void;
}

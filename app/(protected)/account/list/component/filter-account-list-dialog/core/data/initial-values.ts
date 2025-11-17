import { FilterFormData } from "../types";

// Initial form data
export const initialValues: FilterFormData = {
  dateFilterMode: "created_date",
  dateStart: "",
  dateEnd: "",
  accessLevel: [
    { label: "Internal", id: "internal", value: false },
    { label: "Parent & Sub-Merchant", id: "parent", value: false },
    { label: "Own Merchant Only", id: "merchant", value: false },
  ],
  role: [
    { label: "Super Admin", id: "super_admin", value: false },
    { label: "Admin", id: "admin", value: false },
    { label: "Maker", id: "maker", value: false },
    { label: "Approver", id: "approver", value: false },
  ],
  accountStatus: [
    { label: "Active", id: "active", value: false },
    { label: "Inactive", id: "inactive", value: false },
  ],
  additionalStatus: [
    { label: "Need Confirmation", id: "need_confirmation", value: false },
    { label: "Deleted", id: "deleted", value: false },
    { label: "Updated", id: "updated", value: false },
  ],
};

import { useTableFilters } from "./useTableFilters";
import {
  USER_MANAGEMENT_FILTER_KEYS,
  USER_MANAGEMENT_FILTER_LABELS,
  USER_MANAGEMENT_SEARCH_FIELDS,
  USER_MANAGEMENT_STATUS_OPTIONS,
  USER_MANAGEMENT_DEFAULT_DATE_TYPE,
  USER_MANAGEMENT_ROLE_OPTIONS,
} from "../../../../core/constants";
import { UserData } from "../types";

export function useUserManagementFilters(data: UserData[]) {
  return useTableFilters<UserData>({
    data,
    defaultSearchField: USER_MANAGEMENT_SEARCH_FIELDS[0].value,
    defaultDateType: USER_MANAGEMENT_DEFAULT_DATE_TYPE,
    filterSections: {
      status: {
        key: USER_MANAGEMENT_FILTER_KEYS.STATUS,
        label: USER_MANAGEMENT_FILTER_LABELS.STATUS,
        options: USER_MANAGEMENT_STATUS_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
      role: {
        key: USER_MANAGEMENT_FILTER_KEYS.ROLE,
        label: USER_MANAGEMENT_FILTER_LABELS.ROLE,
        options: USER_MANAGEMENT_ROLE_OPTIONS.map((option) => ({
          id: option.value,
          label: option.label,
        })),
      },
    },
    searchResolver: (row, field, value) => {
      const normalized = value.toLowerCase();
      if (field === "userID") {
        return row.userID?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "name") {
        return row.name?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "email") {
        return row.email?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "userName") {
        return row.userName?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "phoneNumber") {
        return row.phoneNumber?.toLowerCase().includes(normalized) ?? false;
      }
      if (field === "clientID") {
        return row.clientID?.toLowerCase().includes(normalized) ?? false;
      }
      return false;
    },
    dateResolver: (row, dateType) => {
      if (dateType === "createdDate") return row.createdDate;
      if (dateType === "updateDate") return row.updateDate;
      if (dateType === "loginDate") return row.loginDate;
      return row.createdDate;
    },
    statusResolver: (row, selectedStatuses) => {
      return selectedStatuses.includes(row.accountStatus);
    },
  });
}


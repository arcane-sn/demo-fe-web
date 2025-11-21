import { FormikProps } from "formik";
import { CreateAccountFormValues } from "../../../core/model";

export interface AccountRoleProps {
  formik: FormikProps<CreateAccountFormValues>;
}

export interface SelectionItemProps {
  dataArray: ItemDataProps[];
  groupValue: string;
  groupKey: string; // The key (string) inside groupValue to check
}

export interface ItemDataProps {
  label: string;
  value: string;
  description: string;
}

export interface AccountRoleProps {
  groupValue: {
    accessLevel: string;
    role: string;
    asignToMerchant: string;
  };
  setValue: (
    label: keyof AccountRoleProps["groupValue"],
    value: string
  ) => void;
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

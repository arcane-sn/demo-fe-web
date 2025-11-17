import { AccountData } from "../../../account-list-table/core/types";

interface AccountDetailsDialogProps {
  visible: boolean;
  close: () => void;
  accountData?: AccountData;
}

export type { AccountDetailsDialogProps };

import { UserData } from "../../../../user-list-table/core/types";

interface AccountDetailsDialogProps {
  visible: boolean;
  close: () => void;
  accountData?: UserData;
}

export type { AccountDetailsDialogProps };

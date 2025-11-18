import {
  EllipsisVertical,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { usePayinStore } from "../hooks/usePayinStore";
import { TRANSACTION_ACTIONS } from "../core/_consts";
import type { IsModalPayIn } from "../core/_models";
import { KeenIcon } from "@/components/keenicons";

// Mapping action value to modal key
const ACTION_TO_MODAL_KEY: Record<string, keyof IsModalPayIn> = {
  resend_callback: "resendCallback",
  force_update_status: "forceUpdateStatus",
  refund: "refundRequest",
  chargeback: "chargebackRequest",
  void: "voidTransaction",
  cancel: "cancelTransaction",
};

const FIRST_GROUP_ACTIONS = ["resend_callback", "force_update_status"];

const DESTRUCTIVE_ACTIONS = ["cancel"];

interface DropdownActionPayinProps {
  isInsideTable?: boolean;
  onAction?: (value: string) => void;
  triggerClassName?: string;
  alwaysEnabled?: boolean; // For detail page, always enable dropdown
}

const DropdownActionPayin = ({ 
  isInsideTable = false,
  onAction,
  triggerClassName,
  alwaysEnabled = false,
}: DropdownActionPayinProps) => {
  const setModal = usePayinStore((state) => state.setModal);
  const selectedCount = usePayinStore(
    (state) => state.selectedTransactions.length
  );

  // If onAction is provided, skip store-based logic (for detail page)
  const useStoreLogic = !onAction;
  // For detail page (when triggerClassName is provided or alwaysEnabled), don't disable based on selectedCount
  // Only disable for list page toolbar without selection
  // Detail page: triggerClassName provided or alwaysEnabled, so isDisabled = false
  // List page toolbar: no triggerClassName, selectedCount === 0, so isDisabled = true
  const isDisabled = !alwaysEnabled && useStoreLogic && !isInsideTable && selectedCount === 0 && !triggerClassName;

  const renderTrigger = () => {
    if (isInsideTable) {
      return (
        <div
          className="p-1.5 border border-border bg-background rounded-md flex items-center justify-center cursor-pointer hover:bg-accent"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVertical className="size-4" />
        </div>
      );
    }

    return (
      <Button
        variant="outline"
        size="sm"
        disabled={isDisabled}
        className={triggerClassName || "w-28 justify-center gap-1.5 text-blue-500 text-xs font-medium bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"}
      >
        Action
        <ChevronDown className="size-3.5" />
      </Button>
    );
  };

  const handleAction = (actionValue: string) => {
    if (onAction) {
      // Use callback if provided (for detail page)
      onAction(actionValue);
    } else {
      // Use store-based modal logic (for list page or detail page)
      const modalKey = ACTION_TO_MODAL_KEY[actionValue];
      if (modalKey) {
        // Always allow opening modal if:
        // 1. Inside table (always allow)
        // 2. selectedCount > 0 (list page with selection)
        // 3. Button is enabled (for detail page, button is enabled even if selectedCount is 0)
        // Note: For detail page, we want to always allow opening modal
        // The disabled check is only for UI, but we allow action if button is clickable
        if (isInsideTable || selectedCount > 0) {
          setModal(modalKey, true);
        } else if (!isDisabled) {
          // For detail page (button not disabled), always allow
          setModal(modalKey, true);
        }
      }
    }
  };

  const firstGroupActions = TRANSACTION_ACTIONS.filter((action) =>
    FIRST_GROUP_ACTIONS.includes(action.value)
  );
  const secondGroupActions = TRANSACTION_ACTIONS.filter(
    (action) => !FIRST_GROUP_ACTIONS.includes(action.value)
  );

  const renderActionItem = (action: (typeof TRANSACTION_ACTIONS)[number]) => {
    const modalKey = ACTION_TO_MODAL_KEY[action.value];
    const isDestructive = DESTRUCTIVE_ACTIONS.includes(action.value);
    const isCancel = action.value === "cancel";

    // If using callback, don't filter by modalKey
    if (useStoreLogic && !modalKey) return null;

    // Only disable menu items for list page toolbar without selection
    // For detail page (triggerClassName provided or alwaysEnabled) or inside table, always enable
    const isMenuItemDisabled = !alwaysEnabled && useStoreLogic && !isInsideTable && selectedCount === 0 && !triggerClassName;

    return (
      <DropdownMenuItem
        key={action.value}
        disabled={isMenuItemDisabled}
        variant={isDestructive ? "destructive" : undefined}
        onClick={() => handleAction(action.value)}
      >
        <div className="flex items-center justify-center w-5 h-5 ">
          <KeenIcon
            icon={action.icon}
            style="outline"
            className={isCancel ? "size-4" : "size-4 text-slate-700"}
          />
        </div>
        <span
          className={
            isCancel
              ? "text-sm font-medium"
              : "text-slate-700 text-sm font-medium"
          }
        >
          {action.label}
        </span>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[220px] p-2">
        {firstGroupActions.length > 0 && (
          <DropdownMenuGroup>
            {firstGroupActions.map(renderActionItem)}
          </DropdownMenuGroup>
        )}
        {firstGroupActions.length > 0 && secondGroupActions.length > 0 && (
          <DropdownMenuSeparator />
        )}
        {secondGroupActions.map(renderActionItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActionPayin;

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { usePayoutStore } from "../hooks/usePayoutStore";
import { Button } from "@/components/ui/button";

const DropdownActionPayout = ({
  isInsideTable,
}: {
  isInsideTable: boolean;
}) => {
  const setModal = usePayoutStore((state) => state.setModal);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isInsideTable ? (
          <div className="p-1.5 border border-border bg-background rounded-md flex items-center justify-center cursor-pointer hover:bg-accent">
            <EllipsisVertical className="size-4" />
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-24 bg-primary-light opacity-50 text-blue-500 text-xs py-4"
          >
            Action
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setModal("responseVendor", true)}>
            Resend Callback
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("forceUpdateStatus", true)}>
            Force Update Status
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActionPayout;

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HexagonBadge } from "@/app/components/partials/common/hexagon-badge";

const ModalUpdateStatus = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (status: string) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Reset status when modal opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedStatus("");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="pb-5 border-b border-gray-200">
          <DialogTitle className="text-b-14-14-600 text-gray-800">
            Update Status
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-5 pb-5 px-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="w-40 h-40 flex items-center justify-center">
              <img
                src="/media/illustrations/29.svg"
                alt="Confirmation illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-b-16-16-500 text-center text-gray-900">
              Change Transaction Status?
            </p>
            <p className="text-b-13-20-400 text-center text-gray-600">
              Force update the transaction status when the response and
              transaction record do not match. Ensure the callback response
              aligns with the status you are setting.
            </p>
          </div>

          <Separator />
          <div className="flex justify-between items-center gap-8">
            <p className="text-b-13-14-400 text-gray-800">Status</p>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Request">Request</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-50">
            <div className="flex-shrink-0">
              <HexagonBadge
                size="size-[44px]"
                stroke="stroke-yellow-400"
                fill="fill-yellow-100"
                badge={
                  <span className="text-yellow-400 text-2xl font-bold leading-none">!</span>
                }
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h4 className="text-b-15-16-600 text-gray-800 font-semibold">
                Review Before Update
              </h4>
              <p className="text-b-13-20-500 text-gray-600">
                Please review the transaction details carefully before updating
                the status. The updated status will take immediate effect on the
                merchant's side
              </p>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="border-t border-gray-200">
          <DialogClose asChild>
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            variant="primary" 
            onClick={() => {
              if (selectedStatus) {
                onSubmit(selectedStatus);
              }
            }} 
            size="md"
            disabled={!selectedStatus}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateStatus;

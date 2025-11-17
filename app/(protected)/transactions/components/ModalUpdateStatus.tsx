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
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertTriangle, BadgeInfo } from "lucide-react";

const ModalUpdateStatus = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="pb-5 border-b border-gray-200">
          <DialogTitle className="text-b-14-14-600 text-gray-800">
            Update Status
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-5 pb-5">
          <img
            src="/media/illustrations/29.svg"
            alt="Confirmation illustration"
            className="w-full h-full object-contain mb-5 text-center"
          />
          <div>
            <p className="text-b-16-16-500 text-center text-gray-900 mb-1">
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
            <p className="text-b-13-14-400 text-gray-800">Category</p>
            <Select
            // value={params.category || undefined}
            // onValueChange={(value) =>
            //   updateParams({ category: value || undefined })
            // }
            >
              <SelectTrigger>
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

          <Alert variant="warning" appearance="light" size="md">
            <AlertIcon>
              <BadgeInfo className="h-7 w-7" />
            </AlertIcon>
            <AlertContent>
              <AlertTitle className="text-b-15-16-600 text-gray-800">
                Review Before Update
              </AlertTitle>
              <AlertDescription className="text-b-13-20-500 text-gray-600">
                Please review the transaction details carefully before updating
                the status. The updated status will take immediate effect on the
                merchant's side
              </AlertDescription>
            </AlertContent>
          </Alert>
        </DialogBody>

        <DialogFooter className="border-t border-gray-200">
          <DialogClose asChild>
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" onClick={onSubmit} size="md">
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateStatus;

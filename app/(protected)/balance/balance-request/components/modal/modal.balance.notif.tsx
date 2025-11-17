import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const ModalBalanceNotif = ({
  open,
  onClose,
  status,
  isMultiple = false,
  activityType,
}: {
  open: boolean;
  onClose: () => void;
  status: string;
  isMultiple?: boolean;
  activityType?: string;
}) => {
  const getTitle = () => {
    if (status === "approved") {
      if (isMultiple) {
        return "All Selected Requests Approved!";
      }
      return `${activityType || "[Activity Type]"} Request Approved!`;
    } else {
      if (isMultiple) {
        return "All Selected Requests Rejected!";
      }
      return `${activityType || "[Activity Type]"} Request Rejected!`;
    }
  };

  const getDescription = () => {
    if (status === "approved") {
      if (isMultiple) {
        return "All selected requests have been successfully approved";
      }
      return "The request has been successfully approved";
    } else {
      if (isMultiple) {
        return "All selected requests have been rejected";
      }
      return "The request has been rejected";
    }
  };

  const getDialogTitle = () => {
    if (status === "approved") {
      return "Request Approved";
    }
    return "Request Rejected";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-[460px] flex flex-col  items-center justify-center mt-5">
            <Image
              src={
                status === "approved"
                  ? "/assets/image/approved.svg"
                  : "/assets/image/rejected.svg"
              }
              alt={status === "approved" ? "approved" : "rejected"}
              width={100}
              height={100}
            />
            <div className="mt-4 text-center text-slate-900 text-base font-medium font-['Inter'] leading-none">
              {getTitle()}
            </div>
            <div className="mt-2 self-stretch text-center text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
              {getDescription()}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Button onClick={onClose} className="px-6 w-full">
              Okay!
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceNotif;

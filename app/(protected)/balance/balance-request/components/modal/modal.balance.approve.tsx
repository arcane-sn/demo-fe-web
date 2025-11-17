import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const ModalBalanceApprove = ({
  open,
  onClose,
  handleApprove,
  isMultiple = false,
  activityType,
}: {
  open: boolean;
  onClose: () => void;
  handleApprove: () => void;
  isMultiple?: boolean;
  activityType?: string;
}) => {
  const getTitle = () => {
    if (isMultiple) {
      return "Approve All Selected Requests?";
    }
    return `Approve ${activityType || "[Activity Type]"} Request?`;
  };

  const getDescription = () => {
    if (isMultiple) {
      return "Please review all the details before proceeding.";
    }
    return "Please review the details before proceeding.";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Confirmation</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-[460px] flex flex-col  items-center justify-center mt-5">
            <Image
              src="/assets/image/confirmation.svg"
              alt="approve"
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
            <Button variant="outline" onClick={onClose} className="px-3">
              Cancel
            </Button>
            <Button onClick={handleApprove} className="px-6">
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceApprove;

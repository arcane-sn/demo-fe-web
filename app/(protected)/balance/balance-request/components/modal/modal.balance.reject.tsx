import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const ModalBalanceReject = ({
  open,
  onClose,
  handleReject,
  isMultiple = false,
  activityType,
}: {
  open: boolean;
  onClose: () => void;
  handleReject: () => void;
  isMultiple?: boolean;
  activityType?: string;
}) => {
  const getTitle = () => {
    if (isMultiple) {
      return "Are You Sure You Want to Reject All Selected Requests?";
    }
    return `Are You Sure You Want to Reject ${activityType || "[Activity Type]"} Request?`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Confirmation</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="w-[460px] flex flex-col  items-center justify-center mt-5">
            <Image
              src="/assets/image/reject.svg"
              alt="approve"
              width={100}
              height={100}
            />
            <div className="mt-4 text-center text-slate-900 text-base font-medium font-['Inter'] leading-none">
              {getTitle()}
            </div>
            <div className="mt-2 self-stretch text-center text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
              Rejected request will not proceed further
            </div>

            <div className="mt-5 w-full pt-5 border-t border-gray-200">
              <div className="justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
                Reason of Rejection
              </div>
              <div className="mt-2 justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-none">
                Please input the rejection reason before continue
              </div>
              <Textarea
                placeholder="Your reason of rejection"
                rows={4}
                className="mt-5"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Button variant="outline" onClick={onClose} className="px-3">
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleReject}
              className="px-6"
            >
              Confirm and Reject
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceReject;

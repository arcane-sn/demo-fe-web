import DialogContent, {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

const ModalBalanceHoldList = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect?: () => void;
}) => {
  const Card = ({
    holdDate,
    holdAmount,
  }: {
    holdDate: string;
    holdAmount: string;
  }) => {
    return (
      <div className="w-full self-stretch p-4 bg-stone-50/20 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex justify-between items-center">
        <div className="w-full flex justify-start items-start gap-10">
          <div className="w-40 inline-flex flex-col justify-center items-start gap-2">
            <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
              Hold Date
            </div>
            <div className="justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-tight">
              {holdDate}
            </div>
          </div>
          <div className="w-36 inline-flex flex-col justify-center items-start gap-2">
            <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
              Hold Amount
            </div>
            <div className="justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-tight">
              {holdAmount}
            </div>
          </div>
        </div>
        <div
          className="size- p-1.5 rounded-md flex justify-start items-start gap-2.5 cursor-pointer hover:bg-gray-100"
          onClick={onSelect}
        >
          <ChevronRight className="text-gray-600" />
        </div>
      </div>
    );
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hold Balance List</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="self-stretch justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
            Select the balance hold you want to release
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Card
              holdDate="Wed, Feb 23, 2026, 09:15"
              holdAmount="IDR 200.000.000"
            />
            <Card
              holdDate="Wed, Feb 23, 2026, 09:15"
              holdAmount="IDR 200.000.000"
            />
            <Card
              holdDate="Wed, Feb 23, 2026, 09:15"
              holdAmount="IDR 200.000.000"
            />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceHoldList;

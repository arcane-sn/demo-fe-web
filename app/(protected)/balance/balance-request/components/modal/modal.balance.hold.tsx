import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Info, XCircle, User, Calendar } from "lucide-react";

const ModalBalanceHold = ({
  open,
  onClose,
  onApprove,
  onReject,
}: {
  open: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Balance Adjustment Request Detail</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="min-h-[67px] self-stretch px-3.5 py-4 bg-yellow-50 rounded-md  outline-1 outline-offset-[-1px] outline-yellow-500 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
              <Info className="size-6 text-yellow-500" />
              <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Inter'] leading-none">
                  Review Before Approve
                </div>
                <div className="self-stretch justify-center text-slate-500 text-xs font-medium font-['Inter'] leading-none">
                  Please review the information carefully before approving
                  requests.
                </div>
              </div>
            </div>
          </div>
          <Card className="w-full self-stretch">
            <CardContent className="px-7 pt-5 pb-7 flex flex-col gap-5">
              <div className="self-stretch px-3.5 pt-2.5 pb-3.5 bg-stone-50 rounded-md outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
                      Total Adjusted Amount
                    </div>
                    <div className="justify-start text-rose-500 text-2xl font-semibold font-['Inter'] leading-normal">
                      - IDR 30.000.000
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                    <div className="w-36 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                        Merchant Name
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                      MetroMart
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                    <div className="w-36 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                        Company Name
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                      PT Metro Jaya Teknologika
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                    <div className="w-36 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                        Client ID
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                      UP12920398747
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                    <div className="w-36 flex justify-start items-center gap-2.5">
                      <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                        Parent ID
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                      PR12920398747
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-gray-100" />
              <div className="self-stretch flex flex-col justify-center items-center gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                  <div className="self-stretch flex justify-start items-center gap-1.5">
                    <div className="w-36 flex justify-start items-center gap-1.5">
                      <User className="size-4 text-slate-400" />
                      <div className="w-24 justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-3">
                        Requested by
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-3">
                      bicaktiguling@mail.com
                    </div>
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                  <div className="self-stretch flex justify-start items-center gap-1.5">
                    <div className="w-36 flex justify-start items-center gap-1.5">
                      <Calendar className="size-4 text-slate-400" />
                      <div className="w-24 justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-3">
                        Requested Date
                      </div>
                    </div>
                    <div className="justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-3">
                      Thu, Dec 16, 2025, 23:12:32 (GMT +7)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="w-full self-stretch inline-flex flex-col justify-start items-start gap-4">
            <Card className="self-stretch">
              <CardHeader className="px-7 py-5">
                <CardTitle>Balance Changes</CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 flex flex-col gap-4">
                <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <div className="w-48 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                      Balance Before
                    </div>
                  </div>
                  <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                    IDR 100.000.000
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <div className="w-48 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                      Total Adjusted Amount
                    </div>
                  </div>
                  <div className="w-48 justify-start text-emerald-600 text-sm font-normal font-['Inter'] leading-none">
                    + IDR 15.000.000
                  </div>
                </div>
                <div className="self-stretch h-px bg-gray-100" />
                <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <div className="w-48 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-slate-800 text-sm font-medium font-['Inter'] leading-none">
                      Balance After
                    </div>
                  </div>
                  <div className="w-48 justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                    IDR 85.000.000
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogBody>
        <DialogFooter className="w-full flex items-center justify-end mt-4">
          <Button variant="destructive" className="bg-danger" onClick={onReject || onClose}>
            <XCircle /> Reject Request
          </Button>
          <Button variant="primary" className="bg-success" onClick={onApprove || onClose}>
            <CheckCircle /> Approve Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceHold;

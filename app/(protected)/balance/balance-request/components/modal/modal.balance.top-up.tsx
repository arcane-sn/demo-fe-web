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
import { Calendar, CheckCircle, Copy, Info, Search, User, XCircle } from "lucide-react";
import Image from "next/image";

const ModalBalanceTopup = ({
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
      <DialogContent className="max-w-[980px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="justify-start text-slate-900 text-xl font-semibold font-['Inter'] leading-tight">
              Merchant Top-Up Request Details
            </div>
            <div className="justify-start text-slate-600 text-sm font-normal font-['Inter'] leading-none">
              Please complete all required data to top-up balance
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="max-w-[980px]">
          <div className="w-[1020px] mt-6 flex items-start jusity-center gap-7.5">
            <Card className="w-[364px]">
              <CardHeader className="px-7 py-5">
                <CardTitle>Bank Info</CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 flex flex-col gap-7">
                <div className="justify-start text-slate-600 text-sm font-normal font-['Inter'] leading-none">
                  Transfer funds to our registered bank account
                </div>
                <div className="self-stretch h-px  bg-gray-100" />
                <div className="size- inline-flex justify-start items-center gap-3.5">
                  <div className="size-14 bg-stone-50 rounded-2xl  outline-2 outline-offset-[-2px] outline-zinc-200 inline-flex flex-col justify-center items-center gap-5">
                    <div className="size-12 relative flex items-center justify-center">
                      <Image
                        src="/assets/image/bank_bca.svg"
                        alt="bank_bca"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-between items-start overflow-hidden">
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-3">
                        BCA
                      </div>
                    </div>
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-base font-medium font-['Inter'] leading-none">
                        1234 5678 9012 3456
                      </div>
                      <div className="size-4 relative overflow-hidden">
                        <Copy className="size-4 cursor-pointer text-gray-500" />
                      </div>
                    </div>
                    <div className="size- inline-flex justify-center items-center gap-[5px]">
                      <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
                        PT FLYPAY TERBANG SELALU
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px  bg-gray-100" />
                <div className="size- inline-flex justify-start items-center gap-3.5">
                  <div className="size-14 bg-stone-50 rounded-2xl  outline-2 outline-offset-[-2px] outline-zinc-200 inline-flex flex-col justify-center items-center gap-5">
                    <div className="size-12 relative flex items-center justify-center">
                      <Image
                        src="/assets/image/bank_mandiri.svg"
                        alt="bank_mandiri"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-between items-start overflow-hidden">
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-3">
                        Bank Mandiri
                      </div>
                    </div>
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-base font-medium font-['Inter'] leading-none">
                        1234 5678 9012 3456
                      </div>
                      <div className="size-4 relative overflow-hidden">
                        <Copy className="size-4 cursor-pointer text-gray-500" />
                      </div>
                    </div>
                    <div className="size- inline-flex justify-center items-center gap-[5px]">
                      <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
                        PT FLYPAY TERBANG SELALU
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px  bg-gray-100" />
                <div className="size- inline-flex justify-start items-center gap-3.5">
                  <div className="size-14 bg-stone-50 rounded-2xl  outline-2 outline-offset-[-2px] outline-zinc-200 inline-flex flex-col justify-center items-center gap-5">
                    <div className="size-12 relative flex items-center justify-center">
                      <Image
                        src="/assets/image/bank_bri.svg"
                        alt="bank_bri"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div className="self-stretch inline-flex flex-col justify-between items-start overflow-hidden">
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-3">
                        Bank BRI
                      </div>
                    </div>
                    <div className="size- inline-flex justify-start items-center gap-1.5">
                      <div className="justify-start text-slate-900 text-base font-medium font-['Inter'] leading-none">
                        1234 5678 9012 3456
                      </div>
                      <div className="size-4 relative overflow-hidden">
                        <Copy className="size-4 cursor-pointer text-gray-500" />
                      </div>
                    </div>
                    <div className="size- inline-flex justify-center items-center gap-[5px]">
                      <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
                        PT FLYPAY TERBANG SELALU
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="w-[526px] flex flex-col gap-6">
              <div className="w-full min-h-[67px] self-stretch px-3.5 py-4 bg-yellow-50 rounded-md  outline-1 outline-offset-[-1px] outline-yellow-500 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                <div className="self-stretch inline-flex justify-start items-start gap-4">
                  <Info className="size-6 text-yellow-500" />
                  <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                    <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Inter'] leading-none">
                      Transfer the Amount Before Approval
                    </div>
                    <div className="self-stretch justify-center text-slate-500 text-xs font-medium font-['Inter'] leading-none">
                      Please transfer the required amount and upload the
                      necessary documents before approving the request. Ensure
                      that the funds have been received.
                    </div>
                  </div>
                </div>
              </div>
              <Card className="self-stretch">
                <CardHeader className="px-7 py-5">
                  <CardTitle>Top-Up Details</CardTitle>
                </CardHeader>
                <CardContent className="px-7 pb-7 flex flex-col gap-5">
                    <div className="self-stretch px-3.5 pt-2.5 pb-3.5 bg-stone-50 rounded-md outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start gap-5">
                      <div className="w-full inline-flex justify-start items-start ">
                        <div className="flex-1 flex justify-start items-start gap-2.5">
                          <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                            <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
                              Top-Up Amount
                            </div>
                            <div className="inline-flex justify-start items-center gap-3">
                              <div className="justify-start text-slate-900 text-2xl font-semibold font-['Inter'] leading-normal">
                                IDR 15.000.000
                              </div>
                              <div className="size-4 relative overflow-hidden">
                                <Copy className="size-4 cursor-pointer text-gray-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-2.5 py-2 bg-purple-50 rounded-sm outline-1 outline-offset-[-1px] outline-violet-600/20 flex justify-center items-center">
                          <div className="justify-start text-violet-800 text-xs font-medium font-['Inter'] leading-none">
                            Manual Transfer
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                          <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
                            Remark
                          </div>
                          <div className="justify-start text-slate-900 text-base font-normal font-['Inter'] leading-none">
                            Remark here
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
              <Card className="self-stretch">
                <CardHeader className="px-7 py-5">
                  <CardTitle>Transfer Receipt Details</CardTitle>
                </CardHeader>
                <CardContent className="px-7 pb-7 flex flex-col gap-4">
                      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="w-44 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                            Destination Bank
                          </div>
                        </div>
                        <div className="flex-1 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                            BCA
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px bg-gray-100" />
                      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="w-44 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                            Transfer Receipt
                          </div>
                        </div>
                        <div className="flex-1 flex justify-start items-center gap-4 min-w-0">
                          <div className="flex-1 justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none truncate">
                            screenshot29122025_11122.png
                          </div>
                          <div
                            data-color="Light"
                            data-darkmode="False"
                            data-icon="Left"
                            data-size="ExtraSmall"
                            data-state="Default"
                            data-variant="Solid"
                            className="p-2 bg-white rounded-md  outline-1 outline-offset-[-1px] outline-zinc-200 flex justify-center items-center gap-[3px] overflow-hidden flex-shrink-0"
                          >
                            <Search className="size-3 text-slate-600" />
                            <div className="justify-start text-slate-600 text-xs font-medium font-['Inter'] leading-3">
                              View
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px bg-gray-100" />
                      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="w-44 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                            Top-Up Date
                          </div>
                        </div>
                        <div className="flex-1 flex justify-start items-center gap-2.5">
                          <div className="inline-flex flex-col justify-center items-start gap-1">
                            <div className="justify-start text-slate-900 text-sm font-normal font-['Inter'] leading-none">
                              Thu, Dec 16, 2025
                            </div>
                            <div className="justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-3">
                              23:12:32 (GMT +7)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px bg-gray-100" />
                      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <div className="w-44 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                            Ref No. / Trx ID
                          </div>
                        </div>
                        <div className="flex-1 flex justify-start items-center gap-1.5">
                          <div className="justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                            Ref111120000011199
                          </div>
                          <div className="size-4 relative overflow-hidden flex-shrink-0">
                            <Copy className="size-4 cursor-pointer text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px bg-gray-100" />
                      <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                        <div className="w-44 flex justify-start items-center gap-2.5">
                          <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                            Message
                          </div>
                        </div>
                        <div className="flex-1 justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-snug">
                          transfer for settlement merchant A January 2026
                        </div>
                      </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Button
              variant="destructive"
              className="bg-danger"
              onClick={onReject || onClose}
            >
              <XCircle /> Reject Request
            </Button>
            <Button variant="primary" className="bg-success" onClick={onApprove || onClose}>
              <CheckCircle /> Approve Request
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceTopup;

import Image from "next/image";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";

const ModalNotif = ({
  open,
  onOpenChange,
  title,
  subTitle,
  message,
  image = "/assets/image/submitted.svg",
}: {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  subTitle: string;
  message: string;
  image?: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-center justify-center w-[428px] mt-5">
            <Image src={image} alt="submitted" width={100} height={100} />
            <div className="mt-5 justify-start text-slate-900 text-base font-medium font-['Inter'] leading-none">
              {subTitle}
            </div>
            <div className="self-stretch text-center justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-tight">
              {message}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onOpenChange} className="w-full">
            Okay!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalNotif;

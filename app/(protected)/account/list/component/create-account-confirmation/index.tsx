import { Illustration } from "@/components/common/illustration";
import { Button, ButtonArrow } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogAccountConfirmationProps {
  visible: boolean;
  close: () => void;
  confirm: () => void;
}
const DialogAccountConfirmation: React.FC<DialogAccountConfirmationProps> = ({
  visible,
  close,
  confirm,
}) => {
  return (
    <Dialog open={visible}>
      <DialogContent close className="p-0">
        <DialogHeader className="border-b border-border p-5">
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="">
                <div className="">
                  <p className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                    Confirmation
                  </p>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="p-5">
            <div className="flex justify-center pb-4">
              <Illustration.accountCreateConfirmation />
            </div>
            <div>
              <p className="text-center text-b-16-16-500 text-[var(--color-gray-900)]">
                Create Account?
              </p>
            </div>
            <div>
              <p className="text-center text-b-13-20-400 text-[var(--color-gray-700)]">
                Please review the details before proceeding.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="border-t border-border p-5">
          <div className="flex w-full">
            <div className="flex-1/2 flex justify-end pr-2">
              <Button
                onClick={() => {
                  close();
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
            </div>
            <div className="flex-1/2 pl-2">
              <Button
                onClick={() => {
                  confirm();
                }}
                className="w-full"
              >
                Confirm & Create Account
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAccountConfirmation;

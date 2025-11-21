import { Illustration } from "@/components/common/illustration";
import { Button, ButtonArrow } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogAccountSuccessProps {
  visible: boolean;
  close: () => void;
}
const DialogAccountSuccess: React.FC<DialogAccountSuccessProps> = ({
  visible,
  close,
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
                    Account Created
                  </p>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="p-5">
            <div className="flex justify-center  pb-4">
              <Illustration.accountCreateSuccess />
            </div>
            <div>
              <p className="text-center text-b-16-16-500 text-[var(--color-gray-900)]">
                Account Created Successfully!
              </p>
            </div>
            <div className="mt-2">
              <p className=" text-center text-b-13-20-400 text-[var(--color-gray-900)]">
                An activation link has been sent to the entered email. Please
                activate the account via the link
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="border-t border-border p-5">
          <Button
            onClick={() => {
              close();
            }}
            className="w-full"
          >
            Okay!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAccountSuccess;

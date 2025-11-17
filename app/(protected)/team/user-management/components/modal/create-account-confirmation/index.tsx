import { Illustration } from "@/components/common/illustration";
import { Button, ButtonArrow } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Confirmation
                  </p>
                </div>
              </div>
              <div className="self-center items-center justify-center">
                <Button
                  mode={"icon"}
                  onClick={close}
                  className="bg-transparent hover:bg-bg-transparent"
                >
                  <div className="text-[var(--color-gray-600)]">X</div>
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="">
            <div className="flex justify-center pt-4 pb-4">
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
            <div className="flex w-full pt-10">
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
                  Okay!
                </Button>
              </div>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAccountConfirmation;

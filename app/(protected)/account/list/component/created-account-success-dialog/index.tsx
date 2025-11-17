import { Illustration } from "@/components/common/illustration";
import { Button, ButtonArrow } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
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
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Account Created
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
              <Illustration.accountCreateSuccess />
            </div>
            <div>
              <p className="text-center text-b-16-16-500 text-[var(--color-gray-900)]">
                Account Created Successfully!
              </p>
            </div>
            <div>
              <p className="text-center text-b-13-20-400 text-[var(--color-gray-900)]">
                An activation link has been sent to the entered email. Please
                activate the account via the link
              </p>
            </div>
            <div className="pt-10">
              <Button
                onClick={() => {
                  close();
                }}
                className="w-full"
              >
                Okay!
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAccountSuccess;

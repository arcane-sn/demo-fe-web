import React, { ReactNode, useState, useRef } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createAccountStep } from "./core/hooks";
import CreateAccountForm from "./component/create-account-form";
import { Button } from "@/components/ui/button";
import AccountNavigation from "./component/account-navigation";

interface CreateAccountDialogProps {
  triger: ReactNode;
  isOpen: boolean;
  close: () => void;
}
const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({
  triger,
  isOpen,
  close,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triger}</DialogTrigger>
      <DialogContent
        close={true}
        className="max-w-5xl p-0 h-[95vh] md:h-[95vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
      >
        <DialogHeader className="px-4 py-1 mb-1 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="p-8 ">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Create Account
                  </p>
                  <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                    Complete all required data to create a new account{" "}
                  </p>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* <DialogDescription></DialogDescription> */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar - Fixed, not scrollable */}
          <div className="hidden lg:block flex-shrink-0 border-r">
            <div className="p-8 h-full">
              <AccountNavigation
                sections={createAccountStep[currentStep].sections}
                targetRef={scrollContainerRef}
              />
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
            <div className="py-8 px-8">
              <div className="max-w-4xl">
                <CreateAccountForm closeDialog={close} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;

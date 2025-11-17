import React, { ReactNode, useState } from "react";
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
import { SidebarNavigation } from "@/app/(protected)/merchant/components/shared/sidebar-navigation";
import { createAccountStep } from "./core/hooks";
import CreateAccountForm from "./component/create-account-form";
import { Button } from "@/components/ui/button";

interface CreateAccountDialogProps {
  isOpen: boolean;
  close: () => void;
}
const CreateAccountDialog: React.FC<CreateAccountDialogProps> = ({
  isOpen,
  close,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="max-w-7xl p-0 h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
      >
        <DialogHeader className="px-4 py-1 mb-0 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="p-8 ">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Invite User
                  </p>
                  <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                    Complete all required data to invite user
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
            <div className="p-7 h-full">
              <SidebarNavigation
                sections={createAccountStep[currentStep].sections}
              />
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
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

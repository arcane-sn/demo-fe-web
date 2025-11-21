import DialogContent, {
  Dialog,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState, useRef } from "react";
import { AccountDetailsDialogProps } from "./core/types/account-details";
import { accountDetailsSection } from "./core/hooks/account-details-section";
import AccountDetailsForm from "./component/account-details-form";
import AccountDetailsNavigation from "./component/account-details-navigation";
import { useDialogStore } from "../../core/hooks/use-dialog";
const AccountDetailsDialog: React.FC<AccountDetailsDialogProps> = ({
  visible,
  close,
  accountData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isAccountDetailsOpen, closeAccountDetails } = useDialogStore();
  const handleClose = () => {
    closeAccountDetails();
    close();
  };

  return (
    <Dialog open={visible || isAccountDetailsOpen} onOpenChange={handleClose}>
      <DialogContent
        close
        className="max-w-5xl p-0 h-[95vh] md:h-[95vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
      >
        <DialogHeader className=" mb-1 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="p-7.5 ">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Account Details
                  </p>
                  <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                    View and update account information
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
              <AccountDetailsNavigation
                sections={accountDetailsSection[currentStep].sections}
                targetRef={scrollContainerRef}
              />
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
            <div className="py-8 px-8">
              <div className="max-w-4xl">
                {accountData && (
                  <AccountDetailsForm
                    accountData={accountData}
                    close={handleClose}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsDialog;

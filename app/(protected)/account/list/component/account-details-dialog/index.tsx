import { SidebarNavigation } from "@/app/(protected)/merchant/components/shared/sidebar-navigation";
import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { AccountDetailsDialogProps } from "./core/types/account-details";
import { accountDetailsSection } from "./core/hooks/account-details-section";
import AccountDetailsForm from "./component/account-details-form";
import { useDialogStore } from "../../core/hooks/use-dialog";
const AccountDetailsDialog: React.FC<AccountDetailsDialogProps> = ({
  visible,
  close,
  accountData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isAccountDetailsOpen, closeAccountDetails } = useDialogStore();
  const handleClose = () => {
    closeAccountDetails();
    close();
  };

  return (
    <Dialog open={visible || isAccountDetailsOpen} onOpenChange={handleClose}>
      <DialogContent
        close={false}
        className="max-w-7xl p-0 h-[90vh] md:h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   [&_[data-slot=dialog-close]]:top-5.5 [&_[data-slot=dialog-close]]:end-5.5 flex flex-col"
      >
        <DialogHeader className="px-4 py-1 mb-1 border-b flex-shrink-0">
          <DialogTitle>
            <div className="flex w-full justify-between ">
              <div className="p-8 ">
                <div className="">
                  <p className="text-b-20-20-500 flex items-center gap-2">
                    Account Details
                  </p>
                  <p className="pt-2 text-b-14-14-400 text-[var(--color-gray-700)]">
                    View and update account information
                  </p>
                </div>
              </div>
              <div className="self-center items-center justify-center">
                <Button
                  mode={"icon"}
                  onClick={handleClose}
                  className="bg-transparent hover:bg-bg-transparent"
                >
                  <div className="text-[var(--color-gray-600)]">X</div>
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* <DialogDescription></DialogDescription> */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar - Fixed, not scrollable */}
          <div className="hidden lg:block flex-shrink-0 border-r">
            <div className="p-8 h-full">
              <SidebarNavigation
                sections={accountDetailsSection[currentStep].sections}
              />
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
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

import DialogContent, {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollspy } from "@/components/ui/scrollspy";
import {
  ScrollspyMenu,
  ScrollspyMenuItems,
} from "@/app/components/partials/navbar/scrollspy-menu";
import React, { useMemo, useRef } from "react";
import { AccountDetailsDialogProps } from "./core/types/account-details";
import { accountDetailsSection } from "./core/hooks/account-details-section";
import AccountDetailsForm from "./component/account-details-form";

const AccountDetailsDialog: React.FC<AccountDetailsDialogProps> = ({
  visible,
  close,
  accountData,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sections = useMemo(
    () => accountDetailsSection[0]?.sections ?? [],
    [],
  );

  const menuItems = useMemo<ScrollspyMenuItems>(
    () =>
      sections.map((section, index) => ({
        title: section.title,
        target: section.id,
        active: index === 0,
      })),
    [sections],
  );

  const handleClose = () => {
    close();
  };

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <DialogContent className="max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription>
                    View and update account information
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="flex gap-8 px-2 pb-2 lg:px-6 lg:pb-6">
          <div className="hidden w-56 flex-shrink-0 lg:block">
            <Scrollspy targetRef={scrollRef} offset={100}>
              <ScrollspyMenu items={menuItems} />
            </Scrollspy>
          </div>
          <div className="flex-1 min-w-0">
            <ScrollArea className="h-[600px]" viewportRef={scrollRef}>
              <div className="space-y-7 min-w-0">
                {accountData && (
                  <AccountDetailsForm
                    accountData={accountData}
                    close={handleClose}
                  />
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsDialog;

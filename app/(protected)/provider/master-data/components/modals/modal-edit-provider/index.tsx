import { Button } from "@/components/ui/button";
import {
  DialogContent,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useRef } from "react";
import IndexingSection from "./IndexingSection";
import { PROVIDER_CREATE_PROVIDER_STEPS } from "../../../core";

import CardProviderCredentials from "./CardProviderCredentials";
import CardProviderInformation from "./CardProviderInformation";
import CardCredentialStatus from "./CardCredentialStatus";
import CardDefaultPricing from "./CardDefaultPricing";
import CardTransactionLimit from "./CardTransactionLimit";

interface IModalEditProviderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

const ModalEditProvider = ({
  open,
  onOpenChange,
  onSubmit,
}: IModalEditProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Provider</DialogTitle>
          <DialogDescription>
            Change data for this provider
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex gap-10 grow px-5 mt-4 min-w-0">
          <IndexingSection lists={PROVIDER_CREATE_PROVIDER_STEPS} ref={ref} />
          <div className="flex-1 min-w-0">
            <ScrollArea className="h-[600px]" viewportRef={ref}>
              <div className="space-y-7 min-w-0">
                <CardProviderInformation />
                <CardProviderCredentials />
                <CardCredentialStatus />
                <CardDefaultPricing />
                <CardTransactionLimit />
              </div>
            </ScrollArea>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onOpenChange(false)}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onSubmit}
            className="px-8"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditProvider;

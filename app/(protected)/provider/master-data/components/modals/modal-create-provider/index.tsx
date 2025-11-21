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

import CardProviderCredentials, {
  CardProviderCredentialsHandle,
} from "./CardProviderCredentials";
import CardProviderInformation from "./CardProviderInformation";
import CardDefaultPricing, {
  CardDefaultPricingHandle,
} from "./CardDefaultPricing";
import CardTransactionLimit, {
  CardTransactionLimitHandle,
} from "./CardTransactionLimit";

interface IModalCreateProviderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

const ModalCreateProvider = ({
  open,
  onOpenChange,
  onSubmit,
}: IModalCreateProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<CardProviderCredentialsHandle>(null);
  const pricingRef = useRef<CardDefaultPricingHandle>(null);
  const limitRef = useRef<CardTransactionLimitHandle>(null);

  const handleCreate = () => {
    const credentialsValid = credentialsRef.current?.validate() ?? true;
    const pricingValid = pricingRef.current?.validate() ?? true;
    const limitValid = limitRef.current?.validate() ?? true;

    if (credentialsValid && pricingValid && limitValid) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create New Provider</DialogTitle>
          <DialogDescription>
            Complete all required data to create a new provider
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex gap-10 grow mt-4 min-w-0">
          <IndexingSection lists={PROVIDER_CREATE_PROVIDER_STEPS} ref={ref} />
          <div className="flex-1 min-w-0">
            <ScrollArea className="h-[600px]" viewportRef={ref}>
              <div className="space-y-7 min-w-0">
                <CardProviderInformation />
                <CardProviderCredentials ref={credentialsRef} />
                <CardDefaultPricing ref={pricingRef} />
                <CardTransactionLimit ref={limitRef} />
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
          <Button variant="primary" size="lg" onClick={handleCreate} className="px-8">
            Create Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateProvider;

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
import CardDefaultPricing from "./CardDefaultPricing";
import CardTransactionLimit from "./CardTransactionLimit";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-b-20-20-600 text-gray-900">
            Create New Provider
          </DialogTitle>
          <DialogDescription className="text-b-14-14-400 text-gray-700">
            Complete all required data to create a new provider
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex justify-between gap-6 grow">
          <IndexingSection lists={PROVIDER_CREATE_PROVIDER_STEPS} ref={ref} />
          <ScrollArea className="h-[60vh] pe-6" viewportRef={ref}>
            <CardProviderInformation />
            <CardProviderCredentials />
            <CardDefaultPricing />
            <CardTransactionLimit />
          </ScrollArea>
        </DialogBody>
        <DialogFooter>
          <Button
            variant={"primary"}
            size={"lg"}
            onClick={onSubmit}
            className="px-8"
          >
            Create Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateProvider;

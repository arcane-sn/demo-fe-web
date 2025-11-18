"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scrollspy } from '@/components/ui/scrollspy';
import { useIsMobile } from '@/hooks/use-mobile';
import { useViewport } from '@/hooks/use-viewport';
import { X } from 'lucide-react';
import { EditTransactionSidebar } from './components/edit-transaction-sidebar';
import { EditTransferDetails } from './components/edit-transfer-details';
import { EditBeneficiaryBankDetails } from './components/edit-beneficiary-bank-details';
import { EditOtherDetails } from './components/edit-other-details';
import type { TransactionItem } from '../../../types/batch-detail';

interface EditTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: TransactionItem;
  onSave?: (transaction: TransactionItem) => void;
}

export function EditTransactionModal({
  open,
  onOpenChange,
  transaction,
  onSave,
}: EditTransactionModalProps) {
  const mobileMode = useIsMobile();
  const navBar = useRef<any | null>(null);
  const parentRef = useRef<any | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const offset = 260;

  // Form state
  const [formData, setFormData] = useState<Partial<TransactionItem>>({
    partnerReferenceNumber: transaction?.partnerReferenceNumber || '',
    transferAmount: transaction?.transferAmount || '',
    bankName: transaction?.bankName || '',
    accountNumber: transaction?.accountNumber || '',
    remark: transaction?.remark || '',
    sendToEmail: transaction?.sendToEmail || '',
  });

  const [hasAccountError, setHasAccountError] = useState(false);

  useEffect(() => {
    setSidebarHeight(viewportHeight - offset);
  }, [viewportHeight]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        partnerReferenceNumber: transaction.partnerReferenceNumber || '',
        transferAmount: transaction.transferAmount || '',
        bankName: transaction.bankName || '',
        accountNumber: transaction.accountNumber || '',
        remark: transaction.remark || '',
        sendToEmail: transaction.sendToEmail || '',
      });
    }
  }, [transaction]);

  const handlePartnerRefChange = (ref: string) => {
    setFormData(prev => ({ ...prev, partnerReferenceNumber: ref }));
  };

  const handleAmountChange = (amount: string) => {
    setFormData(prev => ({ ...prev, transferAmount: amount }));
  };

  const handleBankNameChange = (bankName: string) => {
    setFormData(prev => ({ ...prev, bankName }));
  };

  const handleAccountNumberChange = (accountNumber: string) => {
    setFormData(prev => ({ ...prev, accountNumber }));
    setHasAccountError(false);
  };

  const handleAccountInquiry = () => {
    // Simulate account inquiry - in real app, this would call an API
    // For now, we'll simulate an error
    setHasAccountError(true);
  };

  const handleRemarkChange = (remark: string) => {
    setFormData(prev => ({ ...prev, remark }));
  };

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, sendToEmail: email }));
  };

  const handleSave = () => {
    if (transaction && onSave) {
      const updatedTransaction: TransactionItem = {
        ...transaction,
        ...formData,
      };
      onSave(updatedTransaction);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="mx-auto grow w-full max-w-[900px] flex flex-col px-6 gap-0 overflow-hidden [&>button]:hidden"
        variant="fullscreen"
      >
        <DialogHeader className="p-0 border-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex items-center justify-between flex-wrap grow gap-5 pb-6">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900">
                Edit Transaction
              </h1>
              <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                Complete all required data to create a request
              </div>
            </div>
            <Button 
              onClick={() => onOpenChange(false)} 
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea
          className="grow py-0 mb-5 ps-0 pe-3 -me-7"
          viewportRef={parentRef}
        >
          <div className="flex grow gap-6">
            {!mobileMode && (
              <div
                className="w-[280px] sticky top-[1px]"
                style={{ maxHeight: `${sidebarHeight}px` }}
              >
                <ScrollArea viewportRef={navBar} className="h-full">
                  <Scrollspy offset={100} targetRef={parentRef}>
                    <EditTransactionSidebar />
                  </Scrollspy>
                </ScrollArea>
              </div>
            )}
            <div className="flex flex-col items-stretch grow gap-6">
              <EditTransferDetails
                transaction={transaction}
                onPartnerRefChange={handlePartnerRefChange}
                onAmountChange={handleAmountChange}
              />
              <EditBeneficiaryBankDetails
                transaction={transaction}
                onBankNameChange={handleBankNameChange}
                onAccountNumberChange={handleAccountNumberChange}
                onAccountInquiry={handleAccountInquiry}
                hasError={hasAccountError}
              />
              <EditOtherDetails
                transaction={transaction}
                onRemarkChange={handleRemarkChange}
                onEmailChange={handleEmailChange}
              />
            </div>
          </div>
        </ScrollArea>
        
        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


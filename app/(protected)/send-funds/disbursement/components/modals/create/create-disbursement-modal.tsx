"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
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
import { CreateDisbursementSidebar } from './create-disbursement-sidebar';
import { TransferDetails } from './singge-modal/components/transfer-details';
import { BeneficiaryBankDetails } from './singge-modal/components/beneficiary-bank-details';
import { OtherDetails } from './singge-modal/components/other-details';
import { ScheduledDisbursement } from './singge-modal/components/scheduled-disbursement';
import { ExitConfirmationModal } from './exit-confirmation-modal';
import { SaveDraftModal } from './save-draft-modal';
import { SubmitConfirmationModal } from './submit-confirmation-modal';
import { SubmitSuccessModal } from './submit-success-modal';

interface CreateDisbursementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'single' | 'bulk';
}

export function CreateDisbursementModal({
  open,
  onOpenChange,
  type = 'single',
}: CreateDisbursementModalProps) {
  const mobileMode = useIsMobile();
  const navBar = useRef<any | null>(null);
  const parentRef = useRef<any | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const offset = 260;
  
  // Modal states
  const [isExitConfirmationModalOpen, setIsExitConfirmationModalOpen] = useState(false);
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Form states
  const [partnerReference, setPartnerReference] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState('');

  // Validation states
  const [transferErrors, setTransferErrors] = useState<{ partnerRef?: string; transferAmount?: string }>({});
  const [beneficiaryErrors, setBeneficiaryErrors] = useState<{ bankName?: string; accountNumber?: string }>({});
  const [scheduleErrors, setScheduleErrors] = useState<{ date?: string; time?: string }>({});

  useEffect(() => {
    setSidebarHeight(viewportHeight - offset);
  }, [viewportHeight]);

  // Handle exit without saving button click
  const handleExitWithoutSaving = () => {
    onOpenChange(false); // Close main modal first
    setTimeout(() => {
      setIsExitConfirmationModalOpen(true);
    }, 100);
  };

  // Handle save & exit button click
  const handleSaveAndExit = () => {
    onOpenChange(false); // Close main modal first
    setTimeout(() => {
      setIsSaveDraftModalOpen(true);
    }, 100);
  };

  const parseAmount = useCallback((value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue ? parseInt(numericValue, 10) : 0;
  }, []);

  const formatCurrency = useCallback((value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';

    const formatter = new Intl.NumberFormat('id-ID');
    return `IDR ${formatter.format(parseInt(numericValue, 10))}`;
  }, []);

  useEffect(() => {
    setFormattedAmount(formatCurrency(transferAmount));
  }, [formatCurrency, transferAmount]);

  const validateForm = useCallback(() => {
    const newTransferErrors: { partnerRef?: string; transferAmount?: string } = {};
    const newBeneficiaryErrors: { bankName?: string; accountNumber?: string } = {};
    const newScheduleErrors: { date?: string; time?: string } = {};

    if (!partnerReference.trim()) {
      newTransferErrors.partnerRef = 'This field is required';
    }

    const amountNumeric = parseAmount(transferAmount);
    if (!transferAmount.trim()) {
      newTransferErrors.transferAmount = 'This field is required';
    } else if (amountNumeric < 15000) {
      newTransferErrors.transferAmount = 'Minimum amount is IDR 15.000';
    } else {
      const balanceValue = parseAmount('IDR 200.000.000');
      if (amountNumeric > balanceValue) {
        newTransferErrors.transferAmount = 'Sorry, not enough active balance';
      }
    }

    if (!bankName) {
      newBeneficiaryErrors.bankName = 'Please select an option';
    }

    if (!accountNumber.trim()) {
      newBeneficiaryErrors.accountNumber = 'This field is required';
    }

    if (isScheduled) {
      if (!scheduledDate) {
        newScheduleErrors.date = 'Please select an option';
      }
      if (!scheduledTime) {
        newScheduleErrors.time = 'Please select an option';
      }
    }

    setTransferErrors(newTransferErrors);
    setBeneficiaryErrors(newBeneficiaryErrors);
    setScheduleErrors(newScheduleErrors);

    return (
      Object.keys(newTransferErrors).length === 0 &&
      Object.keys(newBeneficiaryErrors).length === 0 &&
      Object.keys(newScheduleErrors).length === 0
    );
  }, [
    accountNumber,
    bankName,
    isScheduled,
    parseAmount,
    partnerReference,
    scheduledDate,
    scheduledTime,
    transferAmount,
  ]);

  const handlePartnerReferenceChange = useCallback((value: string) => {
    setPartnerReference(value);
    setTransferErrors((prev) =>
      prev.partnerRef ? { ...prev, partnerRef: undefined } : prev,
    );
  }, []);

  const handleTransferAmountChange = useCallback(
    (value: string) => {
      setTransferAmount(value);
      const amountNumeric = parseAmount(value);
      let error: string | undefined;

      if (!value.trim()) {
        error = 'This field is required';
      } else if (amountNumeric < 15000) {
        error = 'Minimum amount is IDR 15.000';
      } else {
        const balanceValue = parseAmount('IDR 200.000.000');
        if (amountNumeric > balanceValue) {
          error = 'Sorry, not enough active balance';
        }
      }

      setTransferErrors((prev) => {
        if (prev.transferAmount === error) return prev;
        return { ...prev, transferAmount: error };
      });
    },
    [parseAmount],
  );

  const handleBankNameChange = useCallback((value: string) => {
    setBankName(value);
    setBeneficiaryErrors((prev) =>
      prev.bankName ? { ...prev, bankName: undefined } : prev,
    );
  }, []);

  const handleAccountNumberChange = useCallback((value: string) => {
    setAccountNumber(value);
    setBeneficiaryErrors((prev) =>
      prev.accountNumber ? { ...prev, accountNumber: undefined } : prev,
    );
  }, []);

  const handleScheduledToggle = useCallback(
    (value: boolean) => {
      setIsScheduled(value);
      if (!value) {
        setScheduleErrors({});
        setScheduledDate(undefined);
        setScheduledTime('');
      }
    },
    [],
  );

  const handleScheduledDateChange = useCallback((date: Date | undefined) => {
    setScheduledDate(date);
    setScheduleErrors((prev) =>
      prev.date ? { ...prev, date: undefined } : prev,
    );
  }, []);

  const handleScheduledTimeChange = useCallback((time: string) => {
    setScheduledTime(time);
    setScheduleErrors((prev) =>
      prev.time ? { ...prev, time: undefined } : prev,
    );
  }, []);

  const handleCreateRequest = () => {
    if (!validateForm()) {
      return;
    }

    onOpenChange(false); // Close main modal first
    setTimeout(() => {
      setIsConfirmationModalOpen(true);
    }, 100);
  };

  const handleConfirmSubmit = () => {
    setIsConfirmationModalOpen(false);
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 100);
  };

  const handleCancelSubmit = () => {
    setIsConfirmationModalOpen(false);
    setTimeout(() => {
      onOpenChange(true);
    }, 100);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSaveDraftClose = () => {
    setIsSaveDraftModalOpen(false);
  };

  const handleExitConfirmationExit = () => {
    setIsExitConfirmationModalOpen(false);
  };

  const handleExitConfirmationSaveAndExit = () => {
    setIsExitConfirmationModalOpen(false);
    setTimeout(() => {
      setIsSaveDraftModalOpen(true); // Show save draft modal
    }, 100);
  };

  const handleExitConfirmationStay = () => {
    setIsExitConfirmationModalOpen(false);
    setTimeout(() => {
      onOpenChange(true);
    }, 100);
  };


  return (
    <>
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
                Create {type === 'single' ? 'Single' : 'Bulk'} Transfer Request
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
                    <CreateDisbursementSidebar />
                  </Scrollspy>
                </ScrollArea>
              </div>
            )}
            <div className="flex flex-col items-stretch grow gap-6">
              <TransferDetails
                partnerReference={partnerReference}
                transferAmount={formattedAmount}
                onPartnerRefChange={handlePartnerReferenceChange}
                onAmountChange={handleTransferAmountChange}
                errors={transferErrors}
              />
              <BeneficiaryBankDetails
                bankName={bankName}
                accountNumber={accountNumber}
                errors={beneficiaryErrors}
                onBankNameChange={handleBankNameChange}
                onAccountNumberChange={handleAccountNumberChange}
              />
              <OtherDetails />
              <ScheduledDisbursement
                isScheduled={isScheduled}
                selectedDate={scheduledDate}
                selectedTime={scheduledTime}
                onToggleSchedule={handleScheduledToggle}
                onDateChange={handleScheduledDateChange}
                onTimeChange={handleScheduledTimeChange}
                errors={scheduleErrors}
              />
            </div>
          </div>
        </ScrollArea>
        
        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={handleExitWithoutSaving}
            className="text-gray-600"
          >
            Exit Without Saving
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSaveAndExit}
            className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
          >
            Save & Exit
          </Button>
          <Button 
            onClick={handleCreateRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    
    {/* Exit Confirmation Modal - Outside main modal */}
    <div style={{ zIndex: 1000 }}>
      <ExitConfirmationModal
        open={isExitConfirmationModalOpen}
        onOpenChange={setIsExitConfirmationModalOpen}
        onExitWithoutSaving={handleExitConfirmationExit}
        onSaveAndExit={handleExitConfirmationSaveAndExit}
        onStayHere={handleExitConfirmationStay}
      />
    </div>
    
    {/* Save Draft Modal - Outside main modal */}
    <div style={{ zIndex: 1001 }}>
      <SaveDraftModal
        open={isSaveDraftModalOpen}
        onOpenChange={setIsSaveDraftModalOpen}
        onClose={handleSaveDraftClose}
      />
    </div>
    
    {/* Confirmation Modal - Outside main modal */}
    <div style={{ zIndex: 1002 }}>
      <SubmitConfirmationModal
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </div>
    
    {/* Success Modal - Outside main modal */}
    <div style={{ zIndex: 1003 }}>
      <SubmitSuccessModal
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        onClose={handleSuccessClose}
      />
    </div>
  </>
  );
}

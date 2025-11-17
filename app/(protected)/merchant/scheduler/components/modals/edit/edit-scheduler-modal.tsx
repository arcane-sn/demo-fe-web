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
import { EditSchedulerSidebar } from './components/EditSchedulerSidebar';
import { MerchantInfoSection } from './components/MerchantInfoSection';
import { SchedulerSection } from './components/SchedulerSection';
import { EditSchedulerModalProps, SchedulerState } from './types';
import { DEFAULT_SCHEDULER_CONFIG } from '../../../data/constants';
import { SaveConfirmationModal, SaveSuccessModal } from '../confirmation';

export function EditSchedulerModal({
  open,
  onOpenChange,
  merchantInfo,
  schedulerState,
  onSave,
  onReset,
}: EditSchedulerModalProps) {
  const mobileMode = useIsMobile();
  const navBar = useRef<any | null>(null);
  const parentRef = useRef<any | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const offset = 260;
  
  const [currentSchedulerState, setCurrentSchedulerState] = useState<SchedulerState>(schedulerState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setSidebarHeight(viewportHeight - offset);
  }, [viewportHeight]);

  useEffect(() => {
    setCurrentSchedulerState(schedulerState);
  }, [schedulerState]);

  const handleSchedulerToggle = (schedulerType: keyof SchedulerState, enabled: boolean) => {
    setCurrentSchedulerState(prev => ({
      ...prev,
      [schedulerType]: {
        ...prev[schedulerType],
        enabled,
        // Auto-fill with default values when enabled
        config: enabled ? DEFAULT_SCHEDULER_CONFIG : prev[schedulerType].config,
      },
    }));
  };

  const handleSchedulerConfigChange = (schedulerType: keyof SchedulerState, config: any) => {
    setCurrentSchedulerState(prev => ({
      ...prev,
      [schedulerType]: {
        ...prev[schedulerType],
        config,
      },
    }));
  };

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    onSave?.(currentSchedulerState);
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onOpenChange(false);
  };

  const handleReset = () => {
    onReset?.();
    setCurrentSchedulerState(schedulerState);
  };

  const handleBack = () => {
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
                Edit Scheduler
              </h1>
              <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                Configure scheduler for this merchant
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
                    <EditSchedulerSidebar />
                  </Scrollspy>
                </ScrollArea>
              </div>
            )}
            
            <div className="flex flex-col items-stretch grow gap-6">
              <MerchantInfoSection merchantInfo={merchantInfo} />
              
              <SchedulerSection
                title="Settlement Scheduler"
                target="settlement"
                enabled={currentSchedulerState.settlement.enabled}
                config={currentSchedulerState.settlement.config}
                onToggle={(enabled) => handleSchedulerToggle('settlement', enabled)}
                onConfigChange={(config) => handleSchedulerConfigChange('settlement', config)}
              />
              
              <SchedulerSection
                title="Transaction Report Scheduler"
                target="transaction_report"
                enabled={currentSchedulerState.transactionReport.enabled}
                config={currentSchedulerState.transactionReport.config}
                onToggle={(enabled) => handleSchedulerToggle('transactionReport', enabled)}
                onConfigChange={(config) => handleSchedulerConfigChange('transactionReport', config)}
              />
              
              <SchedulerSection
                title="Transaction Summary Scheduler"
                target="transaction_summary"
                enabled={currentSchedulerState.transactionSummary.enabled}
                config={currentSchedulerState.transactionSummary.config}
                onToggle={(enabled) => handleSchedulerToggle('transactionSummary', enabled)}
                onConfigChange={(config) => handleSchedulerConfigChange('transactionSummary', config)}
              />
              
              <SchedulerSection
                title="Balance Statement (Balance History) Scheduler"
                target="balance_statement"
                enabled={currentSchedulerState.balanceStatement.enabled}
                config={currentSchedulerState.balanceStatement.config}
                onToggle={(enabled) => handleSchedulerToggle('balanceStatement', enabled)}
                onConfigChange={(config) => handleSchedulerConfigChange('balanceStatement', config)}
              />
              
              <SchedulerSection
                title="Disbursement Scheduler"
                target="disbursement"
                enabled={currentSchedulerState.disbursement.enabled}
                config={currentSchedulerState.disbursement.config}
                onToggle={(enabled) => handleSchedulerToggle('disbursement', enabled)}
                onConfigChange={(config) => handleSchedulerConfigChange('disbursement', config)}
              />
            </div>
          </div>
        </ScrollArea>
        
        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-gray-600 border-gray-200 hover:bg-gray-100"
          >
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
            >
              Reset to Default
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Confirmation Modal */}
      <SaveConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />

      {/* Success Modal */}
      <SaveSuccessModal
        open={showSuccess}
        onOpenChange={setShowSuccess}
        onClose={handleSuccessClose}
      />
    </Dialog>
  );
}


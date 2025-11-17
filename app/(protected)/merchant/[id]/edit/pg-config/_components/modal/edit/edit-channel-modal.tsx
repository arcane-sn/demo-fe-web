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
import { EditChannelSidebar } from './components/EditChannelSidebar';
import { ChannelDetailSection } from './components/ChannelDetailSection';
import { MDRSection } from './components/MDRSection';
import { PaymentOptionSection } from './components/PaymentOptionSection';
import { ProviderSection } from './components/ProviderSection';
import { SalesReferralSection } from './components/SalesReferralSection';
import { MerchantReferralSection } from './components/MerchantReferralSection';
import { EditChannelModalProps, ChannelEditState } from './types';

export function EditChannelModal({
  open,
  onOpenChange,
  channelData,
  onSave,
  onReset,
}: EditChannelModalProps) {
  const mobileMode = useIsMobile();
  const navBar = useRef<any | null>(null);
  const parentRef = useRef<any | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const offset = 260;
  
  const [currentChannelState, setCurrentChannelState] = useState<ChannelEditState>(channelData);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setSidebarHeight(viewportHeight - offset);
  }, [viewportHeight]);

  useEffect(() => {
    setCurrentChannelState(channelData);
  }, [channelData]);

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    if (onSave) {
      onSave(currentChannelState);
    }
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
    if (onReset) {
      onReset();
    }
    setCurrentChannelState(channelData);
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
                Edit Channel
              </h1>
              <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                Configure channel settings for this merchant
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
                    <EditChannelSidebar />
                  </Scrollspy>
                </ScrollArea>
              </div>
            )}
            
            <div className="flex flex-col items-stretch grow gap-6">
              
              {/* Channel Logo */}
                <div> 
                    <img 
                      src={channelData.channelLogo} 
                      alt={channelData.channelName}
                      className="w-25 h-10 object-contain"
                    />
                </div>
              
              {/* Channel Detail Section */}
              <div id="channel-detail">
                <ChannelDetailSection
                  data={currentChannelState.channelDetail}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    channelDetail: { ...prev.channelDetail, ...data }
                  }))}
                />
              </div>

              {/* Provider Section */}
              <div id="provider">
                <ProviderSection
                  data={currentChannelState.provider}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    provider: { ...prev.provider, ...data }
                  }))}
                />
              </div>

              {/* MDR Section */}
              <div id="mdr">
                <MDRSection
                  data={currentChannelState.mdr}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    mdr: { ...prev.mdr, ...data }
                  }))}
                />
              </div>

              {/* Sales Referral Section */}
              <div id="sales-referral">
                <SalesReferralSection
                  data={currentChannelState.salesReferral}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    salesReferral: { ...prev.salesReferral, ...data }
                  }))}
                />
              </div>

              {/* Merchant Referral Section */}
              <div id="merchant-referral">
                <MerchantReferralSection
                  data={currentChannelState.merchantReferral}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    merchantReferral: { ...prev.merchantReferral, ...data }
                  }))}
                />
              </div>

              {/* Payment Option Section */}
              <div id="payment-option">
                <PaymentOptionSection
                  data={currentChannelState.paymentOption}
                  onChange={(data) => setCurrentChannelState((prev: ChannelEditState) => ({
                    ...prev,
                    paymentOption: { ...prev.paymentOption, ...data }
                  }))}
                />
              </div>
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

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Save Changes</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to save these changes? This will update the channel configuration.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={handleCancelSave}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Dialog */}
      {showSuccess && (
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Changes Saved Successfully</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                The channel configuration has been updated successfully.
              </p>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSuccessClose}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
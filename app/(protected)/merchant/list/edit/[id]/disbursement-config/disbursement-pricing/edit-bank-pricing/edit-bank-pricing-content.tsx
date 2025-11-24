import { useEffect, useRef } from 'react';
import { Scrollspy } from '@/components/ui/scrollspy';
import { EditBankPricingSidebar } from './edit-bank-pricing-sidebar';
import { BankStatusSection } from './_components/bank-status-section';
import { FeeManagementSection } from './_components/fee-management-section';
import { RateDetailsSection } from './_components/rate-details-section';
import { TransferManagementSection } from './_components/transfer-management-section';
import { SalesReferralSection } from './_components/sales-referral-section';
import { MerchantReferralSection } from './_components/merchant-referral-section';
import { BankData } from '../_lib/types';
import { WarningBanner } from '@/components/common/warning-banner';

interface EditBankPricingContentProps {
  bankData?: BankData | null;
  editMode: 'single' | 'selected' | 'all';
  selectedBanksCount?: number;
}

export function EditBankPricingContent({ 
  bankData, 
  editMode, 
  selectedBanksCount = 0 
}: EditBankPricingContentProps) {
  const parentRef = useRef<HTMLElement | null>(null);
  const isMultiEdit = editMode === 'selected' || editMode === 'all';

  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) {
      parentRef.current = scrollableElement;
    }
  }, []);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 p-6">
        <Scrollspy offset={100} targetRef={parentRef}>
          <EditBankPricingSidebar />
        </Scrollspy>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" id="scrollable_content">
        <div className="p-6 space-y-6">
          {/* Warning Banner for Multi-Edit */}
          {isMultiEdit && (
            <WarningBanner
              title="Changes Will Apply to All Selected Banks"
              description="These changes affect all selected bank accounts under this merchant. Please review carefully before proceeding."
              iconColor="text-yellow-600"
            />
          )}
          <div id="bank_status" data-scrollspy-anchor="bank_status">
            <BankStatusSection 
              bankData={bankData}
              editMode={editMode}
              selectedBanksCount={selectedBanksCount}
            />
          </div>
          <div id="fee_management" data-scrollspy-anchor="fee_management">
            <FeeManagementSection 
              bankData={bankData}
              editMode={editMode}
            />
          </div>
          <div id="rate_details" data-scrollspy-anchor="rate_details">
            <RateDetailsSection 
              bankData={bankData}
              editMode={editMode}
            />
          </div>
          <div id="transfer_management" data-scrollspy-anchor="transfer_management">
            <TransferManagementSection 
              bankData={bankData}
              editMode={editMode}
            />
          </div>
          <div id="sales_referral" data-scrollspy-anchor="sales_referral">
            <SalesReferralSection 
              bankData={bankData}
              editMode={editMode}
            />
          </div>
          <div id="merchant_referral" data-scrollspy-anchor="merchant_referral">
            <MerchantReferralSection 
              bankData={bankData}
              editMode={editMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

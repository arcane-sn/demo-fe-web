'use client';

import React, { Fragment, useState } from 'react';
import { useRouter, useParams, usePathname, useSearchParams } from 'next/navigation';
import { MerchantData } from '../../../types/merchant';
import { UserHero } from '@/app/components/partials/common/user-hero';
import { Navbar } from '@/app/components/partials/navbar/navbar';
import { 
  Building2, 
  ArrowLeft,
  CreditCard,
  Globe,
  ChevronDown,
  CheckCircle,
  XCircle,
  History
} from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { WarningBanner } from '@/components/common/warning-banner';
import { StatusBadge } from '../../components/status-badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMerchantDetails } from '../../../components/detail/core/hooks/use-merchant-details';
import { MerchantService } from '../../../core/services/merchant.service';
import { ModalApproval } from '@/components/shared/modals/modal-approved';
import { ModalSubmit } from '@/components/shared/modals/modal-submit';
import { ModalReject } from '@/components/shared/modals/modal-reject';
import { ChangeLogModal } from './modal/change-log-modal';

interface TabConfig {
  id: string;
  label: string;
  icon: string; // KeenIcon icon name
  hasDropdown?: boolean;
  dropdownOptions?: DropdownOption[];
}

interface DropdownOption {
  value: string;
  label: string;
}

const defaultTabs: TabConfig[] = [
  { id: 'general-info', label: 'General Info', icon: 'file-sheet' },
  { id: 'support-docs', label: 'Support Docs', icon: 'document' },
  { 
    id: 'services-pricing', 
    label: 'Services & Pricing', 
    icon: 'rocket', 
    hasDropdown: true,
    dropdownOptions: [
      { value: 'service-type', label: 'Service Type' },
      { value: 'payment-gateway', label: 'Payment Gateway Service' },
      { value: 'disbursement', label: 'Disbursement Service' },
    ]
  },
  { id: 'hierarchy', label: 'Hierarchy', icon: 'element-6' },
  { id: 'credentials', label: 'Credentials', icon: 'key' },
  { id: 'activity', label: 'Activity', icon: 'compass' },
  { id: 'others', label: 'Others', icon: 'note-2' },
];

interface MerchantReviewDetailLayoutContentProps {
  children: React.ReactNode;
  initialMerchant?: MerchantData | null;
}

export function MerchantReviewDetailLayoutContent({ 
  children,
  initialMerchant 
}: MerchantReviewDetailLayoutContentProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const merchantId = params.id as string;
  const { merchant, loading } = useMerchantDetails();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isRejectSuccessModalOpen, setIsRejectSuccessModalOpen] = useState(false);
  const [isChangeLogModalOpen, setIsChangeLogModalOpen] = useState(false);
  
  // Use merchant from context, fallback to initialMerchant
  const currentMerchant = merchant || initialMerchant;

  // Extract current tab from pathname
  const currentTab = pathname.split('/').pop() || 'general-info';
  
  // Get review tab from URL query parameter
  const tabFromUrl = searchParams.get('tab');
  const reviewTab = (tabFromUrl === 'merchant-adjustment' || tabFromUrl === 'new-merchant') 
    ? tabFromUrl 
    : 'new-merchant';
  
  // Show Change Log button only for merchant-adjustment
  const showChangeLogButton = reviewTab === 'merchant-adjustment';

  const handleBack = () => {
    // Preserve tab query parameter when going back
    const tabParam = reviewTab === 'merchant-adjustment' ? '?tab=merchant-adjustment' : '';
    router.push(`/merchant/review${tabParam}`);
  };

  const handleTabClick = (tabId: string) => {
    // Preserve tab query parameter when navigating between tabs
    const tabParam = reviewTab === 'merchant-adjustment' ? '?tab=merchant-adjustment' : '';
    router.push(`/merchant/review/${merchantId}/${tabId}${tabParam}`);
  };
  
  const handleServiceTypeClick = (serviceType: string) => {
    router.push(`/merchant/review/${merchantId}/services-pricing/${serviceType}`);
  };

  const handleOpenApprovalModal = () => {
    if (!currentMerchant) return;
    setIsApprovalModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!currentMerchant) return;
    
    setIsApproving(true);
    try {
      await MerchantService.approveMerchant(merchantId);
      setIsApprovalModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to approve merchant:', error);
      alert('Failed to approve merchant. Please try again.');
    } finally {
      setIsApproving(false);
    }
  };

  const handleCancelApproval = () => {
    setIsApprovalModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    // Redirect back to review page after closing success modal
    router.push('/merchant/review');
  };

  const handleOpenRejectModal = () => {
    if (!currentMerchant) return;
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async (reason: string) => {
    if (!currentMerchant) return;
    
    setIsRejecting(true);
    try {
      await MerchantService.rejectMerchant(merchantId);
      setIsRejectModalOpen(false);
      // Show success modal after rejection
      setIsRejectSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to reject merchant:', error);
      alert('Failed to reject merchant. Please try again.');
    } finally {
      setIsRejecting(false);
    }
  };

  const handleCancelReject = () => {
    setIsRejectModalOpen(false);
  };

  const handleRejectSuccessModalClose = () => {
    setIsRejectSuccessModalOpen(false);
    // Redirect back to review page after closing success modal
    router.push('/merchant/review');
  };

  const handleOpenChangeLogModal = () => {
    setIsChangeLogModalOpen(true);
  };

  // Show loading only if we don't have any merchant data
  if (loading && !currentMerchant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading merchant data...</p>
        </div>
      </div>
    );
  }

  if (!currentMerchant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Merchant Not Found</h1>
          <p className="text-muted-foreground mt-2">The merchant you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/merchant/review')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Merchant Review
          </button>
        </div>
      </div>
    );
  }

  const merchantImage = (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-full border-3 border-primary size-[100px] shrink-0 bg-primary/10 flex items-center justify-center">
        <Building2 className="size-12 text-primary" />
      </div>
      {(currentMerchant.reviewStatus === 'draft' ||
        currentMerchant.reviewStatus === 'pending-review' || 
        currentMerchant.reviewStatus === 'approved' || 
        currentMerchant.reviewStatus === 'rejected') && (
        <StatusBadge 
          status={currentMerchant.reviewStatus} 
          className="rounded-full"
        />
      )}
    </div>
  );

  return (
    <Fragment>
      <Container>
        {/* Header with Back Button, Title, and Action Buttons */}
        <div className="flex items-center justify-between py-4 ">
          {/* Left Side - Back Button and Title */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              disabled={isProcessing}
              className="flex items-center gap-2 border p-2"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="text-xl font-semibold">Merchant Detail</h1>
          </div>

          {/* Right Side - Action Buttons */}
          <div className='flex gap-2'>
            {showChangeLogButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenChangeLogModal}
                disabled={isProcessing}
                className="flex items-center gap-2 py-4 px-3 border-primary text-primary bg-primary/10"
              >
                <History className="h-4 w-4" />
                Change Log
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleOpenRejectModal}
              disabled={isProcessing || currentMerchant.reviewStatus !== 'pending-review'}
              className="flex items-center gap-2 py-4 px-6"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={handleOpenApprovalModal}
              disabled={isProcessing || currentMerchant.reviewStatus !== 'pending-review'}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 py-4 px-4"
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        {currentMerchant.reviewStatus === 'draft' && (
          <div className="my-6">
            <WarningBanner
              title="Draft Merchant"
              description="This merchant is currently in draft status. You can continue editing or submit it for review."
              className="bg-violet-50 border-violet-300"
              iconColor="text-violet-600"
            />
          </div>
        )}
        {currentMerchant.reviewStatus === 'pending-review' && (
          <div className="my-6">
            <WarningBanner
              title="Pending Review Merchant"
              description="This merchant is currently under review and must be approved before going live"
              iconColor="text-yellow-600"
            />
          </div>
        )}
        {currentMerchant.reviewStatus === 'approved' && (
          <div className="my-6">
            <WarningBanner
              title="Approved Merchant"
              description="This merchant has been approved and is now live. You can review the adjustment changes made to this merchant."
              className="bg-green-50 border-green-300"
              iconColor="text-green-600"
            />
          </div>
        )}
        {currentMerchant.reviewStatus === 'rejected' && (
          <div className="my-6">
            <WarningBanner
              title="Rejected Merchant"
              description="This merchant has been rejected. You can review the adjustment changes that were requested."
              className="bg-red-50 border-red-300"
              iconColor="text-red-600"
            />
          </div>
        )}

        <UserHero
          name={currentMerchant.companyName}
          image={merchantImage}
          info={[
            { label: currentMerchant.brandName, icon: Globe },
            { label: currentMerchant.clientId, icon: CreditCard },
            { label: `Level ${currentMerchant.merchantLevel.level}`, icon: Building2 },
          ]}
        />
        
        {/* Tab Menu */}
        <Navbar className="w-full">
          <div className="flex items-center gap-1 overflow-x-auto flex-1">
            {defaultTabs.map((tab) => {
              const isActive = currentTab === tab.id || (tab.id === 'services-pricing' && currentTab.startsWith('services-pricing'));
              
              if (tab.hasDropdown && tab.dropdownOptions) {
                return (
                  <DropdownMenu key={tab.id}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "relative h-12 px-4 rounded-none border-b-2 border-transparent hover:bg-muted/50 transition-colors whitespace-nowrap text-gray-600",
                          isActive && "border-primary text-primary bg-primary/5"
                        )}
                      >
                        <KeenIcon icon={tab.icon} style="outline" className="text-lg mr-1" />
                        {tab.label}
                        <ChevronDown className="size-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {tab.dropdownOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => handleServiceTypeClick(option.value)}
                          className={cn(
                            currentTab === `services-pricing/${option.value}` && "bg-primary/10 text-primary"
                          )}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    "relative h-12 px-4 rounded-none border-b-2 border-transparent hover:bg-muted/50 transition-colors whitespace-nowrap text-gray-600",
                    isActive && "border-primary text-primary bg-primary/5"
                  )}
                >
                  <KeenIcon icon={tab.icon} style="outline" className="text-lg mr-1" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </Navbar>
      </Container>
      
      {/* Tab Content */}
      <Container>
        <div className="py-6">
          {children}
        </div>
      </Container>

      {/* Approval Confirmation Modal */}
      <ModalApproval
        open={isApprovalModalOpen}
        onOpenChange={setIsApprovalModalOpen}
        headerTitle="Approve Confirmation"
        title="Approve Merchant Request?"
        description="Please review the details before proceeding."
        onApprove={handleConfirmApprove}
        onCancel={handleCancelApproval}
        isLoading={isApproving}
      />

      {/* Success Modal */}
      <ModalSubmit
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        title="Merchant Approved"
        imageSrc="/media/illustrations/32.svg"
        imageAlt="Merchant approved successfully"
        imageWidth={200}
        imageHeight={188}
        message="Merchant Approved Successfully!"
        description="This merchant has been successfully approved and is now active"
        buttonText="Okay!"
        onButtonClick={handleSuccessModalClose}
      />

      {/* Reject Confirmation Modal */}
      <ModalReject
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        headerTitle="Reject Confirmation"
        title="Are You Sure You Want to Reject This Merchant?"
        description="Once rejected, this merchant will be deleted."
        onReject={handleConfirmReject}
        onCancel={handleCancelReject}
        isLoading={isRejecting}
      />

      {/* Reject Success Modal */}
      <ModalSubmit
        open={isRejectSuccessModalOpen}
        onOpenChange={setIsRejectSuccessModalOpen}
        title="Merchant Rejected"
        imageSrc="/media/illustrations/10.svg"
        imageAlt="Merchant rejected successfully"
        imageWidth={200}
        imageHeight={188}
        message="Merchant Rejected!"
        description="This merchant has been rejected and deleted."
        buttonText="Okay!"
        onButtonClick={handleRejectSuccessModalClose}
      />

      {/* Change Log Modal */}
      <ChangeLogModal
        open={isChangeLogModalOpen}
        onOpenChange={setIsChangeLogModalOpen}
        merchantId={merchantId}
      />
    </Fragment>
  );
}


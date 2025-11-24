'use client';

import React, { Fragment } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { MerchantData } from '../../../../types/merchant';
import { UserHero } from '@/app/components/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/app/components/partials/navbar/navbar';
import { DropdownMenu9 } from '@/app/components/partials/dropdown-menu/dropdown-menu-9';
import { 
  Building2, 
  Edit,
  ArrowLeft,
  EllipsisVertical,
  CreditCard,
  Globe,
  ChevronDown
} from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMerchantDetails } from '../../../../components/detail/core/hooks/use-merchant-details';

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
  { id: 'general-info', label: 'General Info', icon: 'shop' },
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

interface MerchantDetailsLayoutContentProps {
  children: React.ReactNode;
  initialMerchant?: MerchantData | null;
}

export function MerchantDetailsLayoutContent({ 
  children,
  initialMerchant 
}: MerchantDetailsLayoutContentProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const merchantId = params.id as string;
  const { merchant, loading, deleteMerchant } = useMerchantDetails();
  
  // Use merchant from context, fallback to initialMerchant
  const currentMerchant = merchant || initialMerchant;

  // Extract current tab from pathname
  const currentTab = pathname.split('/').pop() || 'general-info';

  const handleEdit = () => {
    router.push(`/merchant/list/edit/${merchantId}`);
  };

  const handleDelete = async () => {
    await deleteMerchant(merchantId);
    router.push('/merchant/list');
  };

  const handleBack = () => {
    router.push('/merchant/list');
  };

  const handleTabClick = (tabId: string) => {
    router.push(`/merchant/list/details/${merchantId}/${tabId}`);
  };
  
  const handleServiceTypeClick = (serviceType: string) => {
    router.push(`/merchant/list/details/${merchantId}/services-pricing/${serviceType}`);
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
            onClick={() => router.push('/merchant/list')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Merchant List
          </button>
        </div>
      </div>
    );
  }

  const merchantImage = (
    <div className="rounded-full border-3 border-primary size-[100px] shrink-0 bg-primary/10 flex items-center justify-center">
      <Building2 className="size-12 text-primary" />
    </div>
  );

  return (
    <Fragment>
      <Container>
        {/* Header with Back Button and Title */}
        <div className="flex items-center gap-4 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="flex items-center gap-2 border p-2"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-xl font-semibold">Merchant Detail</h1>
        </div>

        <UserHero
          name={currentMerchant.companyName}
          image={merchantImage}
          info={[
            { label: currentMerchant.brandName, icon: Globe },
            { label: currentMerchant.clientId, icon: CreditCard },
            { label: `Level ${currentMerchant.merchantLevel.level}`, icon: Building2 },
          ]}
        />
        <Navbar className="w-full">
          {/* Tab Menu - Left Side */}
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

          {/* Action Buttons - Right Side */}
          <NavbarActions>
            <div className='flex gap-2'>
              <Button onClick={handleEdit} variant="outline" className='gap-2 border-primary text-primary bg-primary/10'>
                <KeenIcon icon="notepad-edit" style="outline" className="text-lg" />
                Edit Merchant
              </Button>
              {/* <DropdownMenu9
                trigger={
                  <Button variant="outline" mode="icon">
                    <EllipsisVertical />
                  </Button>
                }
              /> */}
            </div>
          </NavbarActions>
        </Navbar>
      </Container>
      
      {/* Tab Content */}
      <Container>
        <div className="py-6">
          {children}
        </div>
      </Container>
    </Fragment>
  );
}


'use client';

import React, { Fragment } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MerchantData } from '../../../types/merchant';
import { UserHero } from '@/app/components/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/app/components/partials/navbar/navbar';
import { DropdownMenu9 } from '@/app/components/partials/dropdown-menu/dropdown-menu-9';
import { 
  Building2, 
  Edit,
  ArrowLeft,
  EllipsisVertical,
  CreditCard,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { UnifiedTabMenu } from './shared/unified-tab-menu';
import { useMerchantDetails } from '../core/hooks/use-merchant-details';

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
  const merchantId = params.id as string;
  const { merchant, loading, deleteMerchant } = useMerchantDetails();
  
  // Use merchant from context, fallback to initialMerchant
  const currentMerchant = merchant || initialMerchant;

  const handleEdit = () => {
    router.push(`/merchant/${merchantId}/edit`);
  };

  const handleDelete = async () => {
    await deleteMerchant(merchantId);
    router.push('/merchant/list');
  };

  const handleBack = () => {
    router.push('/merchant/list');
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
      <UserHero
        name={currentMerchant.companyName}
        image={merchantImage}
        info={[
          { label: currentMerchant.brandName, icon: Globe },
          { label: currentMerchant.clientId, icon: CreditCard },
          { label: `Level ${currentMerchant.merchantLevel.level}`, icon: Building2 },
        ]}
      />
      <Container>
        <Navbar>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="size-4 mr-2" />
              Back to List
            </Button>
          </div>
          <NavbarActions>
            <Button onClick={handleEdit}>
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
          </NavbarActions>
        </Navbar>
      </Container>
      
      {/* Tab Navigation */}
      <UnifiedTabMenu merchantId={merchantId} />
      
      {/* Tab Content */}
      <Container>
        <div className="py-6">
          {children}
        </div>
      </Container>
    </Fragment>
  );
}


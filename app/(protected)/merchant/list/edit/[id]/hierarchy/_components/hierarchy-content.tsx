'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useHierarchyForm, useHierarchyData } from '../_hooks';
import { 
  ParentMerchantSection,
  SubMerchantsSection,
} from './sections';
import { HierarchyModals } from './shared';


export function HierarchyContent() {
  const {
    form,
    onSubmit,
    showAvailableParents,
    showAvailableSubMerchants,
    showHierarchyModal,
    setShowAvailableParents,
    setShowAvailableSubMerchants,
    setShowHierarchyModal,
    availableParents,
    availableSubMerchants,
    handleSelectParent,
    handleSelectSubMerchant,
    handleRemoveSubMerchant
  } = useHierarchyForm();

  const { filteredParents } = useHierarchyData(
    availableParents,
    form.watch('selectedLevel')
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <CardTitle>Merchant Hierarchy</CardTitle>
            <Button 
              type="button"
              variant="outline"
              className='bg-blue-100 border border-blue-500 text-blue-600'
              onClick={() => setShowHierarchyModal(true)}
            >
              <KeenIcon icon="eye" style="outline" className="w-4 h-4 mr-2" />
              View Hierarchy
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <p className="text-sm text-muted-foreground mt-1">
                Manage Parent and Sub-Merchant for this merchant
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Parent Merchant Section */}
        <ParentMerchantSection
          form={form}
          availableParents={availableParents}
          onShowAvailableParents={() => setShowAvailableParents(true)}
        />

        {/* Sub Merchants Section */}
        <SubMerchantsSection
          form={form}
          availableSubMerchants={availableSubMerchants}
          onShowAvailableSubMerchants={() => setShowAvailableSubMerchants(true)}
          onRemoveSubMerchant={handleRemoveSubMerchant}
        />


        {/* Modals */}
        <HierarchyModals
          showAvailableParents={showAvailableParents}
          showAvailableSubMerchants={showAvailableSubMerchants}
          showHierarchyModal={showHierarchyModal}
          setShowAvailableParents={setShowAvailableParents}
          setShowAvailableSubMerchants={setShowAvailableSubMerchants}
          setShowHierarchyModal={setShowHierarchyModal}
          filteredParents={filteredParents}
          availableSubMerchants={availableSubMerchants}
          selectedSubMerchants={form.watch('selectedSubMerchants') || []}
          onSelectParent={handleSelectParent}
          onSelectSubMerchant={handleSelectSubMerchant}
          onRemoveSubMerchant={handleRemoveSubMerchant}
        />
      </form>
    </Form>
  );
}

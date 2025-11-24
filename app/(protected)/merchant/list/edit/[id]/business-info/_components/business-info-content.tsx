'use client';

import { Form } from '@/components/ui/form';
import { getBusinessInfoSchema, type BusinessInfoSchemaType } from '../../../../../core/schemas';
import { useFormBase } from '../../core/hooks/use-form-base';
import { useEditContext } from '../../_components/edit-provider';
import { createErrorContext, handleAsyncOperation } from '../../core/lib/error-handler';
import { MerchantData } from '../../../../../types/merchant';
import {
  BusinessProfileSection,
  BusinessAddressSection,
  BusinessCharacteristicsSection,
  BankInformationSection,
} from './sections';

export function BusinessInfoContent() {
  const { updateMerchant, merchant } = useEditContext();
  
  const defaultValues: BusinessInfoSchemaType = {
    profile: {
      companyName: '',
      brandName: '',
      phoneNumber: '',
      email: '',
      businessType: '',
      businessIndustry: '',
      website: ''
    },
    address: {
      address: '',
      country: 'Indonesia',
      province: '',
      city: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      legalAddressSame: true
    },
    characteristics: {
      businessModel: '',
      corporateTaxType: '',
      currentMonthlySales: '',
      estimatedMonthlySales: '',
      averageEstimatedRevenue: '',
      transferService: false,
      transferUseCase: '',
      transferVolume: ''
    },
    bank: {
      bankNameCode: '',
      accountNumber: '',
      accountName: ''
    }
  };

  const { form, handleSubmit } = useFormBase<BusinessInfoSchemaType>({
    schema: getBusinessInfoSchema(),
    defaultValues,
    onSubmit: async (data) => {
      if (!merchant?.id) {
        throw new Error('Merchant ID is not available. Please refresh the page.');
      }

      // Transform BusinessInfoSchemaType to Partial<MerchantData>
      const updateData: Partial<MerchantData> = {
        // Profile fields
        companyName: data.profile.companyName,
        brandName: data.profile.brandName,
        phoneNumber: data.profile.phoneNumber,
        email: data.profile.email,
        businessType: data.profile.businessType,
        businessIndustry: data.profile.businessIndustry,
        website: data.profile.website,
        
        // Address fields
        address: data.address.address,
        country: data.address.country,
        province: data.address.province,
        city: data.address.city,
        district: data.address.district,
        subDistrict: data.address.subDistrict,
        postalCode: data.address.postalCode,
        legalAddressSame: data.address.legalAddressSame,
        
        // Characteristics fields
        businessModel: data.characteristics.businessModel,
        corporateTaxType: data.characteristics.corporateTaxType,
        currentMonthlySales: Number(data.characteristics.currentMonthlySales) || 0,
        estimatedMonthlySales: Number(data.characteristics.estimatedMonthlySales) || 0,
        averageEstimatedRevenue: Number(data.characteristics.averageEstimatedRevenue) || 0,
        transferService: data.characteristics.transferService,
        transferUseCase: data.characteristics.transferUseCase || '',
        transferVolume: data.characteristics.transferVolume || '',
        
        // Bank fields
        bankCode: data.bank.bankNameCode,
        accountNumber: data.bank.accountNumber,
        accountName: data.bank.accountName,
      };

      const context = createErrorContext('update', 'business info');
      await handleAsyncOperation(
        () => updateMerchant(merchant.id, updateData),
        context
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-4xl mx-auto space-y-8">
        <BusinessProfileSection control={form.control} />
        <BusinessAddressSection control={form.control} />
        <BusinessCharacteristicsSection control={form.control} />
        <BankInformationSection control={form.control} />
      </form>
    </Form>
  );
}

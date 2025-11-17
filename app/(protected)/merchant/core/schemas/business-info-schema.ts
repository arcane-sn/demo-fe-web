import { z } from 'zod';
import { baseSchemaParts, fieldMessages, commonFields } from './base/common-fields';

export const getBusinessInfoSchema = () => {
  return z.object({
    profile: z.object(baseSchemaParts.companyProfile),
    address: z.object(baseSchemaParts.address),
    characteristics: z.object({
      businessModel: commonFields.requiredString(fieldMessages.required.businessModel),
      corporateTaxType: commonFields.requiredString(fieldMessages.required.corporateTaxType),
      currentMonthlySales: commonFields.requiredString(fieldMessages.required.currentMonthlySales),
      estimatedMonthlySales: commonFields.requiredString(fieldMessages.required.estimatedMonthlySales),
      averageEstimatedRevenue: commonFields.requiredString(fieldMessages.required.averageEstimatedRevenue),
      transferService: commonFields.boolean(),
      transferUseCase: commonFields.optionalString(),
      transferVolume: commonFields.optionalString(),
    }),
    bank: z.object(baseSchemaParts.bankInfo),
  });
};

export type BusinessInfoSchemaType = z.infer<ReturnType<typeof getBusinessInfoSchema>>;


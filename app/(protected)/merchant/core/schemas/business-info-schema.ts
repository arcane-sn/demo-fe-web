import { z } from 'zod';
import { baseSchemaParts, fieldMessages, commonFields } from './base/common-fields';

export const getBusinessInfoSchema = () => {
  return z.object({
    profile: z.object(baseSchemaParts.companyProfile),
    address: z.object(baseSchemaParts.address).superRefine((data, ctx) => {
      // If legalAddressSame is false, legal address fields are required
      if (!data.legalAddressSame) {
        if (!data.legalAddress || data.legalAddress.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal address is required.',
            path: ['legalAddress'],
          });
        }
        if (!data.legalCountry || data.legalCountry.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal country is required.',
            path: ['legalCountry'],
          });
        }
        if (!data.legalProvince || data.legalProvince.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal province is required.',
            path: ['legalProvince'],
          });
        }
        if (!data.legalCity || data.legalCity.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal city is required.',
            path: ['legalCity'],
          });
        }
        if (!data.legalDistrict || data.legalDistrict.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal district is required.',
            path: ['legalDistrict'],
          });
        }
        if (!data.legalSubDistrict || data.legalSubDistrict.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal sub-district is required.',
            path: ['legalSubDistrict'],
          });
        }
        if (!data.legalPostalCode || data.legalPostalCode.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Legal postal code is required.',
            path: ['legalPostalCode'],
          });
        }
      }
    }),
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


import { z } from 'zod';
import { commonFields, fieldMessages } from './base/common-fields';

export const getOthersSchema = () => {
  return z.object({
    brandColors: z.object({
      primary: commonFields.colorHex(fieldMessages.validation.colorHex),
      secondary: commonFields.colorHex(fieldMessages.validation.colorHex),
      accent: commonFields.colorHex(fieldMessages.validation.colorHex),
      background: commonFields.colorHex(fieldMessages.validation.colorHex),
    }),
    salesReferralId: commonFields.optionalString(),
    salesReferralFee: commonFields.optionalString(),
    merchantReferralClientId: commonFields.optionalString(),
    merchantReferralFee: commonFields.optionalString(),
    additionalNotes: commonFields.optionalString(),
    companyLogo: z.array(z.any()).optional(), // For file uploads
  });
};

export type OthersSchemaType = z.infer<ReturnType<typeof getOthersSchema>>;


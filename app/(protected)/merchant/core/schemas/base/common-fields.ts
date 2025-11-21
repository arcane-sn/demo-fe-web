/**
 * Shared Schema Parts - Common Fields
 * Reusable validation fields for consistent validation across all schemas
 */

import { z } from 'zod';

/**
 * Common field validations
 */
export const commonFields = {
  /**
   * Required string field
   */
  requiredString: (message?: string) => 
    z.string().min(1, { message: message || 'This field is required.' }),

  /**
   * Optional string field
   */
  optionalString: () => z.string().optional(),

  /**
   * Email validation
   */
  email: (messages?: { required?: string; invalid?: string }) =>
    z
      .string()
      .min(1, { message: messages?.required || 'This field is required.' })
      .email({ message: messages?.invalid || 'Please enter a valid email address.' }),

  /**
   * URL validation (optional)
   */
  optionalUrl: (message?: string) =>
    z.string().url({ message: message || 'Please enter a valid URL.' }).optional().or(z.literal('')),

  /**
   * URL validation (required)
   */
  requiredUrl: (messages?: { required?: string; invalid?: string }) =>
    z
      .string()
      .min(1, { message: messages?.required || 'This field is required.' })
      .url({ message: messages?.invalid || 'Please enter a valid URL.' }),

  /**
   * Phone number validation (numbers only)
   */
  phoneNumber: (message?: string) => 
    z.string()
      .min(1, { message: message || 'Phone number is required.' })
      .regex(/^\d+$/, { message: 'Phone number must contain only numbers.' }),

  /**
   * Boolean field
   */
  boolean: () => z.boolean(),

  /**
   * Array of strings
   */
  stringArray: () => z.array(z.string()),

  /**
   * Color hex code validation
   */
  colorHex: (message?: string) => 
    z.string().regex(/^#[0-9A-F]{6}$/i, { message: message || 'Invalid color format. Use hex format (#RRGGBB).' }),
};

/**
 * Common field messages
 */
export const fieldMessages = {
  required: {
    companyName: 'This field is required.',
    brandName: 'This field is required.',
    phoneNumber: 'This field is required.',
    email: 'This field is required.',
    businessType: 'Please select an option.',
    businessIndustry: 'Please select an option.',
    website: 'This field is required.',
    atLeastOnePic: 'Add at least one PIC in the section below.',
    address: 'Address is required.',
    country: 'Country is required.',
    province: 'Province is required.',
    city: 'City is required.',
    district: 'District is required.',
    subDistrict: 'Sub-district is required.',
    postalCode: 'Postal code is required.',
    businessModel: 'Business model is required.',
    corporateTaxType: 'Corporate tax type is required.',
    currentMonthlySales: 'Current monthly sales is required.',
    estimatedMonthlySales: 'Estimated monthly sales is required.',
    averageEstimatedRevenue: 'Average estimated revenue is required.',
    bankNameCode: 'Bank name/code is required.',
    accountNumber: 'Account number is required.',
    accountName: 'Account name is required.',
    fullName: 'Full name is required.',
    position: 'Position is required.',
    selectedLevel: 'Merchant level is required.',
  },
  validation: {
    email: 'Please enter a valid email address.',
    url: 'Please enter a valid website URL.',
    colorHex: 'Invalid color format. Use hex format (#RRGGBB).',
  },
};

/**
 * Reusable schema parts
 */
export const baseSchemaParts = {
  /**
   * Company/Business profile fields
   */
  companyProfile: {
    companyName: commonFields.requiredString(fieldMessages.required.companyName),
    brandName: commonFields.requiredString(fieldMessages.required.brandName),
    phoneNumber: commonFields.phoneNumber(fieldMessages.required.phoneNumber),
    email: commonFields.email({
      required: fieldMessages.required.email,
      invalid: fieldMessages.validation.email,
    }),
    businessType: commonFields.requiredString(fieldMessages.required.businessType),
    businessIndustry: commonFields.requiredString(fieldMessages.required.businessIndustry),
    website: commonFields.requiredUrl({
      required: fieldMessages.required.website,
      invalid: fieldMessages.validation.url,
    }),
  },

  /**
   * Address fields
   */
  address: {
    address: commonFields.requiredString(fieldMessages.required.address),
    country: commonFields.requiredString(fieldMessages.required.country),
    province: commonFields.requiredString(fieldMessages.required.province),
    city: commonFields.requiredString(fieldMessages.required.city),
    district: commonFields.requiredString(fieldMessages.required.district),
    subDistrict: commonFields.requiredString(fieldMessages.required.subDistrict),
    postalCode: commonFields.requiredString(fieldMessages.required.postalCode),
    legalAddressSame: commonFields.boolean(),
    legalAddress: commonFields.optionalString(),
    legalCountry: commonFields.optionalString(),
    legalProvince: commonFields.optionalString(),
    legalCity: commonFields.optionalString(),
    legalDistrict: commonFields.optionalString(),
    legalSubDistrict: commonFields.optionalString(),
    legalPostalCode: commonFields.optionalString(),
  },

  /**
   * Bank information fields
   */
  bankInfo: {
    bankNameCode: commonFields.requiredString(fieldMessages.required.bankNameCode),
    accountNumber: commonFields.requiredString(fieldMessages.required.accountNumber),
    accountName: commonFields.requiredString(fieldMessages.required.accountName),
  },

  /**
   * PIC (Person in Charge) fields
   */
  picInfo: {
    fullName: commonFields.requiredString(fieldMessages.required.fullName),
    position: commonFields.requiredString(fieldMessages.required.position),
    phoneNumber: commonFields.phoneNumber(fieldMessages.required.phoneNumber),
    email: commonFields.email({
      required: fieldMessages.required.email,
      invalid: fieldMessages.validation.email,
    }),
  },
};


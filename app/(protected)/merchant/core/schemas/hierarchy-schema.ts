import { z } from 'zod';
import { commonFields, fieldMessages } from './base/common-fields';

export const getHierarchySchema = () => {
  return z.object({
    selectedLevel: commonFields.requiredString(fieldMessages.required.selectedLevel),
    selectedParent: commonFields.optionalString(),
    hasParentMerchant: commonFields.boolean(),
    hasSubMerchants: commonFields.boolean().optional(),
    selectedSubMerchants: commonFields.stringArray().optional(),
  });
};

export type HierarchySchemaType = z.infer<ReturnType<typeof getHierarchySchema>>;


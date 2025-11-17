import { z } from 'zod';
import { commonFields, fieldMessages } from './base/common-fields';

const getDocumentItemSchema = () => {
  return z.object({
    id: commonFields.requiredString(),
    name: commonFields.requiredString(),
    checked: commonFields.boolean(),
    filename: commonFields.optionalString(),
  });
};

export const getDocumentsSchema = () => {
  return z.object({
    sharedFolderLink: commonFields.optionalUrl(fieldMessages.validation.url),
    documents: z.array(getDocumentItemSchema()),
  });
};

export type DocumentsSchemaType = z.infer<ReturnType<typeof getDocumentsSchema>>;


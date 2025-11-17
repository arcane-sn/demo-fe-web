import { z } from 'zod';
import { baseSchemaParts } from './base/common-fields';

const getPicDataSchema = () => {
  return z.object(baseSchemaParts.picInfo);
};

export const getPicInfoSchema = () => {
  return z.object({
    owner: getPicDataSchema(),
    business: getPicDataSchema(),
    finance: getPicDataSchema(),
    technical: getPicDataSchema(),
  });
};

export type PicInfoSchemaType = z.infer<ReturnType<typeof getPicInfoSchema>>;


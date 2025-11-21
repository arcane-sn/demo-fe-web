import { z } from 'zod';
import { commonFields, fieldMessages } from './base/common-fields';

const PIC_SECTIONS = ['owner', 'business', 'finance', 'technical'] as const;

type PicSectionKey = (typeof PIC_SECTIONS)[number];

type PicSectionData = {
  fullName?: string | null;
  position?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
};

const trimValue = (value?: string | null) => value?.trim() ?? '';

const isPicSectionEmpty = (section: PicSectionData) =>
  !trimValue(section.fullName) &&
  !trimValue(section.position) &&
  !trimValue(section.phoneNumber) &&
  !trimValue(section.email);

const phoneNumberSchema = commonFields.phoneNumber(fieldMessages.required.phoneNumber);
const emailSchema = commonFields.email({
  required: fieldMessages.required.email,
  invalid: fieldMessages.validation.email,
});

const createPicDataSchema = () => {
  return z
    .object({
      fullName: z.string().optional(),
      position: z.string().optional(),
      phoneNumber: z.string().optional(),
      email: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (isPicSectionEmpty(data)) {
        return;
      }

      if (!trimValue(data.fullName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldMessages.required.fullName,
          path: ['fullName'],
        });
      }

      if (!trimValue(data.position)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldMessages.required.position,
          path: ['position'],
        });
      }

      const phoneValue = trimValue(data.phoneNumber);
      if (!phoneValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldMessages.required.phoneNumber,
          path: ['phoneNumber'],
        });
      } else {
        const phoneResult = phoneNumberSchema.safeParse(phoneValue);
        if (!phoneResult.success) {
          const phoneMessage = phoneResult.error.issues[0]?.message ?? 'Invalid phone number.';
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: phoneMessage,
            path: ['phoneNumber'],
          });
        }
      }

      const emailValue = trimValue(data.email);
      if (!emailValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldMessages.required.email,
          path: ['email'],
        });
      } else {
        const emailResult = emailSchema.safeParse(emailValue);
        if (!emailResult.success) {
          const emailMessage =
            emailResult.error.issues[0]?.message ?? fieldMessages.validation.email;
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: emailMessage,
            path: ['email'],
          });
        }
      }
    });
};

const withAtLeastOnePic = (schema: z.ZodObject<Record<PicSectionKey, z.ZodTypeAny>>) => {
  return schema.superRefine((data, ctx) => {
    const hasAtLeastOne = PIC_SECTIONS.some((section) => !isPicSectionEmpty(data[section]));
    if (!hasAtLeastOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: fieldMessages.required.atLeastOnePic,
      });
    }
  });
};

export const getPicInfoSchema = () => {
  return withAtLeastOnePic(
    z.object({
      owner: createPicDataSchema(),
      business: createPicDataSchema(),
      finance: createPicDataSchema(),
      technical: createPicDataSchema(),
    })
  );
};

export type PicInfoSchemaType = z.infer<ReturnType<typeof getPicInfoSchema>>;


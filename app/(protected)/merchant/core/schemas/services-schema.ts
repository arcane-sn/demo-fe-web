import { z } from 'zod';

export const getServicesSchema = () => {
  return z.object({
    serviceData: z.object({
      paymentGateway: z.boolean(),
      disbursementService: z.boolean(),
      paymentGatewayIntegration: z.string(),
      disbursementIntegration: z.string(),
      accountInquiry: z.boolean(),
    }),
    paymentMethods: z.object({
      eWallet: z.boolean(),
      dana: z.boolean(),
      shopeePlay: z.boolean(),
      qrCode: z.boolean(),
      qris: z.boolean(),
      virtualAccount: z.boolean(),
      vaPermataBank: z.boolean(),
      vaCimbNiaga: z.boolean(),
      directDebit: z.boolean(),
      debitCreditCard: z.boolean(),
    }),
    addedChannels: z.object({
      ewallet: z.array(z.string()),
      qr: z.array(z.string()),
      'virtual-account': z.array(z.string()),
      'direct-debit': z.array(z.string()),
      'credit-card': z.array(z.string()),
    }),
    disbursementPricing: z.object({
      defaultPricing: z.boolean(),
    }),
  });
};

export type ServicesSchemaType = z.infer<ReturnType<typeof getServicesSchema>>;


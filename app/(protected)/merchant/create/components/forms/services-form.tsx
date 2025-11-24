'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KeenIcon } from '@/components/keenicons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getServicesSchema, type ServicesSchemaType } from '../../../core/schemas';
import { AddChannelModal, channelData, getChannelsByType } from '../../../components/modals/chanels';
import type { ChannelType } from '../../../components/modals/chanels';
import { PaymentMethodTableSection } from './payment-method-table-section';

export function ServicesForm() {
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ChannelType>('ewallet');

  const form = useForm<ServicesSchemaType>({
    resolver: zodResolver(getServicesSchema()),
    defaultValues: {
      serviceData: {
        paymentGateway: true,
        disbursementService: true,
        paymentGatewayIntegration: 'full-api',
        disbursementIntegration: 'direct-api',
        accountInquiry: true
      },
      paymentMethods: {
        eWallet: true,
        dana: true,
        shopeePlay: true,
        qrCode: true,
        qris: true,
        virtualAccount: true,
        vaPermataBank: true,
        vaCimbNiaga: true,
        directDebit: true,
        debitCreditCard: true
      },
      addedChannels: {
        ewallet: ['dana', 'shopeepay'], // Pre-populated for demo
        qr: ['qris'],
        'virtual-account': ['va-permata', 'va-cimb'],
        'direct-debit': [],
        'credit-card': ['regular', 'recurring', 'installment']
      },
      disbursementPricing: {
        defaultPricing: true
      }
    }
  });

  const onSubmit = (data: ServicesSchemaType) => {
    // TODO: Implement form submission
  };

  const openAddChannelModal = (type: ChannelType) => {
    setModalType(type);
    setIsAddChannelModalOpen(true);
  };

  const handleAddChannels = (selectedChannels: string[]) => {
    const currentChannels = form.getValues(`addedChannels.${modalType}`);
    const newChannels = selectedChannels.filter(id => !currentChannels.includes(id));
    form.setValue(`addedChannels.${modalType}`, [...currentChannels, ...newChannels]);
  };

  const handleRemoveChannel = (channelType: ChannelType, channelId: string) => {
    const currentChannels = form.getValues(`addedChannels.${channelType}`);
    form.setValue(`addedChannels.${channelType}`, currentChannels.filter(id => id !== channelId));
  };

  const getChannelById = (channelId: string, channelType: ChannelType) => {
    const channels = getChannelsByType(channelType);
    return channels.find(channel => channel.id === channelId);
  };

  // Channel Logo Component
  const ChannelLogo = ({ channel }: { channel: { logo: string; logoColor: string; name: string } }) => (
    <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-white border">
      {channel.logo.startsWith('/media/') ? (
        <img 
          src={channel.logo} 
          alt={channel.name}
          className="w-6 h-6 object-contain"
        />
      ) : (
        <div className={`w-full h-full ${channel.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}>
          {channel.logo}
        </div>
      )}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Service Type Section */}
        <Card id='service-type'>
          <CardHeader>
            <CardTitle>Service Type</CardTitle>
            <p className="text-sm text-muted-foreground">Choose service you want to use (at least 1 service is enabled)</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Gateway */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <HexagonBadge
                    stroke="stroke-gray-300 dark:stroke-gray-600"
                    fill="fill-gray-100 dark:fill-gray-800"
                    size="size-[40px]"
                    badge={<KeenIcon icon="two-credit-cart" className="text-xl text-gray-600" />}
                  />
                  <div>
                    <h3 className="font-medium">Payment Gateway</h3>
                    <p className="text-sm text-muted-foreground">Enable to use Payment Gateway Service</p>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="serviceData.paymentGateway"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Disbursement Service */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <HexagonBadge
                    stroke="stroke-gray-300 dark:stroke-gray-600"
                    fill="fill-gray-100 dark:fill-gray-800"
                    size="size-[40px]"
                    badge={<KeenIcon icon="rocket" className="text-xl text-gray-600" />}
                  />
                  <div>
                    <h3 className="font-medium">Disbursement Service</h3>
                    <p className="text-sm text-muted-foreground">Enable to use Disbursement Service</p>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="serviceData.disbursementService"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>                
            </div>

            {/* Account Inquiry Service */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <HexagonBadge
                    stroke="stroke-gray-300 dark:stroke-gray-600"
                    fill="fill-gray-100 dark:fill-gray-800"
                    size="size-[40px]"
                    badge={<KeenIcon icon="shop" className="text-xl text-gray-600" />}
                  />
                  <div>
                    <h3 className="font-medium">Account Inquiry Service</h3>
                    <p className="text-sm text-muted-foreground">You can update the mandatory settings after the merchant has been created</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FormLabel className="text-sm">
                    Mandatory Account Inquiry
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="serviceData.accountInquiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={true}
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PG Payment Methods */}
        {form.watch('serviceData.paymentGateway') && (
          <Card id='pg-payment-methods'>
            <CardHeader>
              <CardTitle>PG Payment Methods</CardTitle>
              <p className="text-sm text-muted-foreground">PG Service need to be activated (Fee Rate Exclude VAT)</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* e-Wallet */}
              <PaymentMethodTableSection
                title="e-Wallet"
                icon={<KeenIcon icon="wallet" className="text-xl text-gray-600" />}
                channelType="ewallet"
                addedChannelIds={form.watch('addedChannels.ewallet')}
                onChannelsSelected={(selectedIds) => {
                  const currentChannels = form.getValues('addedChannels.ewallet');
                  const newChannels = selectedIds.filter(id => !currentChannels.includes(id));
                  form.setValue('addedChannels.ewallet', [...currentChannels, ...newChannels]);
                }}
                onRemoveChannel={(channelId) => handleRemoveChannel('ewallet', channelId)}
              />

              {/* QR Code */}
              <PaymentMethodTableSection
                title="QR Code"
                icon={<KeenIcon icon="scan-barcode" className="text-xl text-gray-600" />}
                channelType="qr"
                addedChannelIds={form.watch('addedChannels.qr')}
                onChannelsSelected={(selectedIds) => {
                  const currentChannels = form.getValues('addedChannels.qr');
                  const newChannels = selectedIds.filter(id => !currentChannels.includes(id));
                  form.setValue('addedChannels.qr', [...currentChannels, ...newChannels]);
                }}
                onRemoveChannel={(channelId) => handleRemoveChannel('qr', channelId)}
              />

              {/* Virtual Account */}
              <PaymentMethodTableSection
                title="Virtual Account"
                icon={<KeenIcon icon="bank" className="text-xl text-gray-600" />}
                channelType="virtual-account"
                addedChannelIds={form.watch('addedChannels.virtual-account')}
                onChannelsSelected={(selectedIds) => {
                  const currentChannels = form.getValues('addedChannels.virtual-account');
                  const newChannels = selectedIds.filter(id => !currentChannels.includes(id));
                  form.setValue('addedChannels.virtual-account', [...currentChannels, ...newChannels]);
                }}
                onRemoveChannel={(channelId) => handleRemoveChannel('virtual-account', channelId)}
              />

              {/* Direct Debit */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<KeenIcon icon="arrow-down" className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-medium">Direct Debit</h3>
                      <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => openAddChannelModal('direct-debit')}
                    className="flex items-center gap-2"
                  >
                    <KeenIcon icon="plus" className="w-4 h-4" />
                    Add Channel
                  </Button>
                </div>

                {/* Show added Direct Debit channels */}
                {form.watch('addedChannels.direct-debit').length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                    {form.watch('addedChannels.direct-debit').map((channelId) => {
                      const channel = getChannelById(channelId, 'direct-debit');
                      if (!channel) return null;
                      
                      return (
                        <div key={channelId} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div className="flex items-center gap-3">
                            <ChannelLogo channel={channel} />
                            <div>
                              <p className="font-medium text-sm">{channel.name}</p>
                              <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                              <p className="text-xs text-muted-foreground">Provider: {channel.provider}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveChannel('direct-debit', channelId)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <KeenIcon icon="trash" className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Debit / Credit Card */}
              <PaymentMethodTableSection
                title="Debit / Credit Card"
                icon={<KeenIcon icon="two-credit-cart" className="text-xl text-gray-600" />}
                channelType="credit-card"
                addedChannelIds={form.watch('addedChannels.credit-card')}
                onChannelsSelected={(selectedIds) => {
                  const currentChannels = form.getValues('addedChannels.credit-card');
                  const newChannels = selectedIds.filter(id => !currentChannels.includes(id));
                  form.setValue('addedChannels.credit-card', [...currentChannels, ...newChannels]);
                }}
                onRemoveChannel={(channelId) => handleRemoveChannel('credit-card', channelId)}
                addButtonText="Add Payment Type"
              />
            </CardContent>
          </Card>
        )}

        {/* Disbursement Pricing */}
        {form.watch('serviceData.disbursementService') && (
          <Card id='disbursement-pricing'>
            <CardHeader>
              <CardTitle>Disbursement Pricing</CardTitle>
              <p className="text-sm text-muted-foreground">Disbursement Service need to be activated</p>
            </CardHeader>
            <CardContent>
              <div 
                className="flex items-center justify-between p-4 border rounded-lg"
                style={{ 
                  backgroundImage: "url('/media/images/2600x1200/bg-5.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="flex items-center gap-3">
                  <HexagonBadge
                    stroke="stroke-purple-300 dark:stroke-gray-600"
                    fill="fill-purple-100 dark:fill-gray-800"
                    size="size-[40px]"
                    badge={<KeenIcon icon="shop" className="text-xl text-purple-600" />}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Default Pricing</h3>
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                        Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">145 Banks are active and set as a default setup</p>
                    <p className="text-sm text-muted-foreground">Pricing can be setup after merchant is created</p>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Channel Modal */}
        <AddChannelModal
          isOpen={isAddChannelModalOpen}
          onClose={() => setIsAddChannelModalOpen(false)}
          onAddChannels={handleAddChannels}
          channelType={modalType}
          availableChannels={getChannelsByType(modalType)}
        />
      </form>
    </Form>
  );
}
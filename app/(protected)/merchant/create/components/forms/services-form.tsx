'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Settings, Info, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KeenIcon } from '@/components/keenicons';
import { CreditCard, Rocket, QrCode, Building2, ArrowDownToLine, Wallet, MapPin } from 'lucide-react';
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
        accountInquiry: false
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
                    badge={<CreditCard size={20} className="text-xl text-gray-600" />}
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
                    badge={<Rocket size={20} className="text-xl text-gray-600" />}
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
                    badge={<Building2 size={20} className="text-xl text-gray-600" />}
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
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<Wallet size={20} className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-medium">e-Wallet</h3>
                      <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={() => openAddChannelModal('ewallet')}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Channel
                  </Button>
                </div>

                {/* Show added e-wallet channels */}
                {form.watch('addedChannels.ewallet').length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                    {form.watch('addedChannels.ewallet').map((channelId) => {
                      const channel = getChannelById(channelId, 'ewallet');
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
                            onClick={() => handleRemoveChannel('ewallet', channelId)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* QR Code */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<QrCode size={20} className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-medium">QR Code</h3>
                      <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={() => openAddChannelModal('qr')}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Channel
                  </Button>
                </div>

                {/* Show added QR channels */}
                {form.watch('addedChannels.qr').length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                    {form.watch('addedChannels.qr').map((channelId) => {
                      const channel = getChannelById(channelId, 'qr');
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
                            onClick={() => handleRemoveChannel('qr', channelId)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Virtual Account */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<Building2 size={20} className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-medium">Virtual Account</h3>
                      <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={() => openAddChannelModal('virtual-account')}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Channel
                  </Button>
                </div>

                {/* Show added Virtual Account channels */}
                {form.watch('addedChannels.virtual-account').length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                    {form.watch('addedChannels.virtual-account').map((channelId) => {
                      const channel = getChannelById(channelId, 'virtual-account');
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
                            onClick={() => handleRemoveChannel('virtual-account', channelId)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Direct Debit */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<ArrowDownToLine size={20} className="text-xl text-gray-600" />}
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
                    <Plus size={16} />
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
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Debit / Credit Card */}
              <div className="space-y-4">
                <div className="flex items-centexr justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <HexagonBadge
                      stroke="stroke-gray-300 dark:stroke-gray-600"
                      fill="fill-gray-100 dark:fill-gray-800"
                      size="size-[40px]"
                      badge={<CreditCard size={20} className="text-xl text-gray-600" />}
                    />
                    <div>
                      <h3 className="font-medium">Debit / Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Fee Rate Exclude VAT</p>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => openAddChannelModal('credit-card')}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Payment Type
                  </Button>
                </div>

                {/* Show added Credit Card channels */}
                {form.watch('addedChannels.credit-card').length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                    {form.watch('addedChannels.credit-card').map((channelId) => {
                      const channel = getChannelById(channelId, 'credit-card');
                      if (!channel) return null;
                      
                      // Special handling for installment to show sub-options
                      if (channelId === 'installment') {
                        return (
                          <div key={channelId} className="space-y-3">
                            {/* Main Installment item */}
                            <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="font-medium text-sm">{channel.name}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveChannel('credit-card', channelId)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            {/* Installment sub-options */}
                            <div className="ml-6 space-y-2">
                              <div className="p-3 bg-white border rounded-lg">
                                <p className="text-xs text-muted-foreground">1 Month Installment: 1.7% + IDR 5,000</p>
                              </div>
                              <div className="p-3 bg-white border rounded-lg">
                                <p className="text-xs text-muted-foreground">3 Month Installment: 1.7% + IDR 5,000</p>
                              </div>
                              <div className="p-3 bg-white border rounded-lg">
                                <p className="text-xs text-muted-foreground">6 Month Installment: 1.7% + IDR 5,000</p>
                              </div>
                              <div className="p-3 bg-white border rounded-lg">
                                <p className="text-xs text-muted-foreground">12 Month Installment: 1.7% + IDR 5,000</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      // Regular and Recurring items
                      return (
                        <div key={channelId} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium text-sm">{channel.name}</p>
                              <p className="text-xs text-muted-foreground">Setup Fee Rate: {channel.setupFeeRate}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveChannel('credit-card', channelId)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
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
                    badge={<MapPin size={20} className="text-xl text-purple-600" />}
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
'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter 
} from '@/components/ui/dialog';
import { SidebarNavigation } from '../../shared/sidebar-navigation';

export interface EditChannelData {
  id: string;
  name: string;
  logo: string;
  logoColor: string;
  category: string;
  channel: string;
  channelMode: string;
  channelBillDescriptor: string;
  minimumAmount: string;
  maximumAmount: string;
  channelCurrency: string;
  settlementDays: string;
  sameDaySettlement: boolean;
  provider: string;
  feeRatePercentage: string;
  feeRateFixed: string;
  openAmount: boolean;
  fixedAmount: boolean;
  recurring: boolean;
  salesId: string;
  salesFeePercentage: string;
  salesFeeFixed: string;
  applySalesToAll: boolean;
  merchantId: string;
  merchantFeePercentage: string;
  merchantFeeFixed: string;
  applyMerchantToAll: boolean;
}

interface EditChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditChannelData) => void;
  channelData?: EditChannelData;
}

export function EditChannelModal({
  isOpen,
  onClose,
  onSave,
  channelData
}: EditChannelModalProps) {
  const [activeSection, setActiveSection] = useState('channel-detail');
  
  // Debug: Log received channel data
  console.log('EditChannelModal received channelData:', channelData);
  
  const [formData, setFormData] = useState<EditChannelData>({
    id: channelData?.id || 'dana-001',
    name: channelData?.name || 'DANA',
    logo: channelData?.logo || '/media/chanels/dana.png',
    logoColor: channelData?.logoColor || 'bg-blue-600',
    category: channelData?.category || 'QR',
    channel: channelData?.channel || 'DANA',
    channelMode: channelData?.channelMode || 'Close',
    channelBillDescriptor: channelData?.channelBillDescriptor || 'JAYASTORE',
    minimumAmount: channelData?.minimumAmount || 'IDR 15.000',
    maximumAmount: channelData?.maximumAmount || 'IDR 100.000.000',
    channelCurrency: channelData?.channelCurrency || 'IDR',
    settlementDays: channelData?.settlementDays || '2',
    sameDaySettlement: channelData?.sameDaySettlement || false,
    provider: channelData?.provider || 'PIRO_01 - NMID11110000022',
    feeRatePercentage: channelData?.feeRatePercentage || '1.5%',
    feeRateFixed: channelData?.feeRateFixed || 'IDR 0',
    openAmount: channelData?.openAmount || true,
    fixedAmount: channelData?.fixedAmount || true,
    recurring: channelData?.recurring || true,
    salesId: channelData?.salesId || 'johndoe01',
    salesFeePercentage: channelData?.salesFeePercentage || '1.5%',
    salesFeeFixed: channelData?.salesFeeFixed || 'IDR 0',
    applySalesToAll: channelData?.applySalesToAll || true,
    merchantId: channelData?.merchantId || 'FP123123929292',
    merchantFeePercentage: channelData?.merchantFeePercentage || '1.5%',
    merchantFeeFixed: channelData?.merchantFeeFixed || 'IDR 0',
    applyMerchantToAll: channelData?.applyMerchantToAll || false,
  });

  const sections = [
    { id: 'channel-detail', title: 'Channel Detail' },
    { id: 'mdr', title: 'MDR' },
    { id: 'payment-option', title: 'Payment Option' },
    { id: 'provider', title: 'Provider' },
    { id: 'sales-referral', title: 'Sales Referral' },
    { id: 'merchant-referral', title: 'Merchant Referral' },
  ];

  const handleInputChange = (field: keyof EditChannelData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    // Reset to default values
    setFormData({
      id: 'dana-001',
      name: 'DANA',
      logo: '/media/chanels/dana.png',
      logoColor: 'bg-blue-600',
      category: 'QR',
      channel: 'DANA',
      channelMode: 'Close',
      channelBillDescriptor: 'JAYASTORE',
      minimumAmount: 'IDR 15.000',
      maximumAmount: 'IDR 100.000.000',
      channelCurrency: 'IDR',
      settlementDays: '2',
      sameDaySettlement: false,
      provider: 'PIRO_01 - NMID11110000022',
      feeRatePercentage: '1.5%',
      feeRateFixed: 'IDR 0',
      openAmount: true,
      fixedAmount: true,
      recurring: true,
      salesId: 'johndoe01',
      salesFeePercentage: '1.5%',
      salesFeeFixed: 'IDR 0',
      applySalesToAll: true,
      merchantId: 'FP123123929292',
      merchantFeePercentage: '1.5%',
      merchantFeeFixed: 'IDR 0',
      applyMerchantToAll: false,
    });
  };

  // Update formData when channelData changes
  useEffect(() => {
    if (channelData) {
      console.log('Updating formData with channelData:', channelData);
      setFormData(channelData);
    }
  }, [channelData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-200px 0px -50% 0px',
        threshold: 0.1
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="p-6 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-xl font-semibold">Edit Channel</DialogTitle>
                <p className="text-sm text-gray-500">Configure channel settings for this merchant</p>
              </div>
            </div>
          </div>
          
        </DialogHeader>

        {/* Content - 2 Column Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="p-4">
              <div className="space-y-1">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  
                  return (
                    <div
                      key={section.id}
                      onClick={() => {
                        const element = document.getElementById(section.id);
                        if (element) {
                          const elementPosition = element.offsetTop;
                          const offsetPosition = elementPosition - 200; // 200px offset for modal
                          
                          const modalContent = document.querySelector('.flex-1.overflow-y-auto');
                          if (modalContent) {
                            modalContent.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                          setActiveSection(section.id);
                        }
                      }}
                      className={`cursor-pointer flex items-center gap-3 py-3 text-base font-normal transition-all duration-200 rounded-lg px-3 ${
                        isActive 
                          ? "text-blue-600 bg-white" 
                          : "text-gray-700 hover:text-blue-600 hover:bg-white"
                      }`}
                    >
                      <span className="flex w-2 h-2 relative">
                        <span className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          isActive ? "bg-blue-600" : "bg-gray-300"
                        }`}></span>
                      </span>
                      {section.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Narrower and Longer */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6 max-w-2xl">
            <div className=" ">
              {formData.logo.startsWith('/media/') ? (
                <img 
                  src={formData.logo} 
                  alt={formData.name}
                  className="w-20 object-contain"
                />
              ) : (
                <div className={`w-full h-full ${formData.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}>
                  {formData.logo}
                </div>
              )}
            </div>

            {/* Channel Detail Card */}
              <Card id="channel-detail">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CardTitle>Channel Detail</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QR">QR</SelectItem>
                        <SelectItem value="e-wallet">e-Wallet</SelectItem>
                        <SelectItem value="virtual-account">Virtual Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Channel</label>
                    <Select value={formData.channel} onValueChange={(value) => handleInputChange('channel', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DANA">DANA</SelectItem>
                        <SelectItem value="ShopeePay">ShopeePay</SelectItem>
                        <SelectItem value="QRIS">QRIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Channel Mode</label>
                    <Select value={formData.channelMode} onValueChange={(value) => handleInputChange('channelMode', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Close">Close</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Channel Bill Descriptor</label>
                    <Input 
                      value={formData.channelBillDescriptor}
                      onChange={(e) => handleInputChange('channelBillDescriptor', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Amount</label>
                    <Input 
                      value={formData.minimumAmount}
                      onChange={(e) => handleInputChange('minimumAmount', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Maximum Amount</label>
                    <Input 
                      value={formData.maximumAmount}
                      onChange={(e) => handleInputChange('maximumAmount', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Channel Currency</label>
                    <Input 
                      value={formData.channelCurrency}
                      onChange={(e) => handleInputChange('channelCurrency', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Settlement Days</label>
                    <Input 
                      value={formData.settlementDays}
                      onChange={(e) => handleInputChange('settlementDays', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.sameDaySettlement}
                      onCheckedChange={(checked) => handleInputChange('sameDaySettlement', checked)}
                    />
                    <label className="text-sm">Turn ON to active Same Day Settlement Service</label>
                  </div>
                </CardContent>
              </Card>

              {/* Provider Card */}
              <Card id="provider">
                <CardHeader>
                  <CardTitle>Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium mb-2">Provider 01</label>
                    <Select value={formData.provider} onValueChange={(value) => handleInputChange('provider', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PIRO_01 - NMID11110000022">PIRO_01 - NMID11110000022</SelectItem>
                        <SelectItem value="PIRO_02 - NMID11110000023">PIRO_02 - NMID11110000023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* MDR Card */}
              <Card id="mdr">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>MDR (Merchant Discount Rate)</CardTitle>
                    <p className="text-sm text-gray-500">Recommended fee rate 1.5%-1.9% (exclude VAT)</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Percentage Price</label>
                    <Input 
                      value={formData.feeRatePercentage}
                      onChange={(e) => handleInputChange('feeRatePercentage', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Price</label>
                    <Input 
                      value={formData.feeRateFixed}
                      onChange={(e) => handleInputChange('feeRateFixed', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Option Card */}
              <Card id="payment-option">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Payment Option</CardTitle>
                    <p className="text-sm text-gray-500">At least 1 option is selected</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.openAmount}
                        onCheckedChange={(checked) => handleInputChange('openAmount', checked)}
                      />
                      <label className="text-sm">Open Amount</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.fixedAmount}
                        onCheckedChange={(checked) => handleInputChange('fixedAmount', checked)}
                      />
                      <label className="text-sm">Fixed Amount</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.recurring}
                        onCheckedChange={(checked) => handleInputChange('recurring', checked)}
                      />
                      <label className="text-sm">Recurring</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Referral Card */}
              <Card id="sales-referral">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sales Referral (Optional)</CardTitle>
                    <p className="text-sm text-gray-500">Setup referral fee for sales</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sales ID</label>
                    <Input 
                      value={formData.salesId}
                      onChange={(e) => handleInputChange('salesId', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Percentage Price</label>
                    <Input 
                      value={formData.salesFeePercentage}
                      onChange={(e) => handleInputChange('salesFeePercentage', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Price</label>
                    <Input 
                      value={formData.salesFeeFixed}
                      onChange={(e) => handleInputChange('salesFeeFixed', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.applySalesToAll}
                      onCheckedChange={(checked) => handleInputChange('applySalesToAll', checked)}
                    />
                    <label className="text-sm">Apply this sales referral configuration to all channels under the e-wallet payment method</label>
                  </div>
                </CardContent>
              </Card>

              {/* Merchant Referral Card */}
              <Card id="merchant-referral">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Merchant Referral (Optional)</CardTitle>
                    <p className="text-sm text-gray-500">Setup referral fee for merchant</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Merchant ID</label>
                    <Input 
                      value={formData.merchantId}
                      onChange={(e) => handleInputChange('merchantId', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Percentage Price</label>
                    <Input 
                      value={formData.merchantFeePercentage}
                      onChange={(e) => handleInputChange('merchantFeePercentage', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Price</label>
                    <Input 
                      value={formData.merchantFeeFixed}
                      onChange={(e) => handleInputChange('merchantFeeFixed', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.applyMerchantToAll}
                      onCheckedChange={(checked) => handleInputChange('applyMerchantToAll', checked)}
                    />
                    <label className="text-sm">Apply this merchant referral configuration to all channels under the e-wallet payment method</label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 border-t flex-shrink-0">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              Back
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset}>
                Reset to Default
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Upload, Eye, SquareMousePointer, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, InputWrapper } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageInput, ImageInputFile } from '@/components/image-input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getOthersSchema, type OthersSchemaType } from '../../../core/schemas';

export function OthersForm() {
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<OthersSchemaType>({
    resolver: zodResolver(getOthersSchema()),
    defaultValues: {
      brandColors: {
        primary: '#1B84FF',
        secondary: '#9F9F9F',
        accent: '#1B84FF',
        background: '#FFFFFF'
      },
      salesReferralId: '',
      salesReferralFee: '',
      merchantReferralClientId: '',
      merchantReferralFee: '',
      additionalNotes: '',
      companyLogo: []
    }
  });

  const onSubmit = (data: OthersSchemaType) => {
    // TODO: Implement form submission
  };

  const handleLogoUpload = (images: ImageInputFile[]) => {
    form.setValue('companyLogo', images);
  };

  const resetToDefault = () => {
    form.setValue('brandColors', {
      primary: '#1B84FF',
      secondary: '#9F9F9F',
      accent: '#1B84FF',
      background: '#FFFFFF'
    });
  };

  return (
    <>
      <style>
        {`
          .branding-bg {
            background-image: url('/media/images/2600x1200/bg-5.png');
          }
          .dark .branding-bg {
            background-image: url('/media/images/2600x1200/bg-5-dark.png');
          }
        `}
      </style>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Branding Section */}
        <Card id='branding'>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-10">
            {/* Company Logo */}
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="flex flex-col flex-1 min-w-0">
                <div className="text-mono text-sm font-medium mb-1">Company Logo</div>
                <span className="text-secondary-foreground text-sm">
                  Add company logo to personalize merchant profile and make it recognizable.
                </span>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-5 lg:gap-7.5 max-w-96 w-full flex-shrink-0 mb-5">
                <ImageInput
                  value={form.watch('companyLogo') || []}
                  onChange={handleLogoUpload}
                  acceptType={['jpg', 'jpeg', 'png', 'svg']}
                  multiple={false}
                  maxNumber={1}
                >
                  {({ onImageUpload, isDragging, dragProps, fileList }) => (
                    <>
                      {fileList.length > 0 ? (
                        // Uploaded state - show logo with change option
                        <div className="flex flex-col items-center w-full space-y-4">
                          <div className="w-32 h-32 flex items-center justify-center">
                            <img 
                              src={fileList[0].dataURL} 
                              alt="Company Logo" 
                              className="max-w-full max-h-full object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={onImageUpload}
                              className="text-sm px-3 py-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                            >
                              Change Logo
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                form.setValue('companyLogo', []);
                                handleLogoUpload([]);
                              }}
                              className="text-sm px-3 py-2 border-red-500 text-red-500 hover:bg-red-50"
                            >
                              Clear
                            </Button>
                            <span className="text-xs text-gray-500">
                              SVG, PNG, JPG (max. 800×400)
                            </span>
                          </div>
                        </div>
                      ) : (
                        // Empty state - show upload area
                        <div 
                          className={`flex bg-center w-full p-5 lg:p-7 bg-no-repeat bg-[length:550px] border border-input rounded-xl border-dashed branding-bg cursor-pointer transition-colors ${
                            isDragging ? 'border-orange-500' : ''
                          }`}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <div className="flex flex-col place-items-center place-content-center text-center rounded-xl w-full">
                            <div className="flex items-center mb-2.5">
                              <div className="relative size-11 shrink-0">
                                <svg
                                  className="w-full h-full stroke-orange-200 fill-white dark:stroke-orange-950 dark:fill-orange-950/30"
                                  width="44"
                                  height="48"
                                  viewBox="0 0 44 48"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                                    18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                                    39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                                    fill=""
                                  />
                                  <path
                                    d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                                    18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                                    39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                                    stroke=""
                                    strokeOpacity="0.2"
                                  />
                                </svg>
                                <div className="absolute leading-none left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                                  <ImageIcon className="text-xl ps-px text-orange-400" />
                                </div>
                              </div>
                            </div>
                            <div className="text-mono text-xs font-medium hover:text-primary-active mb-px">
                              Click or Drag & Drop
                            </div>
                            <span className="text-xs text-secondary-foreground text-nowrap">
                              SVG, PNG, JPG (max. 800×400)
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </ImageInput>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <h3 className="text-sm font-medium mb-1">Brand Colors</h3>
                  <p className="text-xs text-gray-500 pr-20">Set your brand's signature palette. These colors will be used across your merchant dashboard and materials (editable after merchant is created).</p>
                </div>
                <Button 
                  type="button"
                  className="flex items-center gap-2 text-blue-500 bg-white border border-blue-500 hover:bg-blue-50" 
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Preview</span>
                </Button>
              </div>

              <div className="space-y-5 pl-10 ml-10 border-l border-gray-200">
                {/* Primary Color */}
                <FormField
                  control={form.control}
                  name="brandColors.primary"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-medium">Primary Color</FormLabel>
                          <p className="text-xs text-gray-500">Main color that represents your brand</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Input
                            id="primary-color"
                            type="color"
                            {...field}
                            className="sr-only"
                          />
                          <InputWrapper className="w-100 h-10">
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 -me-2"
                              onClick={() => document.getElementById('primary-color')?.click()}
                            >
                               <SquareMousePointer 
                                 size={16} 
                                 fill={field.value}
                                 stroke={field.value}
                                 strokeWidth={1}
                                 style={{ opacity: 1 }}
                                 className="transition-colors duration-200"
                               />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                className="font-mono text-sm uppercase text-gray-600 border-0 shadow-none focus-visible:ring-0"
                                placeholder="#1B84FF"
                              />
                            </FormControl>
                          </InputWrapper>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Secondary Color */}
                <FormField
                  control={form.control}
                  name="brandColors.secondary"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-medium">Secondary Color</FormLabel>
                          <p className="text-xs text-gray-500">Supporting color for balance and variety</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Input
                            id="secondary-color"
                            type="color"
                            {...field}
                            className="sr-only"
                          />
                          <InputWrapper className="w-100 h-10">
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 -me-2"
                              onClick={() => document.getElementById('secondary-color')?.click()}
                            >
                               <SquareMousePointer 
                                 size={16} 
                                 fill={field.value}
                                 stroke="white"
                                 strokeWidth={1}
                                 style={{ opacity: 1 }}
                                 className="transition-colors duration-200"
                               />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                className="font-mono text-sm uppercase text-gray-600 border-0 shadow-none focus-visible:ring-0"
                                placeholder="#9F9F9F"
                              />
                            </FormControl>
                          </InputWrapper>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Accent Color */}
                <FormField
                  control={form.control}
                  name="brandColors.accent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-medium">Accent Color</FormLabel>
                          <p className="text-xs text-gray-500">Highlight color for emphasis</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Input
                            id="accent-color"
                            type="color"
                            {...field}
                            className="sr-only"
                          />
                          <InputWrapper className="w-100 h-10">
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 -me-2"
                              onClick={() => document.getElementById('accent-color')?.click()}
                            >
                               <SquareMousePointer 
                                 size={16} 
                                 fill={field.value}
                                 stroke="white"
                                 strokeWidth={1}
                                 style={{ opacity: 1 }}
                                 className="transition-colors duration-200"
                               />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                className="font-mono text-sm uppercase text-gray-600 border-0 shadow-none focus-visible:ring-0"
                                placeholder="#1B84FF"
                              />
                            </FormControl>
                          </InputWrapper>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Background Color */}
                <FormField
                  control={form.control}
                  name="brandColors.background"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-medium">Background Color</FormLabel>
                          <p className="text-xs text-gray-500">Base color for layouts and surfaces</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Input
                            id="background-color"
                            type="color"
                            {...field}
                            className="sr-only"
                          />
                          <InputWrapper className="w-100 h-10">
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 -me-2"
                              onClick={() => document.getElementById('background-color')?.click()}
                            >
                               <SquareMousePointer 
                                 size={16} 
                                 fill={field.value}
                                 stroke="white"
                                 strokeWidth={1}
                                 style={{ opacity: 1 }}
                                 className="transition-colors duration-200"
                               />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                className="font-mono text-sm uppercase text-gray-600 border-0 shadow-none focus-visible:ring-0"
                                placeholder="#FFFFFF"
                              />
                            </FormControl>
                          </InputWrapper>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Section */}
        <Card className="bg-white rounded-lg border border-gray-200" id='referral'>
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-1">Referral (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sales Team Referral */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold">1. Sales Team Referral (Optional)</h3>
              
              <div className="space-y-4 border-gray-200">
                <FormField
                  control={form.control}
                  name="salesReferralId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-normal">Sales Referral ID</FormLabel>
                        </div>
                        <div className="w-130">
                          <FormControl>
                            <Input
                              placeholder="Input sales referral ID"
                              className="text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salesReferralFee"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-normal">Sales Team Referral Fee <br></br> (fixed price)</FormLabel>
                        </div>
                        <div className="w-130">
                          <FormControl>
                            <Input
                              placeholder="IDR 0"
                              className="text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Merchant Referral */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-bold">2. Merchant Referral (Optional)</h3>
              
              <div className="space-y-4 border-gray-200">
                <FormField
                  control={form.control}
                  name="merchantReferralClientId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-normal">Referral Client ID</FormLabel>
                        </div>
                        <div className="w-130">
                          <FormControl>
                            <Input
                              placeholder="Input Client ID"
                              className="text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="merchantReferralFee"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <FormLabel className="text-sm font-normal">Merchant Referral Fee <br></br>(percentage price)</FormLabel>
                        </div>
                        <div className="w-130">
                          <FormControl>
                            <Input
                              placeholder="0%"
                              className="text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes Section */}
        <Card className="bg-white rounded-lg border border-gray-200" id='additional-notes'>
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-1">Additional Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes"
                      rows={4}
                      className="resize-none text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Brand Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Brand Preview</DialogTitle>
            </DialogHeader>
            
            <DialogBody>
              <div 
                className="space-y-6 p-4 rounded-lg"
                style={{ backgroundColor: form.watch('brandColors.background') }}
              >
                {/* Top Logo */}
                <div className="flex justify-start">
                  {form.watch('companyLogo') && form.watch('companyLogo')!.length > 0 ? (
                    <img 
                      src={form.watch('companyLogo')![0].dataURL} 
                      alt="Company Logo Preview" 
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: form.watch('brandColors.primary') }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                        <circle cx="12" cy="12" r="10" fill="currentColor"/>
                        <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Center Section with Illustration */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src="/media/illustrations/29.svg" 
                      alt="Person Illustration"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold" style={{ color: form.watch('brandColors.primary') }}>
                    This Is Brand Preview
                  </h3>
                  <p className="text-sm" style={{ color: form.watch('brandColors.secondary') }}>
                    You can see all applied brand logo and colors you've set up
                  </p>
                </div>

                {/* Color Buttons */}
                <div className="flex justify-center gap-3 flex-wrap">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="text-sm px-4 py-2 border-2"
                    style={{ 
                      color: form.watch('brandColors.secondary'),
                      borderColor: form.watch('brandColors.secondary'),
                      backgroundColor: 'transparent'
                    }}
                  >
                    Secondary
                  </Button>
                  <Button 
                    type="button"
                    className="text-sm px-4 py-2 text-white border-0"
                    style={{ backgroundColor: form.watch('brandColors.primary') }}
                  >
                    Primary
                  </Button>
                  <Button 
                    type="button"
                    className="text-sm px-4 py-2 text-white border-0"
                    style={{ backgroundColor: form.watch('brandColors.accent') }}
                  >
                    Accent
                  </Button>
                </div>
              </div>
            </DialogBody>

            <DialogFooter className="pt-4 border-t mt-6">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowPreview(false)}
                className="w-30 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </form>
      </Form>
    </>
  );
}
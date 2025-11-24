'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeenIcon } from '@/components/keenicons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getPicInfoSchema, type PicInfoSchemaType } from '../../../core/schemas';
import { PublicFlag } from '@/components/ui/public-flag';
import { cn } from '@/lib/utils';


export function PicInfoForm() {
  const form = useForm<PicInfoSchemaType>({
    resolver: zodResolver(getPicInfoSchema()),
    defaultValues: {
      owner: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      business: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      finance: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      },
      technical: {
        fullName: '',
        position: '',
        phoneNumber: '',
        email: ''
      }
    }
  });

  const rootError = (form.formState.errors as typeof form.formState.errors & {
    root?: { message?: string };
  }).root;

  const globalErrorMessage = rootError?.message;

  const onSubmit = (data: PicInfoSchemaType) => {
    // TODO: Implement form submission
  };

  const renderPicSection = (title: string, sectionKey: keyof PicInfoSchemaType) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* PIC Full Name */}
        <FormField
          control={form.control}
          name={`${sectionKey}.fullName` as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-48 text-left text-sm font-normal">
                  PIC Full Name
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="PIC full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* PIC Position */}
        <FormField
          control={form.control}
          name={`${sectionKey}.position` as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-48 text-left text-sm font-normal">
                  PIC Position
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="PIC position" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* PIC Phone Number */}
        <FormField
          control={form.control}
          name={`${sectionKey}.phoneNumber` as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-48 text-left text-sm font-normal">
                  PIC Phone Number
                </FormLabel>
                <div className="flex gap-2 flex-1">
                  <Select defaultValue="+62">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+62">
                        <div className="flex items-center gap-2">
                          <PublicFlag countryCode="+62" size={12} />
                          <span>+62</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="+1">
                        <div className="flex items-center gap-2">
                          <PublicFlag countryCode="+1" size={12} />
                          <span>+1</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="+44">
                        <div className="flex items-center gap-2">
                          <PublicFlag countryCode="+44" size={12} />
                          <span>+44</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="+65">
                        <div className="flex items-center gap-2">
                          <PublicFlag countryCode="+65" size={12} />
                          <span>+65</span>
                        </div>
                      </SelectItem>

                    </SelectContent>
                  </Select>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 81234567890" 
                      type="tel"
                      {...field}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* PIC Email */}
        <FormField
          control={form.control}
          name={`${sectionKey}.email` as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-48 text-left text-sm font-normal">
                  PIC Email
                </FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input type="email" placeholder="email@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Header Instructions */}
        <Card
          className={cn(
            'transition-colors',
            globalErrorMessage && 'border-destructive/40 bg-destructive/5'
          )}
        >
          <CardHeader className="flex items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">PIC</CardTitle>
            {globalErrorMessage && (
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-destructive/30 bg-white text-destructive">
                <KeenIcon icon="danger" className="h-4 w-4" />
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-1">
            <p
              className={cn(
                'text-sm',
                globalErrorMessage ? 'text-destructive font-medium' : 'text-gray-600'
              )}
            >
              {globalErrorMessage ?? 'Add at least one PIC in the section below.'}
            </p>
            <p
              className={cn(
                'text-xs',
                globalErrorMessage ? 'text-destructive/70' : 'text-gray-500'
              )}
            >
              You can update or add more PICs later
            </p>
          </CardContent>
        </Card>

        {/* PIC Sections */}
        <div id="personal-info" className="scroll-mt-24">
          {renderPicSection('PIC of Owner', 'owner')}
        </div>
        
        <div id="business-info" className="scroll-mt-24">
          {renderPicSection('PIC of Business', 'business')}
        </div>

        <div id="finance-info" className="scroll-mt-24">
          {renderPicSection('PIC of Finance', 'finance')}
        </div>

        <div id="technical-info" className="scroll-mt-24">
          {renderPicSection('PIC of Technical Engineering', 'technical')}
        </div>
      </form>
    </Form>
  );
}
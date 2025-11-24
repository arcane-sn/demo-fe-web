'use client';

import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PublicFlag } from '@/components/ui/public-flag';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export type FieldType = 'text' | 'email' | 'select' | 'switch' | 'phone' | 'password' | 'number' | 'url';

export interface SelectOption {
  value: string;
  label: string;
  flag?: string;
  disabled?: boolean;
}

export interface FormFieldWrapperProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string;
  phoneCode?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function FormFieldWrapper<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  options = [],
  defaultValue,
  phoneCode,
  disabled = false,
  required = false,
  description,
  className = '',
  labelClassName = 'w-48 text-left text-sm font-normal',
  inputClassName = ''
}: FormFieldWrapperProps<T>) {
  const renderInput = (field: any) => {
    switch (type) {
      case 'phone':
        return (
          <div className="flex gap-2 flex-1">
            <Select defaultValue={phoneCode || "+62"}>
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
                placeholder={placeholder} 
                disabled={disabled}
                className={inputClassName}
                {...field} 
              />
            </FormControl>
          </div>
        );
      
      case 'select':
        return (
          <div className="flex-1">
            <Select onValueChange={field.onChange} defaultValue={field.value || defaultValue}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.flag ? (
                      <div className="flex items-center gap-2">
                        <PublicFlag countryCode={option.flag} size={14} />
                        <span>{option.label}</span>
                      </div>
                    ) : (
                      option.label
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        );
      
      case 'switch':
        return (
          <div className="flex-1">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </div>
        );
      
      default:
        return (
          <div className="flex-1">
            <FormControl>
              <Input 
                type={type} 
                placeholder={placeholder} 
                disabled={disabled}
                className={inputClassName}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </div>
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-4">
            <FormLabel className={labelClassName}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            {renderInput(field)}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </FormItem>
      )}
    />
  );
}


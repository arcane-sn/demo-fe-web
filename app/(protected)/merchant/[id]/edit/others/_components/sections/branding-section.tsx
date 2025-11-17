'use client';

import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LogoUpload, ColorPicker } from '../shared';
import { COLOR_PICKER_CONFIG } from '../../_lib/constants';
import type { UseFormReturn } from 'react-hook-form';
import type { OthersSchemaType } from '../../../../../core/schemas';
import type { ImageInputFile } from '@/components/image-input';

interface BrandingSectionProps {
  form: UseFormReturn<OthersSchemaType>;
  onShowPreview: () => void;
  onLogoUpload: (images: ImageInputFile[]) => void;
  onLogoClear: () => void;
}

export function BrandingSection({ 
  form, 
  onShowPreview, 
  onLogoUpload, 
  onLogoClear 
}: BrandingSectionProps) {
  return (
    <div id="additional-settings" className="scroll-mt-24">
      <Card>
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
            
            <LogoUpload
              value={form.watch('companyLogo') || []}
              onChange={onLogoUpload}
              onClear={onLogoClear}
            />
          </div>

          {/* Brand Colors */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-start justify-between mb-10">
              <div>
                <h3 className="text-sm font-medium mb-1">Brand Colors</h3>
                <p className="text-xs text-gray-500 pr-20">
                  Set your brand's signature palette. These colors will be used across your merchant dashboard and materials (editable after merchant is created).
                </p>
              </div>
              <Button 
                type="button"
                className="flex items-center gap-2 text-blue-500 bg-white border border-blue-500 hover:bg-blue-50" 
                onClick={onShowPreview}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">Preview</span>
              </Button>
            </div>

            <div className="space-y-5 pl-10 ml-10 border-l border-gray-200">
              {COLOR_PICKER_CONFIG.map((config) => (
                <FormField
                  key={config.key}
                  control={form.control}
                  name={`brandColors.${config.key}`}
                  render={({ field }) => (
                    <FormItem>
                      <ColorPicker
                        label={config.label}
                        description={config.description}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={config.placeholder}
                        colorId={`${config.key}-color`}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

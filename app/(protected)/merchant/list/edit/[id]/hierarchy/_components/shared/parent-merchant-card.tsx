'use client';

import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { HierarchySchemaType } from '../../../../../../core/schemas';
import type { ParentMerchant } from '../../_lib/types';

interface ParentMerchantCardProps {
  form: UseFormReturn<HierarchySchemaType>;
  availableParents: ParentMerchant[];
  onShowAvailableParents: () => void;
}

export function ParentMerchantCard({ form, availableParents, onShowAvailableParents }: ParentMerchantCardProps) {
  return (
    <Card className="max-w-4xl mx-auto" id="manage-parent-merchant">
      <CardHeader>
        <CardTitle className="">
          Manage Parent Merchant
        </CardTitle>
        <CardDescription>
          (Merchant as a Child Merchant)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Have a Parent Merchant Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <FormLabel className="text-sm font-medium">Have a Parent Merchant</FormLabel>
              <p className="text-sm text-muted-foreground mt-1">
                Toggle ON if this merchant have a Parent Merchant and want to set as a Sub-Merchant
              </p>
            </div>
            <FormField
              control={form.control}
              name="hasParentMerchant"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        // Reset selectedParent when toggle is turned off
                        if (!checked) {
                          form.setValue('selectedParent', '');
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Merchant Type Display */}
        <div 
          className={`flex items-center justify-between p-8 border rounded-lg bg-no-repeat bg-right bg-cover rtl:bg-left ${
            form.watch('hasParentMerchant') && form.watch('selectedParent') 
              ? 'bg-white' 
              : 'bg-white'
          }`}
          style={{ 
            backgroundImage: form.watch('hasParentMerchant') && form.watch('selectedParent')
              ? "url('/media/images/2600x1200/bg-5.png')"
              : "url('/media/images/2600x1200/bg-5.png')",
            backgroundSize: '650px',
            backgroundPosition: 'right center'
          }}
        >
          <div className="flex items-center gap-3">
            <HexagonBadge
              size="size-[50px]"
              stroke={
              form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? 'stroke-blue-600'
                  : 'stroke-gray-300'
              }
              fill="fill-transparent"
              badge={
                <KeenIcon
                  icon="shop"
                  style="outline"
                  className={`text-lg ${
                form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? 'text-blue-600'
                  : 'text-gray-600'
                  }`}
                />
              }
            />
            <div>
              <h3 className={`font-medium ${
                form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? 'text--900'
                  : 'text-gray-900'
              }`}>
                {form.watch('hasParentMerchant') ? 'Sub-Merchant' : 'Top-Level Merchant'}
              </h3>
              <p className={`text-sm ${
                form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? 'text--700'
                  : 'text-muted-foreground'
              }`}>
                {form.watch('hasParentMerchant') && form.watch('selectedParent')
                  ? (() => {
                      const selectedParentId = form.watch('selectedParent');
                      const parent = availableParents.find((p: ParentMerchant) => p.clientId === selectedParentId);
                      return `Parent: ${parent?.companyName || 'Unknown'}`;
                    })()
                  : form.watch('hasParentMerchant') 
                    ? 'Has a parent merchant above' 
                    : 'Doesn\'t have a parent merchant above'
                }
              </p>
            </div>
          </div>
          
          {/* Show buttons based on state */}
          {form.watch('hasParentMerchant') && !form.watch('selectedParent') && (
            <Button 
              type="button"
              variant="primary"
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={onShowAvailableParents}
            >
              Select Parent Merchant
            </Button>
          )}
          
          {form.watch('hasParentMerchant') && form.watch('selectedParent') && (
            <Button 
              type="button"
              variant="primary"
              className="bg-blue-100 hover:bg-blue-700 text-blue-600 border border-blue-500"
              onClick={onShowAvailableParents}
            >
              Change Parent
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

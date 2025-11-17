'use client';

import { Store } from 'lucide-react';
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
import type { HierarchySchemaType } from '../../../../../core/schemas';
import type { ParentMerchant } from '../../_lib/types';

interface SubMerchantCardProps {
  form: UseFormReturn<HierarchySchemaType>;
  availableSubMerchants: ParentMerchant[];
  onShowAvailableSubMerchants: () => void;
  onRemoveSubMerchant: (subMerchantId: string) => void;
}

export function SubMerchantCard({ 
  form, 
  availableSubMerchants, 
  onShowAvailableSubMerchants, 
  onRemoveSubMerchant 
}: SubMerchantCardProps) {
  return (
    <Card className="max-w-4xl mx-auto" id="manage-sub-merchant">
      <CardHeader>
        <CardTitle>
          Manage Sub-Merchant
        </CardTitle>
        <CardDescription>
          (Merchant as a Parent Merchant)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Have Sub-Merchants Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <FormLabel className="text-sm font-medium">Have Sub-Merchants</FormLabel>
              <p className="text-sm text-muted-foreground mt-1">
                Toggle ON if this merchant can have Sub-Merchants below
              </p>
            </div>
            <FormField
              control={form.control}
              name="hasSubMerchants"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        // Reset selectedSubMerchants when toggle is turned off
                        if (!checked) {
                          form.setValue('selectedSubMerchants', []);
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

        {/* Sub-Merchant Status Display */}
        <div 
          className={`flex items-center justify-between p-8 border rounded-lg bg-no-repeat bg-right bg-cover rtl:bg-left ${
            form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
              ? 'bg-white' 
              : 'bg-white'
          }`}
          style={{ 
            backgroundImage: form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
              ? "url('/media/images/2600x1200/bg-5.png')"
              : "url('/media/images/2600x1200/bg-5.png')",
            backgroundSize: '650px',
            backgroundPosition: 'right center'
          }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
                ? 'bg-gray-100 border border-blue-500'
                : 'bg-gray-100'
            }`}>
              <Store className={`w-5 h-5 ${
                form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-medium ${
                form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
                  ? 'text-gray-900'
                  : 'text-gray-900'
              }`}>
                {form.watch('hasSubMerchants') ? 'Parent Merchant' : 'Lowest-Level Merchant'}
              </h3>
              <p className={`text-sm ${
                form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
                  ? 'text-gray-700'
                  : 'text-muted-foreground'
              }`}>
                {form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0
                  ? `Sub-Merchants: ${(form.watch('selectedSubMerchants') || []).length} selected`
                  : form.watch('hasSubMerchants') 
                    ? 'Can have sub-merchants below' 
                    : 'Cannot have sub-merchants'
                }
              </p>
            </div>
          </div>
          
          {/* Show buttons based on state */}
          {form.watch('hasSubMerchants') && (!form.watch('selectedSubMerchants') || (form.watch('selectedSubMerchants') || []).length === 0) && (
            <Button 
              type="button"
              variant="primary"
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={onShowAvailableSubMerchants}
            >
              Select Sub-Merchants
            </Button>
          )}
          
          {form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0 && (
            <Button 
              type="button"
              variant="primary"
              className="bg-blue-100 hover:bg-blue-700 text-blue-600 border border-blue-500"
              onClick={onShowAvailableSubMerchants}
            >
              Manage Sub-Merchants
            </Button>
          )}
        </div>

        {/* Selected Sub-Merchants List */}
        {form.watch('hasSubMerchants') && (form.watch('selectedSubMerchants') || []).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Selected Sub-Merchants:</h4>
            <div className="space-y-2">
              {(form.watch('selectedSubMerchants') || []).map((subMerchantId) => {
                const subMerchant = availableSubMerchants.find(sm => sm.clientId === subMerchantId);
                return subMerchant ? (
                  <div key={subMerchantId} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                        <Store className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{subMerchant.companyName}</p>
                        <p className="text-xs text-gray-500">{subMerchant.clientId}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onRemoveSubMerchant(subMerchantId)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

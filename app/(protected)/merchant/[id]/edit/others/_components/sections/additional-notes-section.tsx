'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { OthersSchemaType } from '../../../../../core/schemas';

interface AdditionalNotesSectionProps {
  form: UseFormReturn<OthersSchemaType>;
}

export function AdditionalNotesSection({ form }: AdditionalNotesSectionProps) {
  return (
    <div id="notifications" className="scroll-mt-24">
      <Card className="bg-white rounded-lg border border-gray-200">
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
    </div>
  );
}

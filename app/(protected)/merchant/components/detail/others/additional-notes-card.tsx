'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface AdditionalNotesCardProps {
  data: {
    notes: string;
  };
  onEdit?: () => void;
}

export function AdditionalNotesCard({ data, onEdit }: AdditionalNotesCardProps) {
  return (
    <Card id="additional-notes">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Additional Notes</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onEdit}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <div className="min-h-[120px] p-3 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {data.notes || 'Lorem ipsum dolor sit amet consectetur. Cursus gravida sed dignissim cursus turpis ut. Lectus facilisis volutpat venenatis odio fusce adipiscing justo pharetra. Commodo vitae commodo sit amet commodo pellentesque molestie egestas volutpat. Id non convallis pharetra in orci elit pharetra pretium.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

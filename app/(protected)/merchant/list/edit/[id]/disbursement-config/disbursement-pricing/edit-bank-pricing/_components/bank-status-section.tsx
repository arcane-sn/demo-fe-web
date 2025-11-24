'use client';

import { KeenIcon } from '@/components/keenicons';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { BankData } from '../../_lib/types';

interface BankStatusSectionProps {
  bankData?: BankData | null;
  editMode: 'single' | 'selected' | 'all';
  selectedBanksCount?: number;
}

export function BankStatusSection({ 
  bankData, 
  editMode, 
  selectedBanksCount = 0 
}: BankStatusSectionProps) {
  const isMultiEdit = editMode === 'selected' || editMode === 'all';
  const isAllBanksEdit = editMode === 'all';

  // Get display text based on edit mode
  const getDisplayText = () => {
    if (isAllBanksEdit) {
      return {
        title: 'All Banks',
        description: 'Turn off to make all banks to inactive'
      };
    } else if (editMode === 'selected') {
      return {
        title: `${selectedBanksCount} Selected Banks`,
        description: 'Turn off to make all selected banks to inactive'
      };
    } else {
      return {
        title: `${bankData?.bankName} / ${bankData?.bankCode}`,
        description: 'Turn off to make this bank to inactive'
      };
    }
  };

  const displayText = getDisplayText();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Bank Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HexagonBadge
                size="w-10 h-10"
                stroke="stroke-gray-300"
                fill="fill-gray-100"
                badge={<KeenIcon icon="shop" style="outline" className="w-5 h-5 text-gray-600" />}
              />
              <div>
                <div className="font-semibold text-gray-900">
                  {displayText.title}
                </div>
                <div className="text-sm text-gray-500">
                  {displayText.description}
                </div>
              </div>
            </div>

            <Switch 
              defaultChecked={true}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeenIcon } from '@/components/keenicons';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const disbursementServices: Service[] = [
  {
    id: '1',
    name: 'Payment Gateway',
    description: 'Direct API Integration',
    icon: 'two-credit-cart',
  },
  {
    id: '2',
    name: 'Disbursement Service',
    description: 'Direct API Integration',
    icon: 'rocket',
  },
  {
    id: '3',
    name: 'Disbursement Service',
    description: 'Non-Integration',
    icon: 'rocket',
  },
  {
    id: '4',
    name: 'Mandatory Account Inquiry',
    description: 'Disbursement',
    icon: 'bank',
  },
];

export function ServiceTypeContent() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Service Type</CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {disbursementServices.map((service) => {
          return (
            <div key={service.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <HexagonBadge
                stroke="stroke-gray-300 dark:stroke-gray-600"
                fill="fill-gray-100 dark:fill-gray-800"
                size="size-[40px]"
                badge={
                  <KeenIcon 
                    icon={service.icon} 
                    style="outline" 
                    className="text-lg text-gray-600 dark:text-gray-400" 
                  />
                }
              />
              <div className="flex-1">
                <h3 className=" text-base">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

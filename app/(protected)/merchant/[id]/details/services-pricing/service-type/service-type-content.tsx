'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Building2, CreditCard } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const disbursementServices: Service[] = [
  {
    id: '1',
    name: 'Disbursement Service',
    description: 'Direct API Integration',
    icon: Rocket,
  },
  {
    id: '2',
    name: 'Disbursement Service',
    description: 'Non-Integration',
    icon: Rocket,
  },
  {
    id: '3',
    name: 'Mandatory Account Inquiry',
    description: 'Disbursement',
    icon: Building2,
  },
  {
    id: '4',
    name: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: CreditCard,
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
          const IconComponent = service.icon;
          return (
            <div key={service.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-3 bg-muted rounded-lg">
                <IconComponent className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  checked, 
  onCheckedChange 
}: ServiceCardProps) {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HexagonBadge 
              size="size-4" 
              stroke="stroke-gray-400" 
              fill="fill-gray-100" 
              badge={<Icon className="h-4 w-4 text-gray-600" />} 
            />
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </CardContent>
    </Card>
  );
}

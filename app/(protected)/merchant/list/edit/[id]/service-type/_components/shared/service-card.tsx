'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { KeenIcon } from '@/components/keenicons';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string; // KeenIcon icon name
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  checked, 
  onCheckedChange 
}: ServiceCardProps) {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HexagonBadge 
              size="size-[50px]" 
              stroke="stroke-gray-300" 
              fill="fill-transparent" 
              badge={
                <KeenIcon 
                  icon={icon} 
                  style="outline" 
                  className="text-lg text-gray-600" 
                />
              } 
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

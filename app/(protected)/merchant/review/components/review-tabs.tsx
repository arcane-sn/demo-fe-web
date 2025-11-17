'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ReviewTab } from '../core';

interface ReviewTabsProps {
  tabs: ReviewTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ReviewTabs({ tabs, activeTab, onTabChange }: ReviewTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList variant="line" className="h-auto p-0 bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="relative px-4 py-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {tab.label}
            {tab.count !== undefined && (
              <Badge 
                variant="secondary" 
                size="sm" 
                className="ml-2"
              >
                {tab.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

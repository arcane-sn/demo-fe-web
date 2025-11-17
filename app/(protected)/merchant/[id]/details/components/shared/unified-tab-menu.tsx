'use client';

import { useRouter, usePathname } from 'next/navigation';
import { 
  Info,
  FileText,
  CreditCard,
  Building2,
  Shield,
  Activity,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
  dropdownOptions?: DropdownOption[];
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface UnifiedTabMenuProps {
  merchantId: string;
  tabs?: TabConfig[];
}

// Default tab configuration
export const defaultTabs: TabConfig[] = [
  { id: 'general-info', label: 'General Info', icon: Info },
  { id: 'support-docs', label: 'Support Docs', icon: FileText },
  { 
    id: 'services-pricing', 
    label: 'Services & Pricing', 
    icon: CreditCard, 
    hasDropdown: true,
    dropdownOptions: [
      { value: 'service-type', label: 'Service Type' },
      { value: 'payment-gateway', label: 'Payment Gateway Service' },
      { value: 'disbursement', label: 'Disbursement Service' },
    ]
  },
  { id: 'hierarchy', label: 'Hierarchy', icon: Building2 },
  { id: 'credentials', label: 'Credentials', icon: Shield },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'others', label: 'Others', icon: MoreHorizontal },
];

export function UnifiedTabMenu({ 
  merchantId,
  tabs = defaultTabs
}: UnifiedTabMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current tab from pathname
  const currentTab = pathname.split('/').pop() || 'general-info';
  
  const handleTabClick = (tabId: string) => {
    router.push(`/merchant/${merchantId}/details/${tabId}`);
  };
  
  const handleServiceTypeClick = (serviceType: string) => {
    router.push(`/merchant/${merchantId}/details/services-pricing/${serviceType}`);
  };

  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center gap-1 px-4 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || (tab.id === 'services-pricing' && currentTab.startsWith('services-pricing'));
          
          if (tab.hasDropdown && tab.dropdownOptions) {
            return (
              <DropdownMenu key={tab.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative h-12 px-4 rounded-none border-b-2 border-transparent hover:bg-muted/50 transition-colors whitespace-nowrap",
                      isActive && "border-primary text-primary bg-primary/5"
                    )}
                  >
                    <Icon className="size-4 mr-2" />
                    {tab.label}
                    <ChevronDown className="size-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {tab.dropdownOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleServiceTypeClick(option.value)}
                      className={cn(
                        currentTab === `services-pricing/${option.value}` && "bg-primary/10 text-primary"
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative h-12 px-4 rounded-none border-b-2 border-transparent hover:bg-muted/50 transition-colors whitespace-nowrap",
                isActive && "border-primary text-primary bg-primary/5"
              )}
            >
              <Icon className="size-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

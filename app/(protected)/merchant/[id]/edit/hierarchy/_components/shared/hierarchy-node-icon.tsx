'use client';

import { cn } from '@/lib/utils';
import { ICON_COLOR_MAP } from '../../_lib/constants';

interface HierarchyIcon {
  type: 'circle' | 'square' | 'triangle';
  color: string;
  letter?: string;
}

interface HierarchyNodeIconProps {
  icon?: HierarchyIcon;
}

export function HierarchyNodeIcon({ icon }: HierarchyNodeIconProps) {
  if (!icon) {
    return (
      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-medium">
        ?
      </div>
    );
  }

  const baseClasses = "w-6 h-6 flex items-center justify-center text-white text-xs font-medium";
  const colorClass = ICON_COLOR_MAP[icon.color] || "bg-gray-500";
  
  if (icon.type === 'circle') {
    return (
      <div className={cn(baseClasses, "rounded-full", colorClass)}>
        {icon.letter || '?'}
      </div>
    );
  }
  
  if (icon.type === 'square') {
    return (
      <div className={cn(baseClasses, "rounded", colorClass)}>
        {icon.letter || '?'}
      </div>
    );
  }
  
  if (icon.type === 'triangle') {
    return (
      <div className={cn(baseClasses, "rounded", colorClass)}>
        {icon.letter || '?'}
      </div>
    );
  }

  return null;
}

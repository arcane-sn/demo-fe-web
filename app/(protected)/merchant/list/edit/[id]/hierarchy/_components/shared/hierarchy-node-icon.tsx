'use client';

import { HexagonBadge } from '@/app/components/partials/common/hexagon-badge';
import { KeenIcon } from '@/components/keenicons';
import { ICON_COLOR_MAP } from '../../_lib/constants';

interface HierarchyIcon {
  type: 'circle' | 'square' | 'triangle';
  color: string;
  letter?: string;
}

interface HierarchyNodeIconProps {
  icon?: HierarchyIcon;
}

// Map icon types to KeenIcon names
const ICON_TYPE_MAP: Record<string, string> = {
  circle: 'user',
  square: 'shop',
  triangle: 'element-11',
};

// Map colors to stroke colors for HexagonBadge
const COLOR_STROKE_MAP: Record<string, string> = {
  blue: 'stroke-blue-600',
  orange: 'stroke-orange-600',
  red: 'stroke-red-600',
  purple: 'stroke-purple-600',
  green: 'stroke-green-600',
};

// Map colors to icon colors
const COLOR_ICON_MAP: Record<string, string> = {
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
};

export function HierarchyNodeIcon({ icon }: HierarchyNodeIconProps) {
  if (!icon) {
    return (
      <HexagonBadge
        size="size-[50px]"
        stroke="stroke-gray-300"
        fill="fill-transparent"
        badge={
          <KeenIcon
            icon="user"
            style="outline"
            className="text-lg text-gray-600"
          />
        }
      />
    );
  }

  const iconName = ICON_TYPE_MAP[icon.type] || 'user';
  const strokeColor = COLOR_STROKE_MAP[icon.color] || 'stroke-gray-300';
  const iconColor = COLOR_ICON_MAP[icon.color] || 'text-gray-600';

    return (
    <HexagonBadge
      size="size-[50px]"
      stroke={strokeColor}
      fill="fill-transparent"
      badge={
        <KeenIcon
          icon={iconName}
          style="outline"
          className={`text-lg ${iconColor}`}
        />
      }
    />
    );
}

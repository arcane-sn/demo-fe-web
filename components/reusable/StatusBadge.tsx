'use client';

import { Badge, BadgeDot } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusBadgeVariant = 
  | 'success' 
  | 'destructive' 
  | 'warning' 
  | 'info' 
  | 'primary' 
  | 'secondary';

export interface StatusBadgeProps {
  /**
   * The text content of the badge
   */
  children: React.ReactNode;
  
  /**
   * The color variant of the badge
   * @default 'primary'
   */
  variant?: StatusBadgeVariant;
  
  /**
   * The size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional className for the badge
   */
  className?: string;
  
  /**
   * Whether to show the dot indicator
   * @default true
   */
  showDot?: boolean;
}

const variantStyles: Record<StatusBadgeVariant, string> = {
  success: 'border-success text-success bg-success/10',
  destructive: 'border-destructive text-destructive bg-destructive/10',
  warning: 'border-warning text-warning bg-warning/10',
  info: 'border-info text-info bg-info/10',
  primary: 'border-primary text-primary bg-primary/10',
  secondary: 'border-secondary-foreground text-secondary-foreground bg-secondary/10',
};

/**
 * StatusBadge - A reusable badge component that combines Badge and BadgeDot
 * with outline variant and rounded-full shape, supporting multiple color variants.
 * 
 * @example
 * ```tsx
 * <StatusBadge variant="success">Active</StatusBadge>
 * <StatusBadge variant="destructive">Inactive</StatusBadge>
 * <StatusBadge variant="warning" size="lg">Pending</StatusBadge>
 * ```
 */
export function StatusBadge({
  children,
  variant = 'primary',
  size = 'md',
  className,
  showDot = true,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      size={size}
      shape="circle"
      className={cn(
        'gap-1 rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {showDot && <BadgeDot />}
      {children}
    </Badge>
  );
}


'use client';

import { Badge, BadgeDot } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'draft' | 'pending-review' | 'approved' | 'rejected';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    'draft': {
      label: 'Draft',
      variant: 'info' as const,
      appearance: 'light' as const,
      dotColor: 'bg-violet-500',
    },
    'pending-review': {
      label: 'Pending Review',
      variant: 'warning' as const,
      appearance: 'light' as const,
      dotColor: 'bg-yellow-500',
    },
    'approved': {
      label: 'Approved',
      variant: 'success' as const,
      appearance: 'light' as const,
      dotColor: 'bg-green-500',
    },
    'rejected': {
      label: 'Rejected',
      variant: 'destructive' as const,
      appearance: 'light' as const,
      dotColor: 'bg-red-500',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant}
      appearance={config.appearance}
      shape="circle"
      className={className}
    >
      <BadgeDot className={config.dotColor} />
      {config.label}
    </Badge>
  );
}

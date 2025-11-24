'use client';

import { StatusBadge as ReusableStatusBadge, StatusBadgeVariant } from '@/components/reusable/StatusBadge';

interface StatusBadgeProps {
  status: 'draft' | 'pending-review' | 'approved' | 'rejected';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig: Record<string, { label: string; variant: StatusBadgeVariant }> = {
    'draft': {
      label: 'Draft',
      variant: 'info',
    },
    'pending-review': {
      label: 'Pending Review',
      variant: 'warning',
    },
    'approved': {
      label: 'Approved',
      variant: 'success',
    },
    'rejected': {
      label: 'Rejected',
      variant: 'destructive',
    },
  };

  const config = statusConfig[status];

  return (
    <ReusableStatusBadge 
      variant={config.variant}
      className={className}
    >
      {config.label}
    </ReusableStatusBadge>
  );
}

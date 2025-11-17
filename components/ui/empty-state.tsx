import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  // Illustration/Icon
  illustration?: React.ReactNode;
  icon?: React.ReactNode;
  
  // Content
  title: string;
  description?: string;
  
  // Action
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  
  // Styling
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Default illustration component
const DefaultIllustration = () => (
  <div className="w-32 h-32 mx-auto mb-6">
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-muted-foreground"
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid)" />
      
      {/* Person illustration */}
      <g transform="translate(100, 100)">
        {/* Head */}
        <circle cx="0" cy="-20" r="15" fill="currentColor" opacity="0.1" />
        
        {/* Body */}
        <rect x="-20" y="-5" width="40" height="50" rx="8" fill="currentColor" opacity="0.1" />
        
        {/* Puzzle piece heart */}
        <g transform="translate(0, 10)">
          <path
            d="M-8,-5 L-5,-8 L0,-3 L5,-8 L8,-5 L8,0 L5,3 L0,8 L-5,3 L-8,0 Z"
            fill="#3B82F6"
            opacity="0.8"
          />
          <path
            d="M-5,-5 L-3,-7 L0,-2 L3,-7 L5,-5 L5,0 L3,2 L0,5 L-3,2 L-5,0 Z"
            fill="#FCD34D"
            opacity="0.9"
          />
        </g>
      </g>
    </svg>
  </div>
);

export function EmptyState({
  illustration,
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'primary',
  className,
  size = 'md',
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const descriptionSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Card className={cn('border-0 shadow-none', className)}>
      <CardContent className={cn('flex flex-col items-center justify-center text-center', sizeClasses[size])}>
        {/* Illustration or Icon */}
        {illustration ? (
          <div className="mb-6">
            {illustration}
          </div>
        ) : icon ? (
          <div className="mb-4 text-muted-foreground">
            {icon}
          </div>
        ) : (
          <DefaultIllustration />
        )}

        {/* Title */}
        <h3 className={cn('font-semibold text-foreground mb-2', titleSizeClasses[size])}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={cn('text-muted-foreground mb-6 max-w-md', descriptionSizeClasses[size])}>
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant={actionVariant}
            className="gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Predefined empty states for common use cases
export const EmptyStates = {
  // Data tables
  NoData: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="No Data Available"
      description="There are no records to display at the moment."
      {...props}
    />
  ),

  // Merchants
  NoMerchants: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="No Merchants Yet"
      description="Looks like you don't have any merchants. Add one now to begin managing your business transactions."
      actionLabel="Create New Merchant"
      {...props}
    />
  ),

  // Users
  NoUsers: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="No Users Found"
      description="No users match your current search criteria. Try adjusting your filters or add a new user."
      actionLabel="Add New User"
      {...props}
    />
  ),

  // Transactions
  NoTransactions: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="No Transactions"
      description="No transactions have been recorded yet. Start by processing your first transaction."
      actionLabel="Create Transaction"
      {...props}
    />
  ),

  // Search results
  NoSearchResults: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="No Results Found"
      description="We couldn't find anything matching your search. Try different keywords or adjust your filters."
      actionLabel="Clear Filters"
      actionVariant="outline"
      {...props}
    />
  ),

  // Error state
  Error: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      title="Something went wrong"
      description="We encountered an error while loading your data. Please try again or contact support if the problem persists."
      actionLabel="Try Again"
      actionVariant="outline"
      {...props}
    />
  ),
};

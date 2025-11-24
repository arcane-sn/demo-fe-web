'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const rangeInputVariants = cva(
  `
    flex items-center w-full
  `,
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputFieldVariants = cva(
  `
    relative flex-1
  `,
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputVariants = cva(
  `
    w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900
    focus:border-gray-500 focus:ring-1 focus:ring-gray-300 focus:outline-none
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60
    transition-colors duration-200
  `,
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      variant: {
        default: 'border-gray-300 focus:border-gray-500',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

const labelVariants = cva(
  `
    absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600
    transition-colors duration-200
  `,
  {
    variants: {
      variant: {
        default: 'text-gray-600',
        error: 'text-red-600',
        success: 'text-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const separatorVariants = cva(
  `
    flex items-center justify-center text-gray-600 font-medium select-none
    transition-colors duration-200 hover:text-gray-800 cursor-pointer flex-shrink-0
  `,
  {
    variants: {
      size: {
        sm: 'w-4 h-4 text-xs',
        md: 'w-6 h-6 text-sm',
        lg: 'w-8 h-8 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface RangeInputProps {
  leftLabel: string;
  rightLabel: string;
  leftValue?: string;
  rightValue?: string;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
  onLeftChange?: (value: string) => void;
  onRightChange?: (value: string) => void;
  onLeftFocus?: () => void;
  onLeftBlur?: () => void;
  onRightFocus?: () => void;
  onRightBlur?: () => void;
  onSeparatorClick?: () => void;
  separator?: 'plus' | 'minus';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  leftError?: string;
  rightError?: string;
  leftSuccess?: string;
  rightSuccess?: string;
  disabled?: boolean;
  className?: string;
}

const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
  (
    {
      leftLabel,
      rightLabel,
      leftValue = '',
      rightValue = '',
      leftPlaceholder,
      rightPlaceholder,
      onLeftChange,
      onRightChange,
      onLeftFocus,
      onLeftBlur,
      onRightFocus,
      onRightBlur,
      onSeparatorClick,
      separator = 'minus',
      size = 'md',
      variant = 'default',
      leftError,
      rightError,
      leftSuccess,
      rightSuccess,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [leftFocused, setLeftFocused] = React.useState(false);
    const [rightFocused, setRightFocused] = React.useState(false);

    const leftVariant = leftError ? 'error' : leftSuccess ? 'success' : variant;
    const rightVariant = rightError ? 'error' : rightSuccess ? 'success' : variant;

    return (
      <div ref={ref} className={cn(rangeInputVariants({ size }), className)}>
        {/* Left Input Field */}
        <div className={cn(inputFieldVariants({ size }))}>
          <input
            className={cn(
              inputVariants({ size, variant: leftVariant }),
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            value={leftValue}
            placeholder={leftPlaceholder}
            onChange={(e) => onLeftChange?.(e.target.value)}
            onFocus={() => {
              setLeftFocused(true);
              onLeftFocus?.();
            }}
            onBlur={() => {
              setLeftFocused(false);
              onLeftBlur?.();
            }}
            disabled={disabled}
          />
          <label
            className={cn(
              labelVariants({ variant: leftVariant }),
              (leftFocused || leftValue) && 'text-gray-700'
            )}
          >
            {leftLabel}
          </label>
        </div>

        {/* Separator */}
        <div
          className={cn(separatorVariants({ size }))}
          onClick={onSeparatorClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSeparatorClick?.();
            }
          }}
        >
          {separator === 'plus' ? '+' : '−'}
        </div>

        {/* Right Input Field */}
        <div className={cn(inputFieldVariants({ size }))}>
          <input
            className={cn(
              inputVariants({ size, variant: rightVariant }),
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            value={rightValue}
            placeholder={rightPlaceholder}
            onChange={(e) => onRightChange?.(e.target.value)}
            onFocus={() => {
              setRightFocused(true);
              onRightFocus?.();
            }}
            onBlur={() => {
              setRightFocused(false);
              onRightBlur?.();
            }}
            disabled={disabled}
          />
          <label
            className={cn(
              labelVariants({ variant: rightVariant }),
              (rightFocused || rightValue) && 'text-gray-700'
            )}
          >
            {rightLabel}
          </label>
        </div>
      </div>
    );
  }
);

RangeInput.displayName = 'RangeInput';

export { RangeInput, rangeInputVariants, inputFieldVariants, inputVariants, labelVariants, separatorVariants };

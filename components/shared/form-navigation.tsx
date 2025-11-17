'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface FormNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentStep: number;
  totalSteps: number;
  isValid?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  submitLabel?: string;
  className?: string;
}

export const FormNavigation = ({
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentStep,
  totalSteps,
  isValid = true,
  isLoading = false,
  nextLabel = 'Next',
  previousLabel = 'Previous',
  submitLabel = 'Submit',
  className = '',
}: FormNavigationProps) => {
  return (
    <div className={`flex items-center justify-between pt-8 border-t mt-8 ${className}`}>
      {/* Previous Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst || isLoading}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {previousLabel}
      </Button>


      {/* Next/Submit Button */}
      <Button
        type="button"
        onClick={onNext}
        disabled={!isValid || isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Processing...
          </>
        ) : isLast ? (
          <>
            <Check className="h-4 w-4" />
            {submitLabel}
          </>
        ) : (
          <>
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default FormNavigation;

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

export interface SectionNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSave?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  saveDisabled?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  saveLabel?: string;
  className?: string;
  showSaveButton?: boolean;
}

/**
 * Section Navigation Component
 * Provides Previous/Next Section and Save All Changes functionality
 */
export function SectionNavigation({
  onPrevious,
  onNext,
  onSave,
  previousDisabled = false,
  nextDisabled = false,
  saveDisabled = false,
  previousLabel = 'Previous Section',
  nextLabel = 'Next Section',
  saveLabel = 'Save All Changes',
  className = '',
  showSaveButton = true,
}: SectionNavigationProps) {
  const shouldRenderSaveButton = showSaveButton && typeof onSave === 'function';

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={previousDisabled}
          className="py-5 px-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {previousLabel}
        </Button>

        <Button
          variant="outline"
          onClick={onNext}
          disabled={nextDisabled}
          className="py-5 px-6 border-primary text-primary bg-primary/10"
        >
          {nextLabel}

          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Bottom Row: Save All Changes Button */}
      {shouldRenderSaveButton && (
        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={onSave}
            disabled={saveDisabled}
            className="py-5 px-6"
          >
            <Save className="h-4 w-4" />
            {saveLabel}
          </Button>
        </div>
      )}
    </div>
  );
}



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
  previousLabel = "Previous Section",
  nextLabel = "Next Section",
  saveLabel = "Save All Changes",
  className = ""
}: SectionNavigationProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Top Row: Previous and Next Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={previousDisabled}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          {previousLabel}
        </Button>
        
        <Button
          variant="outline"
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-2 px-4 py-2 border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextLabel}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Bottom Row: Save All Changes Button */}
      <div className="flex justify-center">
        <Button
          onClick={onSave}
          disabled={saveDisabled}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          <Save className="h-4 w-4" />
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}


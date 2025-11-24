'use client';

import React from 'react';
import { useEditContext } from '../edit-provider';
import { LoadingState, ErrorState } from './loading-state';
import { EditPageLayout } from './page-layout';
import { SectionNavigation } from '@/app/(protected)/merchant/components/section-navigation';
import { useSectionNavigation } from '../../core/hooks';

export interface BasePageProps {
  children: React.ReactNode;
  scrollSpyMenu?: React.ReactNode;
  loadingMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
  showNavigation?: boolean;
}

/**
 * Base page component that provides consistent loading, error, and layout patterns
 * Eliminates duplication across all edit pages
 */
export function BasePage({
  children,
  scrollSpyMenu,
  loadingMessage = "Loading...",
  errorTitle = "Merchant Not Found",
  errorMessage = "The merchant you're looking for doesn't exist.",
  showNavigation = true
}: BasePageProps) {
  const { merchant, loading } = useEditContext();
  const {
    goToPrevious,
    goToNext,
    saveAllChanges,
    isPreviousDisabled,
    isNextDisabled,
  } = useSectionNavigation();

  if (loading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (!merchant) {
    return (
      <ErrorState 
        title={errorTitle}
        message={errorMessage}
      />
    );
  }

  return (
    <EditPageLayout scrollSpyMenu={scrollSpyMenu}>
      {children}
      
      {/* Section Navigation */}
      {showNavigation && (
        <div className="mt-8 pt-6 border-gray-200">
          <SectionNavigation
            onPrevious={goToPrevious}
            onNext={goToNext}
            onSave={saveAllChanges}
            previousDisabled={isPreviousDisabled}
            nextDisabled={isNextDisabled}
            className="max-w-2xl mx-auto"
          />
        </div>
      )}
    </EditPageLayout>
  );
}


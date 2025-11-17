'use client';

import React from 'react';
import { BasePage, BasePageProps } from './base-page';

export interface EditPageWrapperProps {
  /** The main content component to render */
  content: React.ReactNode;
  /** Optional ScrollSpy menu component */
  scrollSpyMenu?: React.ReactNode;
  /** Loading message to display while data is loading */
  loadingMessage?: string;
  /** Error title for error state */
  errorTitle?: string;
  /** Error message for error state */
  errorMessage?: string;
  /** Whether to show section navigation */
  showNavigation?: boolean;
}

/**
 * Generic wrapper component for edit pages
 * Eliminates duplication across all edit page wrappers
 * 
 * @example
 * ```tsx
 * <EditPageWrapper
 *   content={<BusinessInfoContent />}
 *   scrollSpyMenu={<BusinessInfoScrollSpyMenu />}
 *   loadingMessage="Loading business information..."
 * />
 * ```
 */
export function EditPageWrapper({
  content,
  scrollSpyMenu,
  loadingMessage,
  errorTitle,
  errorMessage,
  showNavigation = true,
}: EditPageWrapperProps) {
  return (
    <BasePage
      scrollSpyMenu={scrollSpyMenu}
      loadingMessage={loadingMessage}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
      showNavigation={showNavigation}
    >
      {content}
    </BasePage>
  );
}


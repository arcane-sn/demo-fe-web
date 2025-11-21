'use client';

import React from 'react';
import { Container } from '@/components/common/container';
import { SectionNavigation } from '@/app/(protected)/merchant/components/section-navigation';
import type { StepConfig } from '../config/steps.config';
import { getScrollSpyMenuForStep } from './scrollspy/create-scrollspy-menus';

interface MerchantCreationStepsProps {
  currentStepConfig: StepConfig;
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isValid?: boolean;
  isLoading?: boolean;
  isLastStep?: boolean;
}

export function MerchantCreationSteps({
  currentStepConfig,
  currentStep,
  totalSteps,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
  isValid = true,
  isLoading = false,
  isLastStep = false,
}: MerchantCreationStepsProps) {
  const CurrentStepComponent = currentStepConfig.component;
  
  const ScrollSpyMenu = getScrollSpyMenuForStep(currentStepConfig.id);

  return (
    <Container className="pt-10 border-t border-gray-200">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 lg:gap-7.5">
        {ScrollSpyMenu && (
          <div className="col-span-1">
            <div className="sticky top-30 max-w-48">
              <ScrollSpyMenu />
            </div>
          </div>
        )}
        <div className={ScrollSpyMenu ? "col-span-4" : "col-span-full"}>
          <div className="space-y-6">
            <CurrentStepComponent />
            <div className=" border-gray-200 pt-6">
              <SectionNavigation
                onPrevious={onPrevious}
                onNext={onNext}
                previousDisabled={!canGoPrevious || isLoading}
                nextDisabled={!isValid || isLoading}
                previousLabel="Previous Section"
                nextLabel={isLastStep ? 'Create Merchant' : 'Next Section'}
                className="max-w-2xl mx-auto"
                showSaveButton={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}


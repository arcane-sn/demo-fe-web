'use client';

import React from 'react';
import { FormNavigation } from '@/components/shared/form-navigation';
import { Container } from '@/components/common/container';
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
    <Container>
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
            <div className="mt-8 pt-6 border-t border-gray-200">
              <FormNavigation
                onNext={onNext}
                onPrevious={onPrevious}
                isFirst={!canGoPrevious}
                isLast={isLastStep}
                currentStep={currentStep + 1}
                totalSteps={totalSteps}
                isValid={isValid}
                isLoading={isLoading}
                submitLabel="Create Merchant"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}


'use client';

import { useMerchantCreation } from '../hooks/use-merchant-creation';
import { 
  MerchantCreationHeader, 
  MerchantCreationSteps 
} from './index';
import {
  ConfirmationModal,
  MerchantCreatedModal,
  ExitConfirmationModal,
} from '../../components/modals';

/**
 * Client Component for Create Merchant Page
 * Contains all interactive logic and state management
 */
export function CreateMerchantContent() {
  const {
    currentStep,
    totalSteps,
    currentStepConfig,
    canGoNext,
    canGoPrevious,
    isLastStep,
    goToNext,
    goToPrevious,
    handleSubmit,
    handleExit,
    
    // Modal states
    showConfirmationModal,
    showMerchantCreatedModal,
    showExitConfirmationModal,
    isSubmitting,
    isSaving,
    
    // Modal handlers
    setShowConfirmationModal,
    setShowMerchantCreatedModal,
    setShowExitConfirmationModal,
    handleExitWithoutSaving,
    handleSaveAndExit,
    handleStayHere,
    handleMerchantCreatedOkay,
  } = useMerchantCreation();

  const handleBackToMerchant = () => {
    handleExit();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Steps */}
      <MerchantCreationHeader 
        currentStep={currentStep}
        onBack={handleBackToMerchant}
      />

      {/* Main Content */}
      <MerchantCreationSteps
        currentStepConfig={currentStepConfig}
        currentStep={currentStep}
        totalSteps={totalSteps}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        onNext={goToNext}
        onPrevious={goToPrevious}
        isValid={true} // TODO: Connect to form validation
        isLoading={isSubmitting}
        isLastStep={isLastStep}
      />

      {/* Modals */}
      <ConfirmationModal
        open={showConfirmationModal}
        onOpenChange={setShowConfirmationModal}
        onSubmit={handleSubmit}
        onCancel={() => setShowConfirmationModal(false)}
        isLoading={isSubmitting}
      />

      <MerchantCreatedModal
        open={showMerchantCreatedModal}
        onOpenChange={setShowMerchantCreatedModal}
        onOkay={handleMerchantCreatedOkay}
      />

      <ExitConfirmationModal
        open={showExitConfirmationModal}
        onOpenChange={setShowExitConfirmationModal}
        onExitWithoutSaving={handleExitWithoutSaving}
        onSaveAndExit={handleSaveAndExit}
        onStayHere={handleStayHere}
        isSaving={isSaving}
      />
    </div>
  );
}


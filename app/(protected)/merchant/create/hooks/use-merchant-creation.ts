import { useState, useCallback } from 'react';
import { STEPS_CONFIG, type StepConfig } from '../config/steps.config';
import { useMerchantNavigation } from '../../utils/navigation';

export interface MerchantCreationState {
  currentStep: number;
  totalSteps: number;
  showConfirmationModal: boolean;
  showMerchantCreatedModal: boolean;
  showExitConfirmationModal: boolean;
  isSubmitting: boolean;
  isSaving: boolean;
}

export interface MerchantCreationActions {
  goToNext: () => void;
  goToPrevious: () => void;
  handleSubmit: () => void;
  handleExit: () => void;
  setShowConfirmationModal: (show: boolean) => void;
  setShowMerchantCreatedModal: (show: boolean) => void;
  setShowExitConfirmationModal: (show: boolean) => void;
}

export function useMerchantCreation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showMerchantCreatedModal, setShowMerchantCreatedModal] = useState(false);
  const [showExitConfirmationModal, setShowExitConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const navigation = useMerchantNavigation();
  const totalSteps = STEPS_CONFIG.length;

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      scrollToTop();
    } else {
      // On last step, show confirmation modal instead of submitting directly
      setShowConfirmationModal(true);
    }
  }, [currentStep, totalSteps, scrollToTop]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  }, [currentStep, scrollToTop]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call for merchant creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close confirmation modal and show success modal
      setShowConfirmationModal(false);
      setShowMerchantCreatedModal(true);
    } catch (error) {
      // Error handling is done by the service layer
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleExit = useCallback(() => {
    setShowExitConfirmationModal(true);
  }, []);

  const handleExitWithoutSaving = useCallback(() => {
    setShowExitConfirmationModal(false);
    // Navigate to merchant list using Next.js router
    navigation.toList();
  }, [navigation]);

  const handleSaveAndExit = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowExitConfirmationModal(false);
      // Navigate to merchant list using Next.js router
      navigation.toList();
    } catch (error) {
      // Error handling is done by the service layer
    } finally {
      setIsSaving(false);
    }
  }, [navigation]);

  const handleStayHere = useCallback(() => {
    setShowExitConfirmationModal(false);
  }, []);

  const handleMerchantCreatedOkay = useCallback(() => {
    setShowMerchantCreatedModal(false);
    // Navigate to merchant list using Next.js router
    navigation.toList();
  }, [navigation]);

  return {
    // State
    currentStep,
    totalSteps,
    showConfirmationModal,
    showMerchantCreatedModal,
    showExitConfirmationModal,
    isSubmitting,
    isSaving,
    
    // Computed values
    currentStepConfig: STEPS_CONFIG[currentStep],
    canGoNext: currentStep < totalSteps - 1,
    canGoPrevious: currentStep > 0,
    isLastStep: currentStep === totalSteps - 1,
    
    // Actions
    goToNext,
    goToPrevious,
    handleSubmit,
    handleExit,
    setShowConfirmationModal,
    setShowMerchantCreatedModal,
    setShowExitConfirmationModal,
    
    // Modal handlers
    handleExitWithoutSaving,
    handleSaveAndExit,
    handleStayHere,
    handleMerchantCreatedOkay,
  };
}

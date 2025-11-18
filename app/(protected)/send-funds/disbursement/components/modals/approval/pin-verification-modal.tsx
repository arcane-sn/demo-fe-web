"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { X, Key } from 'lucide-react';
import { RequiredPinModal } from './required-pin-modal';

interface PinVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (pin: string) => void;
  onForgotPin: () => void;
  onSetUpPin?: () => void;
}

export function PinVerificationModal({
  open,
  onOpenChange,
  onVerify,
  onForgotPin,
  onSetUpPin
}: PinVerificationModalProps) {
  const [pin, setPin] = useState<string[]>(['3', '0', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isRequiredPinModalOpen, setIsRequiredPinModalOpen] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (open) {
      // Reset PIN when modal opens
      setPin(['3', '0', '', '', '', '']);
      setActiveIndex(2);
      // Focus on the first empty input
      setTimeout(() => {
        inputRefs.current[2]?.focus();
      }, 100);
    }
  }, [open]);

  const handlePinChange = (value: string, index: number) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (pin[index]) {
        // Clear current input
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      } else if (index > 0) {
        // Move to previous input
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullPin = pin.join('');
    if (fullPin.length === 6) {
      onVerify(fullPin);
    }
  };

  const isSubmitDisabled = pin.join('').length !== 6;

  const handleSetUpPin = () => {
    // Close the current modal first
    onOpenChange(false);
    // Then open the required PIN modal after a short delay
    setTimeout(() => {
      setIsRequiredPinModalOpen(true);
    }, 100);
  };

  const handleRequiredPinModalClose = () => {
    setIsRequiredPinModalOpen(false);
  };

  const handleRequiredPinSetUp = () => {
    if (onSetUpPin) {
      onSetUpPin();
    }
    setIsRequiredPinModalOpen(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0"
        close={false}
      >
        <VisuallyHidden>
          <DialogTitle>User Verification</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Verification</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center space-y-6">
          {/* Illustration */}
          <div className="flex justify-center mb-4">
            <img 
              src="/media/illustrations/21.svg" 
              alt="PIN Verification" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">User Verification</h3>
            <p className="text-gray-600 text-sm">
              To verify your identity, please enter your current 6-digit PIN before continuing.
            </p>
          </div>

          {/* PIN Input */}
          <div className="flex justify-center gap-2">
            {pin.map((digit, index) => (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded-md flex items-center justify-center transition-colors ${
                  activeIndex === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={digit}
                  onChange={(e) => handlePinChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setActiveIndex(index)}
                  className="w-full h-full text-center text-lg font-semibold border-none outline-none bg-transparent"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit
          </Button>

          {/* Forgot PIN Link */}
          <div className="text-sm">
            <span className="text-gray-600">Forgot your PIN? </span>
            <button
              onClick={onForgotPin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset PIN
            </button>
          </div>

          {/* Set Up PIN Link */}
          <div className="text-sm">
            <span className="text-gray-600">Don't have a PIN? </span>
            <button
              onClick={handleSetUpPin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Set Up PIN
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Required PIN Modal */}
    <RequiredPinModal
      open={isRequiredPinModalOpen}
      onOpenChange={setIsRequiredPinModalOpen}
      onSetUpPin={handleRequiredPinSetUp}
      onCancel={handleRequiredPinModalClose}
    />
    </>
  );
}

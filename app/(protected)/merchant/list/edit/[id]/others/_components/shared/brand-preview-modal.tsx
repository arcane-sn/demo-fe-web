'use client';

import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter,
} from '@/components/ui/dialog';
import { OTHERS_CONSTANTS } from '../../_lib/constants';
import type { BrandPreviewModalProps } from '../../_lib/types';

export function BrandPreviewModal({ 
  isOpen, 
  onClose, 
  brandColors, 
  companyLogo 
}: BrandPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Brand Preview</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          <div 
            className="space-y-6 p-4 rounded-lg"
            style={{ backgroundColor: brandColors.background }}
          >
            {/* Top Logo */}
            <div className="flex justify-start">
              {companyLogo && companyLogo.length > 0 ? (
                <img 
                  src={companyLogo[0].dataURL} 
                  alt="Company Logo Preview" 
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: brandColors.primary }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                    <circle cx="12" cy="12" r="10" fill="currentColor"/>
                    <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Center Section with Illustration */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <img 
                  src={OTHERS_CONSTANTS.BRAND_PREVIEW_ILLUSTRATION} 
                  alt="Person Illustration"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold" style={{ color: brandColors.primary }}>
                This Is Brand Preview
              </h3>
              <p className="text-sm" style={{ color: brandColors.secondary }}>
                You can see all applied brand logo and colors you've set up
              </p>
            </div>

            {/* Color Buttons */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Button 
                type="button"
                variant="outline" 
                className="text-sm px-4 py-2 border-2"
                style={{ 
                  color: brandColors.secondary,
                  borderColor: brandColors.secondary,
                  backgroundColor: 'transparent'
                }}
              >
                Secondary
              </Button>
              <Button 
                type="button"
                className="text-sm px-4 py-2 text-white border-0"
                style={{ backgroundColor: brandColors.primary }}
              >
                Primary
              </Button>
              <Button 
                type="button"
                className="text-sm px-4 py-2 text-white border-0"
                style={{ backgroundColor: brandColors.accent }}
              >
                Accent
              </Button>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="pt-4 border-t mt-6">
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
            className="w-30 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

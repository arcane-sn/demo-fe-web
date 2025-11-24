import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditBankPricingContent } from './edit-bank-pricing-content';
import { BankData } from '../_lib/types';

interface EditBankPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankData?: BankData | null;
  editMode: 'single' | 'selected' | 'all';
  selectedBanksCount?: number;
}

export function EditBankPricingModal({ 
  isOpen, 
  onClose, 
  bankData, 
  editMode, 
  selectedBanksCount = 0 
}: EditBankPricingModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <KeenIcon icon="arrow-left" style="outline" className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Edit Bank Pricing
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Configure bank settings for this merchant
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <EditBankPricingContent 
            bankData={bankData}
            editMode={editMode}
            selectedBanksCount={selectedBanksCount}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button variant="outline">
              Reset to Default
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


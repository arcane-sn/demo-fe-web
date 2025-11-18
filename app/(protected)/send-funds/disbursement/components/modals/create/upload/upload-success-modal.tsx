"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface UploadSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOkay?: () => void;
  isBypass?: boolean;
}

export function UploadSuccessModal({
  open,
  onOpenChange,
  onOkay,
  isBypass = false,
}: UploadSuccessModalProps) {
  const handleOkay = () => {
    if (onOkay) {
      onOkay();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            File Uploaded
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center space-y-6 py-4">
          {/* Illustration */}
          <div className="relative w-48 h-32 flex items-center justify-center">
            <img 
              src="/media/illustrations/28.svg" 
              alt="File Uploaded Successfully" 
              className="w-30 object-contain"
            />
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">
              {isBypass ? 'File Uploaded & Submitted Successfully' : 'File Uploaded Successfully'}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {isBypass 
                ? 'Your file has been uploaded and a request has been created. The request has been submitted and will be reviewed by a team member with approval permissions.'
                : 'Your file has been uploaded and a request has been created. The request is currently on the account inquiry process.'
              }
            </p>
          </div>

          {/* Okay Button */}
          <Button
            onClick={handleOkay}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Okay!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadSuccessModal;

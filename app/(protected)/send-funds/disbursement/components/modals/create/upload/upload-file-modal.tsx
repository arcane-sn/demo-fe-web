"use client";

import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Upload, Download, Image as ImageIcon } from 'lucide-react';

interface UploadFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload?: (file: File) => void;
}

export function UploadFileModal({
  open,
  onOpenChange,
  onFileUpload,
}: UploadFileModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a CSV file only.');
      return false;
    }
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return false;
    }
    
    return true;
  };

  // Auto upload when file is selected
  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      // Immediately upload the file and close modal
      if (onFileUpload) {
        onFileUpload(file);
        onOpenChange(false);
      }
    }
  }, [onFileUpload, onOpenChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleUpload = useCallback(() => {
    if (selectedFile && onFileUpload) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  }, [selectedFile, onFileUpload, onOpenChange]);

  const handleDownloadTemplate = useCallback(() => {
    // Create CSV template content
    const csvContent = `Account Number,Account Name,Bank Code,Bank Name,Amount,Description
1234567890,John Doe,014,BCA,1000000,Payment for services
0987654321,Jane Smith,008,Mandiri,2000000,Salary payment`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'disbursement_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
      <style>
        {`
          .upload-bg {
            background-image: url('/media/images/2600x1200/bg-5.png');
          }
          .dark .upload-bg {
            background-image: url('/media/images/2600x1200/bg-5-dark.png');
          }
        `}
      </style>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Upload File
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            className={`relative border border-input rounded-xl border-dashed cursor-pointer transition-colors bg-center bg-no-repeat bg-[length:550px] ${
              dragActive
                ? 'border-orange-500'
                : selectedFile
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 upload-bg'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="sr-only"
            />
            
            {!selectedFile && (
              // Empty state - show upload area
              <div className="flex flex-col place-items-center place-content-center text-center rounded-xl w-full p-5 lg:p-7">
                <div className="flex items-center mb-2.5">
                  <div className="relative size-11 shrink-0">
                    <svg
                      className="w-full h-full stroke-orange-200 fill-white dark:stroke-orange-950 dark:fill-orange-950/30"
                      width="44"
                      height="48"
                      viewBox="0 0 44 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                        18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                        39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                        fill=""
                      />
                      <path
                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                        18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                        39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                        stroke=""
                        strokeOpacity="0.2"
                      />
                    </svg>
                    <div className="absolute leading-none left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                      <ImageIcon className="text-xl ps-px text-orange-400" />
                    </div>
                  </div>
                </div>
                
                <div className="text-mono text-xs font-medium hover:text-primary-active mb-px">
                  Click or Drag & Drop
                </div>
                <span className="text-xs text-secondary-foreground text-nowrap">
                  CSV Max 5MB
                </span>
              </div>
            )}
          </div>

          {/* Template Download Section */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Please use the following template to upload a file
            </p>
            <Button
              variant="outline"
              onClick={handleDownloadTemplate}
              className="w-full flex items-center gap-2 text-sm px-3 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default UploadFileModal;

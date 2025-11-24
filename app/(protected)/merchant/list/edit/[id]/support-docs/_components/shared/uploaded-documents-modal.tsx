'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Document {
  id: string;
  name: string;
  checked: boolean;
  filename?: string;
}

interface UploadedDocumentsModalProps {
  documents: Document[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadedDocumentsModal({ 
  documents, 
  isOpen, 
  onOpenChange 
}: UploadedDocumentsModalProps) {
  if (documents.length === 0) return null;

  return (
    <div className="ml-52">
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {/* <Button variant="outline" className="text-blue-600 hover:text-blue-700">
            View Uploaded Documents ({documents.length})
          </Button> */}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Supporting Documents (Uploaded)</DialogTitle>
            <p className="text-sm text-gray-600">Legal documents needed to registering the merchant</p>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{document.name}</h4>
                  <p className="text-sm text-gray-500">
                    ({document.name.includes('(') ? document.name.match(/\((.*?)\)/)?.[1] : document.id.toUpperCase()})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{document.filename}</span>
                  <Button variant="outline" size="sm" className="text-blue-600">
                    Change File
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

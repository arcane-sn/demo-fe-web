'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormLabel } from '@/components/ui/form';

interface Document {
  id: string;
  name: string;
  checked: boolean;
  filename?: string;
}

interface DocumentChecklistProps {
  documents: Document[];
  onDocumentCheck: (index: number, checked: boolean) => void;
}

export function DocumentChecklist({ documents, onDocumentCheck }: DocumentChecklistProps) {
  return (
    <div className="space-y-4 mt-10">
      <div className="ml-5">
        <p className="text-sm text-gray-600 mb-4">
          Check the checkbox if merchant have the related documents
        </p>
        
        <div className="space-y-3">
          {documents.map((document, index) => (
            <div key={document.id} className="flex items-center space-x-3">
              <Checkbox
                id={document.id}
                checked={document.checked}
                onCheckedChange={(checked) => onDocumentCheck(index, !!checked)}
              />
              <FormLabel
                htmlFor={document.id}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {document.name}
              </FormLabel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

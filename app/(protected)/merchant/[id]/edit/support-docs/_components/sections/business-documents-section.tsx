'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormFieldWrapper } from '../../../_components/form';
import { DocumentChecklist } from '../shared/document-checklist';
import { UploadedDocumentsModal } from '../shared/uploaded-documents-modal';

interface Document {
  id: string;
  name: string;
  checked: boolean;
  filename?: string;
}

interface BusinessDocumentsSectionProps {
  control: any;
  documents: Document[];
  onDocumentCheck: (index: number, checked: boolean) => void;
}

export function BusinessDocumentsSection({ 
  control, 
  documents, 
  onDocumentCheck 
}: BusinessDocumentsSectionProps) {
  const [showUploadedModal, setShowUploadedModal] = useState(false);
  const uploadedDocuments = documents.filter(doc => doc.checked && doc.filename);

  return (
    <div id="business-documents" className="scroll-mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>Legal documents needed to registering the merchant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <FormFieldWrapper
            control={control}
            name="sharedFolderLink"
            label="Shared Folder Link"
            placeholder="URL of the compiled documents"
          />
          <p className="text-sm text-gray-500 ml-52">
            You can compile all the documents into one shared folder
          </p>

          <DocumentChecklist
            documents={documents}
            onDocumentCheck={onDocumentCheck}
          />

          <UploadedDocumentsModal
            documents={uploadedDocuments}
            isOpen={showUploadedModal}
            onOpenChange={setShowUploadedModal}
          />
        </CardContent>
      </Card>
    </div>
  );
}

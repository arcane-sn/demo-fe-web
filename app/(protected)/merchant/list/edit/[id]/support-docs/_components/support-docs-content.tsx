'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { getDocumentsSchema, type DocumentsSchemaType } from '../../../../../core/schemas';
import { BusinessDocumentsSection } from './sections';

const defaultDocuments = [
  { id: 'director-ktp', name: "Director's ID Card (KTP)", checked: true, filename: 'DirectorKTP.pdf' },
  { id: 'npwp', name: 'NPWP', checked: true, filename: 'NPWP.pdf' },
  { id: 'company-account', name: 'Company Account Number', checked: true, filename: 'CompanyAccount.pdf' },
  { id: 'incorporation', name: 'Certificate of Incorporation (Akta Pendirian)', checked: true, filename: 'aktaPendirian.pdf' },
  { id: 'amendment', name: 'Certificate of Amendment (Akta Perubahan)', checked: true, filename: 'aktaPerubahan.pdf' },
  { id: 'esp-registration', name: 'ESP Registration Certificate (TD PSE)', checked: true, filename: 'ESPRegistration.pdf' },
  { id: 'sk-establishment', name: 'Kemenkumham Establishment Decree (SK Pendirian Kemenkumham)', checked: true, filename: 'SKEstablishment.pdf' },
  { id: 'sk-amendment', name: 'Kemenkumham Amendment Decree (SK Perubahan Kemenkumham)', checked: true, filename: 'SKAmendment.pdf' },
  { id: 'nib', name: 'Business Identification Number (NIB)', checked: true, filename: 'NIB.pdf' },
  { id: 'siup', name: 'Trading Business Permit (SIUP)', checked: true, filename: 'siup.pdf' },
  { id: 'website-screenshot', name: 'Website Screenshot', checked: true, filename: 'WebsiteScreenshot.pdf' },
];

export function SupportDocsContent() {
  const form = useForm<DocumentsSchemaType>({
    resolver: zodResolver(getDocumentsSchema()),
    defaultValues: {
      sharedFolderLink: '',
      documents: defaultDocuments,
    }
  });

  const onSubmit = (data: DocumentsSchemaType) => {
    // TODO: Implement form submission
  };

  const handleDocumentCheck = (index: number, checked: boolean) => {
    const currentDocuments = form.getValues('documents');
    const updatedDocuments = currentDocuments.map((doc, i) => 
      i === index ? { ...doc, checked } : doc
    );
    form.setValue('documents', updatedDocuments);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        <BusinessDocumentsSection
          control={form.control}
          documents={form.watch('documents')}
          onDocumentCheck={handleDocumentCheck}
        />
      </form>
    </Form>
  );
}

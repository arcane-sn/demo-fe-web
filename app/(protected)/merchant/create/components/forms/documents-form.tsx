'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getDocumentsSchema, type DocumentsSchemaType } from '../../../core/schemas';

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

export function DocumentsForm() {
  const [showUploadedModal, setShowUploadedModal] = useState(false);

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

  const uploadedDocuments = form.watch('documents').filter(doc => doc.checked && doc.filename);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8" id="business-documents">
   
      

        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>Legal documents needed to registering the merchant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Shared Folder Link */}
            <FormField
              control={form.control}
              name="sharedFolderLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="w-48 text-left text-sm font-normal">
                      Shared Folder Link
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input placeholder="URL of the compiled documents" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-52">
                    You can compile all the documents into one shared folder
                  </p>
                </FormItem>
              )}
            />

            {/* Documents Checklist */}
            <div className="space-y-4 mt-10">
              <div className="ml-5">
                <p className="text-sm text-gray-600 mb-4">
                  Check the checkbox if merchant have the related documents
                </p>
                
                <div className="space-y-3">
                  {form.watch('documents').map((document, index) => (
                    <div key={document.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={document.id}
                        checked={document.checked}
                        onCheckedChange={(checked) => handleDocumentCheck(index, !!checked)}
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

            {/* Show Uploaded Documents Modal */}
            {uploadedDocuments.length > 0 && (
              <div className="ml-52">
                <Dialog open={showUploadedModal} onOpenChange={setShowUploadedModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                      View Uploaded Documents ({uploadedDocuments.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Supporting Documents (Uploaded)</DialogTitle>
                      <p className="text-sm text-gray-600">Legal documents needed to registering the merchant</p>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                      {uploadedDocuments.map((document) => (
                        <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{document.name}</h4>
                            <p className="text-sm text-gray-500">({document.name.includes('(') ? document.name.match(/\((.*?)\)/)?.[1] : document.id.toUpperCase()})</p>
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
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
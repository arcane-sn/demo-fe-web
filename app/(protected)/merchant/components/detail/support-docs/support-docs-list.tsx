'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/reusable/StatusBadge';

interface Document {
  id: string;
  name: string;
  status: 'completed' | 'missing';
}

const documents: Document[] = [
  { id: '1', name: "Director's ID Card (KTP)", status: 'completed' },
  { id: '2', name: 'NPWP', status: 'completed' },
  { id: '3', name: 'Company Account Number', status: 'completed' },
  { id: '4', name: 'Certificate of Incorporation (Akta Pendirian)', status: 'completed' },
  { id: '5', name: 'Certificate of Amendment (Akta Perubahan)', status: 'completed' },
  { id: '6', name: 'ESP Registration Certificate (TD PSE)', status: 'completed' },
  { id: '7', name: 'Kemenkumham Establishment Decree (SK Pendirian Kemenkumham)', status: 'completed' },
  { id: '8', name: 'Kemenkumham Amendment Decree (SK Perubahan Kemenkumham)', status: 'completed' },
  { id: '9', name: 'Business Identification Number (NIB)', status: 'completed' },
  { id: '10', name: 'Trading Business Permit (SIUP)', status: 'completed' },
  { id: '11', name: 'Website Screenshot', status: 'missing' },
];

export function SupportDocsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Support Docs</CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {documents.map((doc, index) => (
          <div key={doc.id}>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-medium">{doc.name}</span>
              <StatusBadge 
                variant={doc.status === 'completed' ? 'success' : 'destructive'}
                size="sm"
              >
                {doc.status === 'completed' ? 'Completed' : 'Missing'}
              </StatusBadge>
            </div>
            {index < documents.length - 1 && (
              <hr className="border-border" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground mb-4">
          {error.message || 'An unexpected error occurred while loading the merchant edit page.'}
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button 
            onClick={() => router.push('/merchant/list')} 
            variant="outline"
          >
            Go to Merchant List
          </Button>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export function useClipboard() {
  const [copied, setCopied] = useState<string>('');

  const copy = useCallback(async (
    text: string,
    type: string = 'default',
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    const success = await copyToClipboard(
      text,
      (copiedType) => setCopied(copiedType),
      onError
    );

    if (success) {
      setCopied(type);
      onSuccess?.();
      
      // Auto-reset after 2 seconds
      setTimeout(() => setCopied(''), 2000);
    }

    return success;
  }, []);

  const reset = useCallback(() => {
    setCopied('');
  }, []);

  return {
    copied,
    copy,
    reset,
    isCopied: (type: string) => copied === type
  };
}

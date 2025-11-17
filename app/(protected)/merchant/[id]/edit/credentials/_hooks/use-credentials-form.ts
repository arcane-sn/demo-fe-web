'use client';

import { useState } from 'react';
import { CREDENTIALS_CONSTANTS } from '../_lib/constants';
import type { CredentialData, CallbackUrls } from '../_lib/types';

export function useCredentialsForm() {
  const [credentialStatus, setCredentialStatus] = useState(true);
  const [callbackUrls, setCallbackUrls] = useState<CallbackUrls>(CREDENTIALS_CONSTANTS.DEFAULT_CALLBACK_URLS);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const handleCredentialStatusChange = (isActive: boolean) => {
    setCredentialStatus(isActive);
  };

  const handleCallbackUrlChange = (field: keyof CallbackUrls, value: string) => {
    setCallbackUrls(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    credentialStatus,
    callbackUrls,
    handleCopy,
    handleCredentialStatusChange,
    handleCallbackUrlChange,
  };
}

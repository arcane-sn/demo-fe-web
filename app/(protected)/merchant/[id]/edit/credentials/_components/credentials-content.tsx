'use client';

import React from 'react';
import { useCredentialsForm, useIpWhitelist } from '../_hooks';
import { 
  CredentialsSection,
  IpWhitelistSection,
  CallbackUrlSection
} from './sections';

interface CredentialsContentProps {
  // Add props if needed for data binding
}

export function CredentialsContent({}: CredentialsContentProps) {
  const {
    credentialStatus,
    callbackUrls,
    handleCopy,
    handleCredentialStatusChange,
    handleCallbackUrlChange,
  } = useCredentialsForm();

  const {
    ipWhitelist,
    handleDeleteIpField,
    handleAddIpField,
    handleIpChange,
  } = useIpWhitelist();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Credentials Section */}
      <CredentialsSection
        credentialStatus={credentialStatus}
        onCopy={handleCopy}
        onCredentialStatusChange={handleCredentialStatusChange}
      />

      {/* IP Whitelist Section */}
      <IpWhitelistSection
        ipWhitelist={ipWhitelist}
        onDelete={handleDeleteIpField}
        onAdd={handleAddIpField}
        onChange={handleIpChange}
      />

      {/* Callback URL Section */}
      <CallbackUrlSection
        callbackUrls={callbackUrls}
        onChange={handleCallbackUrlChange}
      />
    </div>
  );
}
